from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.utils.timezone import now, timedelta
from django.core.paginator import Paginator
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
from django.db.models import Q
from rest_framework import status, exceptions, authentication
from .serializers import UserSerializer, CommunitySerializer, ConversationSerializer, MessageSerializer, TopicsSerializer, CommentSerializer, ProfileSerializer
from adminsite.models import UsersTable, Community, CommunityMembers, Conversation, Message, Topics, Comments, Votes
import random





@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def api_signup(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():

        user_data = serializer.validated_data

        user = serializer.save()
        user.password = make_password(user_data['password'])
        user.save()
        
        return Response({'message': 'New Account Created'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def api_login(request):

    email = request.data.get('email')
    password = request.data.get('password')
    if email is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)

    if not user:
        return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)
    
    if user.status != 'true':
        return Response({'error': 'Account is blocked'}, status=status.HTTP_403_FORBIDDEN)
    
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):

    user = request.user
    token = Token.objects.get(user=user)
    token.delete()
    return Response(status=status.HTTP_200_OK)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def api_forgotpass(request):

    email = request.data.get('email')
    if email is None:
        return Response({'error': 'Please provide your registed email'},status=status.HTTP_400_BAD_REQUEST)
    if UsersTable.objects.filter(email=email).exists():
                sub_user = UsersTable.objects.get(email=email)
                random_key = random.randint(10**49, 10**50 - 1)
                sub_user.random_key = random_key
                sub_user.save()

                subject = f"Password Reset For ReadIt"
                from_email = "passwordreset@readit.in"
                recipient_list = [email]
                plain_message = 'http://127.0.0.1:3000/resetpass/'+str(random_key)+'/'
                send_mail(subject, plain_message, from_email, recipient_list)
                
                return Response({'message': 'email sent'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Please provide your registed email'},status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def api_passreset(request):

    resettoken = request.data.get('resettoken')
    password = request.data.get('password')
    if UsersTable.objects.filter(random_key=resettoken).exists():
         sub_user = UsersTable.objects.get(random_key=resettoken)
         sub_user.password = make_password(password)
         sub_user.random_key = None
         sub_user.save()
         return Response({'message': 'Password changed'}, status=status.HTTP_200_OK)
    else:
         return Response({'error': 'Please try again'},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_changepass(request):

    email = request.user.email
    password = request.data.get('password')
    if UsersTable.objects.filter(email=email).exists():
        sub_user = UsersTable.objects.get(email=email)
        sub_user.password = make_password(password)
        sub_user.save()
        return Response({'message': 'Password changed'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Please try again'},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_home_topics(request):
    search_query = request.data.get('searchquery', '')
    
    last_24_hours = now() - timedelta(hours=24)
    
    if search_query:
        topics = Topics.objects.filter(Q(topic_title__icontains=search_query) & Q(status='true')).order_by('-views')[:10]
    else:
        topics = Topics.objects.filter(Q(date_time__gte=last_24_hours) & Q(status='true')).order_by('-views')[:10]
        
        if not topics:
            topics = Topics.objects.filter(status='true').order_by('-views')[:10]
    
    serializer = TopicsSerializer(topics, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_home_community(request):
    search_query = request.data.get('searchquery', '')
    
    if search_query:
        communities = Community.objects.filter(community_name__icontains=search_query).order_by('-no_of_members')[:10]
    else:
        communities = Community.objects.all().order_by('-no_of_members')[:10]
    
    serializer = CommunitySerializer(communities, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_topics(request):
    user = request.user
    selection = request.data.get('selection')
    searchquery = request.data.get('searchquery')
    if searchquery is None or searchquery == "":
        if selection == 0:
            topics = Topics.objects.all().order_by('-date_time')
            serializer = TopicsSerializer(topics , many = True)
            return Response(serializer.data)
        else:
            topics = Topics.objects.filter(user_id=user).order_by('-date_time')
            serializer = TopicsSerializer(topics , many = True)
            return Response(serializer.data)
    else:
        if selection == 0:
            topics = Topics.objects.filter(Q(topic_title__icontains=searchquery)).order_by('-date_time')
            serializer = TopicsSerializer(topics , many = True)
            return Response(serializer.data)
        else:
            topics = Topics.objects.filter(Q(topic_title__icontains=searchquery), user_id=user).order_by('-date_time')
            serializer = TopicsSerializer(topics , many = True)
            return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_new_community(request):

    user = request.user
    cmty_name = request.data.get('communityId')
    cmty_description = request.data.get('community_description')

    community = Community.objects.create(
        user_id=user,
        community_name=cmty_name,
        community_description=cmty_description,
        no_of_members=1
    )

    serializer = CommunitySerializer(community)

    CommunityMembers.objects.create(user_id=user, community_id=community)

    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_community(request):

    user = request.user
    searchquery = request.data.get('searchquery')
    selection = request.data.get('selection')
    if searchquery is None or searchquery == "":
        if selection == 0:
            community = Community.objects.all()
            serializer = CommunitySerializer(community , many = True)
            return Response(serializer.data)
        else:
            community_ids = CommunityMembers.objects.filter(user_id=user).values_list('community_id', flat=True)
            community = Community.objects.filter(id__in=community_ids)
            serializer = CommunitySerializer(community , many = True)
            return Response(serializer.data)
    else:
        if selection == 0:
            community = Community.objects.filter(Q(community_name__icontains=searchquery))
            serializer = CommunitySerializer(community , many = True)
            return Response(serializer.data)
        else:
            community_ids = CommunityMembers.objects.filter(user_id=user).values_list('community_id', flat=True)
            community = Community.objects.filter(Q(community_name__icontains=searchquery), id__in=community_ids)
            serializer = CommunitySerializer(community , many = True)
            return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_view_community(request):

    cmt_id = request.data.get('cmt_id')
    community = Community.objects.filter(id__in=cmt_id)
    serializer = CommunitySerializer(community , many = True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_community_post(request):

    cmt_id = request.data.get('cmt_id')
    searchquery = request.data.get('searchquery')
    
    if searchquery is None or searchquery == "":
        posts = Topics.objects.filter(community_id=cmt_id, status='true').order_by('-date_time')
    else:
        posts = Topics.objects.filter(Q(topic_title__icontains=searchquery) & Q(community_id=cmt_id) & Q(status='true')).order_by('-date_time')

    serializer = TopicsSerializer(posts, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_check_membership(request):

    user = request.user
    community_id = request.data.get('cmt_id')

    try:
        community = Community.objects.get(id=community_id)
    except Community.DoesNotExist:
        return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)

    is_member = CommunityMembers.objects.filter(user_id=user, community_id=community).exists()

    return Response({"is_member": is_member}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_join_community(request):
    
    user = request.user
    community_id = request.data.get('cmt_id')

    try:
        community = Community.objects.get(id=community_id)
    except Community.DoesNotExist:
        return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)

    if CommunityMembers.objects.filter(user_id=user, community_id=community).exists():
        return Response({"error": "User is already a member"}, status=status.HTTP_400_BAD_REQUEST)

    CommunityMembers.objects.create(user_id=user, community_id=community)
    community.no_of_members = (community.no_of_members or 0) + 1
    community.save()
    return Response({"message": "User successfully joined the community"}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_leave_community(request):

    user = request.user
    community_id = request.data.get('cmt_id')

    try:
        community = Community.objects.get(id=community_id)
    except Community.DoesNotExist:
        return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)

    membership = CommunityMembers.objects.filter(user_id=user, community_id=community).first()
    if not membership:
        return Response({"error": "User is not a member of the community"}, status=status.HTTP_400_BAD_REQUEST)

    membership.delete()
    if community.no_of_members and community.no_of_members > 0:
        community.no_of_members -= 1
        community.save()
    return Response({"message": "User successfully left the community"}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_new_topic(request):

    user = request.user
    community_id = request.data.get('community_id')

    try:
        community = Community.objects.get(id=community_id)
    except Community.DoesNotExist:
        return Response({"error": "Community not found"}, status=status.HTTP_404_NOT_FOUND)

    title = request.data.get('title')
    description = request.data.get('description')
    link = request.data.get('link', None)
    image = request.FILES.get('image', None)
    video = request.FILES.get('video', None)

    topic = Topics.objects.create(
        user_id=user,
        community_id=community,
        topic_title=title,
        topic_description=description,
        topic_link=link,
        topic_image=image,
        topic_video=video
    )

    serializer = TopicsSerializer(topic)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_view_post(request):

    pstid = request.data.get('pstid')

    try:
        topic = get_object_or_404(Topics, id=pstid, status='true')
        topic.views = (topic.views or 0) + 1
        topic.save()
        upvotes = Votes.objects.filter(topic_id=topic, votes='up').count()
        downvotes = Votes.objects.filter(topic_id=topic, votes='down').count()
        serializer = TopicsSerializer(topic)

        topic_data = serializer.data
        topic_data['upvotes'] = upvotes
        topic_data['downvotes'] = downvotes

        return Response(topic_data, status=status.HTTP_200_OK)
    except Topics.DoesNotExist:
        return Response({"error": "Topic not found or is inactive."}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_add_vote(request):

    user = request.user
    topic_id = request.data.get('topic_id')
    topic = get_object_or_404(Topics, id=topic_id)
    vote_type = request.data.get('vote_type')

    if not topic_id or not vote_type:
        return Response({'error': 'Invalid data'}, status=400)

    vote, created = Votes.objects.get_or_create(user_id=user, topic_id=topic)
    vote.votes = vote_type
    vote.save()

    upvotes = Votes.objects.filter(topic_id=topic_id, votes='up').count()
    downvotes = Votes.objects.filter(topic_id=topic_id, votes='down').count()

    return Response({'upvotes': upvotes, 'downvotes': downvotes}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_view_comments(request):

    pstid = request.data.get('pstid')
    try:
        comments = Comments.objects.filter(topic_id=pstid, status='true').order_by('-comment_time')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Comments.DoesNotExist:
        return Response({"error": "No comments found for this topic."}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_new_comment(request):

    user = request.user
    topic_id = request.data.get('topic_id')
    topic = Topics.objects.get(id=topic_id)
    comment = request.data.get('comment')

    if not comment:
        return Response({"error": "Comment cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
    new_comment = Comments.objects.create(
        user_id=user,
        topic_id=topic,
        comment=comment,
        status='true'
    )
    new_comment.save()
    return Response(status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_profile(request):
    user = request.user
    serializer = ProfileSerializer(user)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_edit_profile(request):
    user = request.user
    serializer = ProfileSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_list_conversations (request):

    searchquery =request.data.get('searchquery')
    user = request.user
    if searchquery is None or searchquery == "":
        conversations = Conversation.objects.filter(participants=user)
    else:
        conversations = Conversation.objects.filter(participants=user).filter(participants__user_name__icontains=searchquery).distinct()

    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_search_users(request):

    searchquery =request.data.get('searchquery')
    if searchquery:
        users = UsersTable.objects.filter(user_name__icontains=searchquery).exclude(Q(id=request.user.id) | Q(is_staff=1))
        users_data = [{'id': user.id, 'user_name': user.user_name} for user in users]
        return Response(users_data)
    return Response({"error": "No search query provided."}, status=400)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_new_conversation(request):

    participants_ids = request.data.get('participants', [])
    participants = UsersTable.objects.filter(id__in=participants_ids)
    
    if participants.exists():
        conversation = Conversation.objects.create()
        conversation.participants.set(participants)
        conversation.participants.add(request.user)
        conversation.save()
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response({"error": "Invalid participants"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_list_messages(request, id):

    conversation_id = id
    conversation = Conversation.objects.filter(id=conversation_id, participants=request.user).first()

    if not conversation:
        return Response({"error": "No such conversation"}, status=status.HTTP_404_NOT_FOUND)

    messages = Message.objects.filter(conversation=conversation)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_create_message(request):

    conversation_id = request.data.get('conversation_id')
    content = request.data.get('content')

    conversation = Conversation.objects.filter(id=conversation_id, participants=request.user).first()

    if not conversation:
        return Response({"error": "Conversation not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)

    message = Message.objects.create(conversation=conversation, sender=request.user, content=content)
    serializer = MessageSerializer(message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)