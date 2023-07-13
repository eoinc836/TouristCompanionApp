from django.shortcuts import render, HttpResponse
from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import is_us_holiday, model
import pandas as pd
import json
import datetime

def index(request):
    return render(request, "index.html")   

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        first_name = data.get['fname']
        last_name = data.get['lname']
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
                User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
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
    return JsonResponse({'message': 'Logout successful!'})

@csrf_exempt
def predict(request):
# zone busyness    
    zone = request.POST['zone']
    hour = request.POST['hour']
    month = request.POST['month']
    day_of_month = request.POST['day_of_month']
    day_of_week = datetime.date(2023, int(month), int(day_of_month)).weekday()
    is_weekend = int(day_of_week in [5, 6])
    is_holiday = is_us_holiday(f"2023-{str(month).zfill(2)}-{str(day_of_month).zfill(2)}")
    X = pd.DataFrame([{'zone': zone, 'hour': hour, 'day_of_week': day_of_week,
                       'is_weekend': is_weekend, 'is_holiday': is_holiday, 'month': month}])
    busyness = model.predict(X)
    return HttpResponse(busyness[0])

# besttime busyness
# insert code