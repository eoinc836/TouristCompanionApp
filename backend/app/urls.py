from django.urls import path
from . import views, services

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('predict', views.predict, name='predict'),
    path('geoJson', views.geoJson, name='geoJson'),
    path('get_forecasts', services.get_forecasts, name='get_forecasts'),
    path('get_venue_search', services.get_venue_search, name='get_venue_search'),
]