from rest_framework import serializers
from adminsite.models import UsersTable, Community, Conversation, Message, Topics, Comments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersTable
        fields = ['user_name', 'email', 'password']

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['id','community_name','community_description','user_id','date_time','no_of_members']


class TopicsSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user_id.user_name')
    class Meta:
        model = Topics
        fields = ['id','topic_title','topic_description','topic_image','topic_video','topic_link','user_id','user_name','views']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'content', 'sender', 'timestamp', 'conversation_id']

class ConversationSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user_id.user_name')
    class Meta:
        model = Comments
        fields = ['user_id', 'user_name', 'topic_id', 'status', 'comment', 'comment_time']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersTable
        fields = ['user_name','email','profile_picture','about']