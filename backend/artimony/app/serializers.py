from rest_framework import serializers
from .models import *
from authentication.serializers import UserSerializer

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = ['file', 'is_video']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['name']

class ProfileCreateSerializer(serializers.ModelSerializer):
    skin_tone = ColorField()
    gallery = GalleryItemSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'profile_picture', 'bio', 'skin_tone', 'gender', 'city', 'interests', 'gallery', 'age']
    
class ProfileListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    mobile_number = serializers.CharField(source='user.mobile_number', read_only=True)
    admin_verified = serializers.BooleanField(source='user.admin_verified', read_only=True)
    gallery = GalleryItemSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'profile_picture',
            'email',
            'mobile_number',
            'city',
            'age',
            'gender',
            'skin_tone',
            'gallery',
            'interests',
            'admin_verified',
            'bio',
        ]

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    mobile_number = serializers.CharField(source='user.mobile_number', read_only=True)
    gallery = GalleryItemSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'profile_picture',
            'email',
            'mobile_number',
            'city',
            'age',
            'gender',
            'skin_tone',
            'gallery',
            'interests',
            'bio',
        ]

