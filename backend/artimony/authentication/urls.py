from django.urls import path, include
from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'authentication'

urlpatterns = [
    # path('csrf-token/', GetCSRFCookie.as_view(), name='csrf-token'),
    # path('check-authentication/', CheckAuthenticatedView.as_view(), name='check-authentication'),
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    # path('login/', UserLoginAPIView.as_view(), name='user-login'),
    # path('logout/', UserLogoutAPIView.as_view(), name='user-logout'),
    path('mobile-otp/', MobileOTPGenerationAPIView.as_view(), name='mobile-otp'),
    path('email-otp/', EmailOTPGenerationAPIView.as_view(), name='email-otp'),
    path('user/', UserAPIView.as_view(), name='user-data'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('verify-users/', UpdateAdminVerifiedView.as_view(), name='verify-users'),
]
