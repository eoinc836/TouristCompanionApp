from django.urls import path
from .views import index, register, login, predict
from .services import get_forecasts, get_venue_search


urlpatterns = [
    path('', index, name='index'),
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('predict', predict, name='predict'),
    path('get_forecasts/', get_forecasts, name='get_forecasts'),
    path('get_venue_search/', get_venue_search, name='get_venue_search')
]