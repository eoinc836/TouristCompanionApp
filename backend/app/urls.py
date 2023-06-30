from django.urls import path
from .views import UserView, front

urlpatterns = [
    path('api', UserView.as_view()),
    path('', front),
]