from django.urls import path
from userapi import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signup', views.api_signup, name='apisignup'),
    path('login', views.api_login, name='apilogin'),
    path('logout', views.api_logout, name="apilogout"),
    path('forgotpass', views.api_forgotpass, name='apiforgotpass'),
    path('reset', views.api_passreset, name='apipassreset'),
    path('changepass', views.api_changepass, name='apichangepass'),
    path('conversations', views.api_list_conversations, name='apilistconversations'),
    path('searchuser', views.api_search_users, name='apisearchuser'),
    path('createconversation', views.api_new_conversation, name='apicreateconversation'),
    path('messages/<int:id>', views.api_list_messages, name='apilistmessages'),
    path('createmessage', views.api_create_message, name='apicreatemessage'),
    path('community', views.api_community, name='apicommunity'),
    path('viewcommunity', views.api_view_community, name='apiviewcommunity'),
    path('communitypost', views.api_community_post, name='apicommunitypost'),
    path('checkmembership', views.api_check_membership, name='apicheckmembership'),
    path('joincommunity', views.api_join_community, name='apijoincommunity'),
    path('leavecommunity', views.api_leave_community, name='apileavecommunity'),
    path('newcommunity', views.api_new_community, name='apinewcommunity'),
    path('newtopic', views.api_new_topic, name='apinewtopic'),
    path('viewpost', views.api_view_post, name='apiviewpost'),
    path('viewcomments', views.api_view_comments, name='api_view_comments'),
    path('newcomment', views.api_new_comment, name='api_new_comment'),
    path('addvote', views.api_add_vote, name='apiaddvote'),
    path('topics', views.api_topics, name='apitopics'),
    path('hometopic', views.api_home_topics, name='apihometopics'),
    path('homecommunity', views.api_home_community, name='api_home_community'),
    path('profile', views.api_profile,name='apiprofile'),
    path('editprofile', views.api_edit_profile,name='apieditprofile'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)