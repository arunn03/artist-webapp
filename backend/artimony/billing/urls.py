from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('create-subscription/', CreateSubscriptionView.as_view(), name='create-subscription'),
    path('cancel-subscription/', CancelSubscriptionView.as_view(), name='cancel-subscription'),
    path('update-subscription/', UpdateSubscriptionView.as_view(), name='update-subscription'),
    path('webhook/', WebHookView.as_view(), name='webhook'),
]
