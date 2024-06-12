from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BillingProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(default='')
    subscription_id = models.CharField(max_length=120, default='')
    plan = models.CharField(max_length=120, choices = [
        ('free', 'Free'),
        ('plan_OKY2KAyIniksj7', 'Silver'),
        ('plan_OKY2n03khLtGXm', 'Gold'),
        ('plan_OKY3XCRSbnODw7', 'Platinum'),
    ], default='free')
    subscription_status = models.CharField(max_length=120, default='')

    def __str__(self):
        return self.user.email

