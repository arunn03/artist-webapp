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
    # re_path(r'^(?:.*)/?$', index, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [re_path(r'^(?:.*)/?$', index, name='react')]