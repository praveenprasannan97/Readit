from django.urls import path
from adminsite import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.admin_login, name='login'),
    path('logout', views.logout, name='logout'),
    path('forgotpass', views.forgot_pass, name='forgotpass'),
    path('resetpass/<int:ky>', views.reset_pass, name="resetpass"),
    path('listposts', views.list_posts, name='listposts'),
    path('listusers', views.list_users, name='listusers'),
    path('viewuser/<int:ky>', views.view_user, name='viewuser'),
    path('edituser/<int:ky>', views.edit_user, name='edituser'),
    path('viewpost/<int:ky>', views.view_post, name='viewpost'),
    path('changepass/<str:us>', views.change_pass, name='changepass'),
    path('togglepost1/<int:pk>', views.post_toggle1, name='togglepost1'),
    path('togglepost2/<int:pk>', views.post_toggle2, name='togglepost2'),
    path('deletepost/<int:pk>', views.del_post, name='deletepost'),
    path('usertoggle1/<int:pk>', views.user_toggle1, name='usertoggle1'),
    path('usertoggle2/<int:pk>', views.user_toggle2, name='usertoggle2'),
    path('deleteuser/<int:pk>', views.del_user, name='deleteuser'),
    path('deletecmnt/<int:pk>/<int:ky>', views.del_comment, name='deletecmnt'),
    path('togglecmnt/<int:pk>/<int:ky>', views.toggle_comment, name='togglecmnt'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)