from django.shortcuts import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from .utils import is_us_holiday, model, zones, geo_json_data
import json, datetime, os, pandas as pd
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
def register(request):
    if request.method == 'POST':
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
                User.objects.create_user(username=username, email=email, password=password)
                return JsonResponse({'message': 'User created successfully!'}, status=200)
        else:
            return JsonResponse({'message': 'Passwords do not match!'}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return JsonResponse({'access_token': access_token})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


@api_view(['POST'])       
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful!'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def predict(request):
    hour = request.GET['hour']
    month = request.GET['month']
    day_of_month = request.GET['day_of_month']
    day_of_week = datetime.date(2023, int(month), int(day_of_month)).weekday()
    is_weekend = int(day_of_week in [5, 6])
    is_holiday = is_us_holiday(f"2023-{str(month).zfill(2)}-{str(day_of_month).zfill(2)}")
    predictions = {}
    for zone in zones:
        X = pd.DataFrame([{'zone': zone, 'hour': hour, 'day_of_week': day_of_week,
                       'is_weekend': is_weekend, 'is_holiday': is_holiday, 'month': month}])
        busyness = model.predict(X)
        predictions[zone] = busyness[0]
    return HttpResponse(json.dumps(predictions))

def geoJson(request):
    return JsonResponse(geo_json_data)