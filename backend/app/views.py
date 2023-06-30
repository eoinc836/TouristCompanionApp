from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .models import User

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def front(request):
    context = { }
    return render(request, "index.html", context)   