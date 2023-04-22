from rest_framework.response import Response
from rest_framework import viewsets, generics, status
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings

from profiles_api import serializers


class SignUpAPIView(generics.CreateAPIView):
    """Handle creating users"""
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class SignUpEmpowerWomanAPIView(generics.CreateAPIView):
    """Handle creating users"""
    serializer_class = serializers.EmpowerWomanUserSerializer
    queryset = User.objects.all()
    
    def post(self, request):
        """Signs ups users to EmpowerWoman"""
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
    
    
class UserLoginApiView(ObtainAuthToken):
   """Handle user login"""
   serializer_class = serializers.AuthTokenSerializer
   renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
   
   def post(self, request, *args, **kwargs):
       
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            if user.username == "Rokhsareh@empoweredwomen-mcr.org":
                # she's da boss what can I say
                return Response({"boss_woman" : True}, status=status.HTTP_200_OK)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
            })
        else:
            return Response({"Message": "You are unauthorised to make such a request"},
                            status=status.HTTP_401_UNAUTHORIZED)