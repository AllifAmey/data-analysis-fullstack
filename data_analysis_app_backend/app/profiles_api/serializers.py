from profiles_api import models
from rest_framework import serializers
from django.contrib.auth import (
    authenticate,
)
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    """Serializes User data"""

    class Meta:
        model = User
        fields = ('id', 'username', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Handles creating User"""
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])
        user.set_password(validated_data['password'])
        # authenticated the moment user is created.
        Token.objects.create(user=user)
        
        return user

class EmpowerWomanUserSerializer(serializers.ModelSerializer):
    """Serializes User data"""

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate(self, data):
        """
        Make sure no field is empty.
        """
        if len(data['username']) == 0:
            raise serializers.ValidationError("You can not have empty username")
        if len(data['first_name']) == 0:
            raise serializers.ValidationError("You can not have empty first name")
        if len(data['last_name']) == 0:
            raise serializers.ValidationError("You can not have empty last name")
        if len(data['password']) == 0:
            raise serializers.ValidationError("You can not have a empty password")
        return data

    def create(self, validated_data):
        """Handles creating User"""
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.set_password(validated_data['password'])
        # authenticated the moment user is created.
        Token.objects.create(user=user)
        
        
        return user
    
class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token."""
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user."""
        username = attrs.get('username')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password,
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs