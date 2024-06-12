from rest_framework import serializers
from .models import *
from django.shortcuts import get_object_or_404

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
    
    # def create(self, validated_data):
    #     # Extract gallery and interests data from the validated data
    #     gallery_data = validated_data.pop('gallery', [])
    #     interests_data = validated_data.pop('interests', [])
        
    #     # Create the Profile instance
    #     profile = Profile.objects.create(**validated_data)

    #     # Create GalleryItem instances for the profile
    #     for item_data in gallery_data:
    #         GalleryItem.objects.create(profile=profile, **item_data)

    #     # Create Interest instances for the profile
    #     for interest_data in interests_data:
    #         Interest.objects.create(profile=profile, **interest_data)

    #     return profile

class ProfileListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    mobile_number = serializers.CharField(source='user.mobile_number', read_only=True)
    admin_verified = serializers.BooleanField(source='user.admin_verified', read_only=True)
    gallery = GalleryItemSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    plan = serializers.CharField(source='user.billingprofile.plan')
    subscription_status = serializers.CharField(source='user.billingprofile.subscription_status')

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'profile_picture', 'email', 'mobile_number', 'city', 'age', 'gender', 'skin_tone', 'gallery', 'interests', 'admin_verified', 'revealed_count', 'plan', 'subscription_status', 'bio']

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    mobile_number = serializers.CharField(source='user.mobile_number', read_only=True)
    gallery = GalleryItemSerializer(many=True, read_only=True)
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'profile_picture', 'email', 'mobile_number', 'city', 'age', 'gender', 'skin_tone', 'gallery', 'interests', 'bio']

