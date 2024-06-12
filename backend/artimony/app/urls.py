from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

app_name = 'app'

urlpatterns = [
    path('profile/create/', ProfileCreateAPIView.as_view(), name='profile-create'),
    path('profiles/', ProfileListAPIView.as_view(), name='profile-list'),
    path('current-profile/', ProfileDetailAPIView.as_view(), name='current-profile'),
    path('profile/update/<str:email>/', ProfileUpdateAPIView.as_view(), name='profile-update'),
    path('admin-profiles/', AdminProfileListView.as_view(), name='admin-profile-list'),
    path('contact/reveal/', ContactRevealUpdateView.as_view(), name='contact-reveal'),
]