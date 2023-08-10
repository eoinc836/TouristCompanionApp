from django.urls import path
from . import views, services
from app.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('predict', views.predict, name='predict'),
    path('geoJson', views.geoJson, name='geoJson'),
    path('get_forecast', services.get_forecast, name='get_forecast'),
    path('get_venues', services.get_venues, name='get_venues'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout_view, name='logout'),
    path('get_top_attractions', services.get_top_attractions, name='get_top_attractions'),
    path('saved_place', services.saved_place, name='saved_place'),
    path('delete_saved_place', services.delete_saved_place, name='delete_saved_place'),
    path('get_saved_places', services.get_saved_places, name='get_saved_places'),
    path('get_venue_by_name', services.get_venue_by_name, name='get_venue_by_name'),
    path('reset_password', services.reset_password, name='reset_password'),
	path('fetch_rating', services.fetch_rating_from_google, name='fetch_rating'),
    path('get_place_photo', services.get_place_photo, name='get_place_photo'),
    path('get_place_description', services.get_place_description, name='get_place_description'),
]