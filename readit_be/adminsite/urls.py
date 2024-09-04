from django.urls import path
from adminsite import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.admin_login, name='login'),
    path('forgotpass', views.forgot_pass, name='forgotpass'),
    path('resetpass', views.reset_pass, name="resetpass"),
    path('listposts', views.list_posts, name='listposts'),
    path('listusers', views.list_users, name='listusers'),
    path('viewuser', views.view_user, name='viewuser'),
    path('edituser', views.edit_user, name='edituser'),
    path('viewpost', views.view_post, name='viewpost'),
    path('changepass', views.change_pass, name='changepass'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)