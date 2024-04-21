from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail

from rest_framework import status, views, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

from .serializers import UserRegistrationSerializer, UserSerializer
from .models import MobileOTP, EmailOTP
from artimony.settings import *

from random import randint
from twilio.rest import Client

class UserRegistrationAPIView(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserLoginAPIView(views.APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            # token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({"message": 'User logged in successfully'}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutAPIView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (SessionAuthentication, )

    def post(self, request):
        logout(request)
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)

class MobileOTPGenerationAPIView(views.APIView):
    def post(self, request, *args, **kwargs):
        mobile_number = request.data.get('mobile_number')
        otp = str(randint(100000, 999999))
        # client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        # body = f'Your mobile OTP is {otp}\n\nThis OTP will be expired in 10 minutes from now.'
        # msg = client.messages.create(
        #     body=body,
        #     from_=TWILIO_PHONE_NUMBER,
        #     to=f'+91{mobile_number}'
        # )
        # if msg:
        mob_otp_obj, created = MobileOTP.objects.get_or_create(mobile_number=mobile_number)
        mob_otp_obj.otp = otp
        mob_otp_obj.save()
        return Response({"message": "Mobile OTP generated successfully"}, status=status.HTTP_200_OK)
        # return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EmailOTPGenerationAPIView(views.APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = str(randint(100000, 999999))
        # body = f'Your email OTP is {otp}\n\nThis OTP will be expired in 10 minutes from now.'
        # try:
        #     number_sent = send_mail(
        #         'OTP for User Registration',
        #         body,
        #         EMAIL_HOST_USER,
        #         [email]
        #     )
        #     if number_sent < 1:
        #         return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        email_otp_obj, created = EmailOTP.objects.get_or_create(email=email)
        email_otp_obj.otp = otp
        email_otp_obj.save()
        return Response({"message": "Email OTP generated successfully"}, status=status.HTTP_200_OK)
        # except:
        #     return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserAPIView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (SessionAuthentication, )

    def post(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)