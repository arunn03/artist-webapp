from django.core.mail import send_mail

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import MobileOTP, EmailOTP
from artimony.settings import *

from random import randint
from twilio.rest import Client


class UserRegistrationAPIView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MobileOTPGenerationAPIView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        mobile_number = request.data.get('mobile_number')
        otp = str(randint(100000, 999999))
        print(TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_ACCOUNT_SID)
        client = Client(TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_ACCOUNT_SID)
        body = f'Your mobile OTP is {otp}\n\nThis OTP will be expired in 10 minutes from now.'
        msg = client.messages.create(
            body=body,
            from_=TWILIO_PHONE_NUMBER,
            to=f'+91{mobile_number}'
        )
        if msg:
            mob_otp_obj, created = MobileOTP.objects.get_or_create(mobile_number=mobile_number)
            mob_otp_obj.otp = otp
            mob_otp_obj.save()
            return Response({"message": "Mobile OTP generated successfully"}, status=status.HTTP_200_OK)
        return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmailOTPGenerationAPIView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        email = request.data.get('email')
        otp = str(randint(100000, 999999))
        body = f'Your email OTP is {otp}\n\nThis OTP will be expired in 10 minutes from now.'
        try:
            number_sent = send_mail(
                'OTP for User Registration',
                body,
                EMAIL_HOST_USER,
                [email]
            )
            if number_sent < 1:
                return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            email_otp_obj, created = EmailOTP.objects.get_or_create(email=email)
            email_otp_obj.otp = otp
            email_otp_obj.save()
            return Response({"message": "Email OTP generated successfully"}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    

class UpdateAdminVerifiedView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailListSerializer(data=request.data)
        if serializer.is_valid():
            emails = serializer.validated_data['emails']
            
            # Set admin_verified to True for users in the list
            users_verified = User.objects.filter(email__in=emails).update(admin_verified=True)
            
            # Set admin_verified to False for users not in the list
            users_unverified = User.objects.exclude(email__in=emails).update(admin_verified=False)

            return Response({'message': f'{users_verified} users have been verified. {users_unverified} users have been unverified.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)