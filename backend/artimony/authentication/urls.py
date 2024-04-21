from django.urls import path
from .views import *

app_name = 'authentication'

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('logout/', UserLogoutAPIView.as_view(), name='user-logout'),
    path('mobile-otp/', MobileOTPGenerationAPIView.as_view(), name='mobile-otp'),
    path('email-otp/', EmailOTPGenerationAPIView.as_view(), name='email-otp'),
    path('user/', UserAPIView.as_view(), name='user-data')
]
