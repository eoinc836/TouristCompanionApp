from django.urls import path
from . import views, services

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('predict', views.predict, name='predict'),
    path('geoJson', views.geoJson, name='geoJson'),
    path('get_forecast', services.get_forecast, name='get_forecast'),
    path('get_venues', services.get_venues, name='get_venues'),
]