from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
# Create your models here.


class Users(AbstractBaseUser,BaseUserManager):

    username = models.CharField(null=False, max_length=240)
    
