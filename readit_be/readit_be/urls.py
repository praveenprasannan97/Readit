from django.urls import path, include

urlpatterns = [
    path('', include('adminsite.urls')),
    path('api', include('userapi.urls')),
]