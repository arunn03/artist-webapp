from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import MobileOTP, EmailOTP
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    # interests = InterestSerializer(many=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    mobile_otp = serializers.CharField(write_only=True)
    email_otp = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'mobile_number', 'mobile_otp', 'email_otp']

    def validate(self, attrs):
        
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("The passwords do not match.")
        mob_otp_obj = get_object_or_404(MobileOTP, mobile_number=attrs['mobile_number'])
        email_otp_obj = get_object_or_404(EmailOTP, email=attrs['email'])
        # print(mob_otp_obj.otp, attrs['mobile_otp'], email_otp_obj.otp, attrs['email_otp'], timezone.now() - mob_otp_obj.generated_at, timezone.now() - email_otp_obj.generated_at, timedelta(minutes=10))
        if mob_otp_obj.otp != attrs['mobile_otp']: # or timezone.now() - mob_otp_obj.generated_at > timedelta(minutes=10):
            raise serializers.ValidationError("Mobile OTP is either invalid or expired")
        email_otp_obj = get_object_or_404(EmailOTP, email=attrs['email'])
        if email_otp_obj.otp != attrs['email_otp']: # or timezone.now() - email_otp_obj.generated_at > timedelta(minutes=10):
            raise serializers.ValidationError("Email OTP is either invalid or expired")
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            mobile_number=validated_data['mobile_number']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'email', 'mobile_number'
