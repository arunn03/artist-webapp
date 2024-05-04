from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)
    admin_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['mobile_number']

    def __str__(self):
        return self.email

class MobileOTP(models.Model):
    mobile_number = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6)
    generated_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.generated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OTP for {self.mobile_number} generated at {self.generated_at}"
    
class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    generated_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.generated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OTP for {self.email} generated at {self.generated_at}"
