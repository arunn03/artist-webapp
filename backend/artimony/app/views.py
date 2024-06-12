from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.shortcuts import render
from django.conf.global_settings import *
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django_rest_passwordreset.signals import reset_password_token_created
from .filters import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

def index(request):
    return render(request, 'index.html')

@receiver(reset_password_token_created)
def password_reset_token_created(instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'email': reset_password_token.user.email,
        'reset_password_url': "http://localhost:3000/reset-password/{}".format(reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Artimony"),
        # message:
        email_plaintext_message,
        # from:
        EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()

# @method_decorator(csrf_exempt, name='dispatch')
class ProfileCreateAPIView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Profile.objects.all()
    # serializer_class = ProfileCreateSerializer

    def perform_create(self, serializer):
        user = self.request.user
        files = self.request.FILES
        data = self.request.data
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        user.save()
        
        # Extract gallery and interests data from the validated data
        gallery_data = files.getlist('gallery', [])
        interests_data = data.getlist('interests', [])
        
        # Create the Profile instance
        profile = serializer.save()

        # Create GalleryItem instances for the profile
        for item_data in gallery_data:
            GalleryItem.objects.create(profile=profile, file=item_data)

        # Create Interest instances for the profile
        for interest_data in interests_data:
            interest, created = Interest.objects.get_or_create(name=interest_data)
            # Associate the interest with the profile
            profile.interests.add(interest)
        
        return super().perform_create(serializer)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user.id
        serializer = ProfileCreateSerializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileListAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Profile.objects.all().filter(user__admin_verified=True)
    serializer_class = ProfileListSerializer
    filter_backends = [ DjangoFilterBackend ]
    filterset_class = ProfileFilter
    pagination_class = PageNumberPagination

class AdminProfileListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    queryset = Profile.objects.all()
    serializer_class = ProfileListSerializer
    filter_backends = [ DjangoFilterBackend ]
    filterset_class = ProfileFilter
    pagination_class = PageNumberPagination

# class ContactRevealUpdateView(APIView):

#     def post(self, request):


class ProfileDetailAPIView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

class ProfileUpdateAPIView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    lookup_field = 'user__email'
    lookup_url_kwarg = 'email'

    def perform_update(self, serializer):
        user = self.request.user
        files = self.request.FILES
        data = self.request.data
        print(data)

        # Updating user's first and last name
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()
        
        profile = serializer.save()

        # Handling gallery
        # Assuming you want to replace all gallery items every time you update the profile
        profile.gallery.all().delete()  # Clear existing items
        for item_data in files.getlist('gallery', []):
            GalleryItem.objects.create(profile=profile, file=item_data)

        # Handling interests
        profile.interests.clear()  # Clear existing interests
        for interest_name in data.getlist('interests', []):
            interest, created = Interest.objects.get_or_create(name=interest_name)
            profile.interests.add(interest)

        serializer.save()  # Save the profile with the new data

