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



class Community(models.Model):
    community_name = models.CharField(max_length=150, unique=True)
    community_description = models.CharField(max_length=200)
    user_id = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    no_of_members = models.IntegerField(null=True)

    def __str__(self):
        return self.community_name



class CommunityMembers(models.Model):
    user_id = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    join_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_id



class Topics(models.Model):
    topic_title = models.CharField(max_length=100)
    topic_description = models.TextField(max_length=1000)
    topic_image = models.ImageField(upload_to='images/', null=True, blank=True)
    topic_video = models.FileField(upload_to='videos/', null=True, blank=True)
    topic_link = models.TextField(max_length=1000, null=True, blank=True)
    status = models.CharField(max_length=5, default='true')
    date_time = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    views = models.IntegerField(null=True)

    def __str__(self):
        return self.topic_title

    def delete(self, *args, **kwargs):
        # Delete files before deleting the database entry
        if self.topic_image:
            if os.path.isfile(self.topic_image.path):
                os.remove(self.topic_image.path)

        if self.topic_video:
            if os.path.isfile(self.topic_video.path):
                os.remove(self.topic_video.path)

        #delete() method to remove the movie from the database
        super(Topics, self).delete(*args, **kwargs)



class Comments(models.Model):
    user_id = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    topic_id = models.ForeignKey(Topics, on_delete=models.CASCADE)
    status = models.CharField(max_length=5, default='true')
    comment = models.CharField(max_length=150)
    comment_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_id}"



class Votes(models.Model):
    user_id = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    topic_id = models.ForeignKey(Topics, on_delete=models.CASCADE)
    votes = models.CharField(max_length=5)

    def __str__(self):
        return f"vote from {self.user_id} to {self.topic_id}"



class Conversation(models.Model):
    participants = models.ManyToManyField(UsersTable, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation {self.id}"

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(UsersTable, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} from {self.sender}"