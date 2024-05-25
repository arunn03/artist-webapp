from django_filters.rest_framework import FilterSet
from .models import Profile

class ProfileFilter(FilterSet):
    class Meta:
        model = Profile
        fields = {
            'gender': ['in'],
            'interests__name': ['in'],
        }

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        return queryset.distinct()