from django.urls import path
from .views import *

app_name = 'app'

urlpatterns = [
    path('profile/create/', ProfileCreateAPIView.as_view(), name='profile-create'),
    path('profiles/', ProfileListAPIView.as_view(), name='profile-list'),
    path('current-profile/', ProfileDetailAPIView.as_view(), name='current-profile'),
    path('profile/update/<str:email>/', ProfileUpdateAPIView.as_view(), name='profile-update'),
]