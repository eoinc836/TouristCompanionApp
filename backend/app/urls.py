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
    path('get_forecasts', services.get_forecasts, name='get_forecasts'),
    path('get_venue_search', services.get_venue_search, name='get_venue_search'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout_view, name='logout'),
]