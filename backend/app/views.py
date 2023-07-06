from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
# from .serializers import UserSerializer
# from .models import User

# Create your views here.
# class UserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

def index(request):
    return render(request, "index.html")   

def register(request):
    if request.method == 'POST':
        # first_name = request.POST['fname']
        # last_name = request.POST['lname']
        data = json.loads(request.body)
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        password2 = data.get('password2')
        if password == password2:
            if User.objects.filter(email=email).exists():
                return JsonResponse({'message': 'Email already exists!'}, status=400)
            elif User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already exists!'}, status=400)
            else:
                User.objects.create_user(username=username, email=email, password=password)  # first_name=first_name, last_name=last_name)
                return JsonResponse({'message': 'User created successfully!'}, status=200)
        else:
            return JsonResponse({'message': 'Passwords do not match!'}, status=400)

def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return JsonResponse({'message': 'Logged in successfully!'})
        else:
            return JsonResponse({'message': 'Invalid credentials!'})
    else:
        return JsonResponse({'message': 'Invalid request method!'})
        
def logout(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful.'})