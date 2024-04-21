from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

class ProfileCreateAPIView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (SessionAuthentication, )
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileListAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (SessionAuthentication, )
    queryset = Profile.objects.all()
    serializer_class = ProfileListSerializer