from django.urls import path
from .views import index, register #UserView, 

urlpatterns = [
    path('', index, name='index'),
    # path('api', UserView.as_view()),
    path('api/register', register, name='register'),
]