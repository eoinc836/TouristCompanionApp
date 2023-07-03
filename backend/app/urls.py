from django.urls import path
from .views import UserView, index, register

urlpatterns = [
    path('', index, name='index'),
    path('api', UserView.as_view()),
    path('api/register', register, name='register'),
]