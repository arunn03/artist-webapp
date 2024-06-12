from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'first_name', 'last_name', 'mobile_number', 'is_staff', 'is_active', 'admin_verified', 'get_revealed_contacts']
    list_filter = ['email', 'is_staff', 'is_active', 'admin_verified']
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name', 'password', 'mobile_number', 'admin_verified', 'revealed_contacts')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'mobile_number', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

    def get_revealed_contacts(self, obj):
        return ", ".join([str(contact) for contact in obj.revealed_contacts.all()])
    get_revealed_contacts.short_description = 'Revealed Contacts'

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(MobileOTP)
admin.site.register(EmailOTP)
