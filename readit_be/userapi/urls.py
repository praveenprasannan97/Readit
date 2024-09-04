from django.urls import path
from adminsite import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.admin_login, name='login'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)