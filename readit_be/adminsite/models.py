from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser
from .managers import CustomUserManager
import os

class UsersTable(AbstractBaseUser):
    user_name = models.CharField(max_length=100,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    random_key = models.CharField(max_length=100,null=True)
    status = models.CharField(max_length=5, default='true')
    profile_picture = models.ImageField(upload_to='profile_picture/', null=True)
    about = models.CharField(max_length=200)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['password']


    objects = CustomUserManager()

    def __str__(self):
        return self.user_name
    
    def delete(self, *args, **kwargs):
        # Delete files before deleting the database entry
        if self.profile_picture:
            if os.path.isfile(self.profile_picture.path):
                os.remove(self.profile_picture.path)

        #delete() method to remove the movie from the database
        super(UsersTable, self).delete(*args, **kwargs)