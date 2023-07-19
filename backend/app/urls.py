from django.urls import path
from .views import index, register, login, predict, geoJson

urlpatterns = [
    path('', index, name='index'),
    path('api/register', register, name='register'),
    path('api/login', login, name='login'),
    path('api/predict', predict, name='predict'),
    path('api/geoJson', geoJson, name='geoJson')
]