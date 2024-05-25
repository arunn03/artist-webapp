from django.contrib import admin
from django.urls import path
from .views import CreateSubscriptionView

urlpatterns = [
    path('create-subscription/', CreateSubscriptionView.as_view(), name='create-subscription'),
]
