from django.http import JsonResponse
from django.shortcuts import HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import *
from django.core.cache import cache
from .utils import is_forecast_available, find_zone, is_in_manhattan, top_attractions
import time, environ, requests
import json
from django.http import HttpResponseNotFound, JsonResponse
from django.db.models import Q 
import logging

env = environ.Env()
environ.Env.read_env("../backend/.env")

BESTTIME_API_URL = "https://besttime.app/api/v1/"

@require_http_methods(['GET'])
def get_top_attractions(request):
    # check if data is already in cache
    cached_data = cache.get('top_attractions_data')
    
    if cached_data is not None:
        return JsonResponse(cached_data)

    # if data is not in cache, query database then cache result
    venues_details = {}
    attractions = Venue.objects.filter(venue_name__in=top_attractions)
    for attraction in attractions:
        attraction_data = VenueData.objects.get(venue_id=attraction.venue_id)
        venues_details[attraction.venue_name] = {
            "venue_address": attraction.venue_address,
            "longitude": attraction.longitude,
            "latitude": attraction.latitude,
            "venue_opening_hours": attraction.opening_hours,
            "busyness_monday": attraction_data.busyness_monday,
            "busyness_tuesday": attraction_data.busyness_tuesday,
            "busyness_wednesday": attraction_data.busyness_wednesday,
            "busyness_thursday": attraction_data.busyness_thursday,
            "busyness_friday": attraction_data.busyness_friday,
            "busyness_saturday": attraction_data.busyness_saturday,
            "busyness_sunday": attraction_data.busyness_sunday,
            "rating": attraction_data.rating,
        }

    cache.set('top_attractions_data', venues_details, timeout=60 * 60 * 24 * 7 * 3)

    return JsonResponse(venues_details)

@require_http_methods(['GET'])
def get_forecast(request):
    venue_name = request.GET['venue_name']
    venue_address = request.GET['venue_address'].replace(", USA", "")
    venue_rating = request.GET.get('venue_rating')
    
    if venue_rating == 'undefined':
        venue_rating = None

    if Venue.objects.filter(venue_address=venue_address, venue_name=venue_name).exists():
        venue_static = Venue.objects.get(venue_address=venue_address)
        venue = VenueData.objects.get(venue_id=venue_static.venue_id)
        if not venue.rating:
            venue.rating = venue_rating
            venue.save()
        venue_details = {
            "venue_name": venue_static.venue_name,
            "venue_address": venue_static.venue_address,
            "longitude": venue_static.longitude,
            "latitude": venue_static.latitude,
            "venue_opening_hours": venue_static.opening_hours,
            "busyness_monday": venue.busyness_monday,
            "busyness_tuesday": venue.busyness_tuesday,
            "busyness_wednesday": venue.busyness_wednesday,
            "busyness_thursday": venue.busyness_thursday,
            "busyness_friday": venue.busyness_friday,
            "busyness_saturday": venue.busyness_saturday,
            "busyness_sunday": venue.busyness_sunday,
            "rating": venue.rating
        }
        return JsonResponse(venue_details)
    
    url = BESTTIME_API_URL + "forecasts"
    params = {
        'api_key_private': env('BESTTIME_API_KEY'),
        'venue_name': venue_name,
        'venue_address': venue_address
    }
    response = requests.post(url, params=params)
    data = response.json()

    # to handle venues not found in best time
    if response.status_code != 200 and "Could not find venue." in data["message"]:
        return HttpResponse("Could not find venue. Please check the name and address again or pick a different venue.")
    
    # to handle venues found in best time but without forecasts
    elif response.status_code != 200 and "Venue found," in data["message"]:
        venue_static = Venue.objects.create(
            venue_id = data["venue_info"]["venue_id"],
            venue_name = venue_name,
            venue_address = venue_address
        )
        venue = VenueData.objects.create(
            venue_id = venue_static,
            rating = venue_rating,
            scrape_date = int(time.time())
        )
    
    # for successful predictions
    else:
        venue_static = Venue.objects.create(
            venue_id = data["venue_info"]["venue_id"],
            venue_name = venue_name,
            venue_address = venue_address,
            opening_hours = f'{data["analysis"][0]["day_info"]["venue_open"]} - {data["analysis"][0]["day_info"]["venue_closed"]}',
            longitude = data["venue_info"]["venue_lon"],
            latitude = data["venue_info"]["venue_lat"]
        )

        busyness_dict = {}
        for day in data["analysis"]:
            if response.status_code == 200:
                weekday = day["day_info"]["day_text"]
                busyness_dict[weekday] = day["day_raw"]
            else:
                busyness_dict[weekday] = None

        venue = VenueData.objects.create(
            venue_id = venue_static,
            busyness_monday = busyness_dict["Monday"],
            busyness_tuesday = busyness_dict["Tuesday"],
            busyness_wednesday = busyness_dict["Wednesday"],
            busyness_thursday = busyness_dict["Thursday"],
            busyness_friday = busyness_dict["Friday"],
            busyness_saturday = busyness_dict["Saturday"],
            busyness_sunday = busyness_dict["Sunday"],
            rating = venue_rating,
            scrape_date = int(time.time())
        )

    venue_details= {
        "venue_name": venue_static.venue_name,
        "venue_address": venue_static.venue_address,
        "longitude": venue_static.longitude,
        "latitude": venue_static.latitude,
        "venue_opening_hours": venue_static.opening_hours,
        "busyness_monday": venue.busyness_monday,
        "busyness_tuesday": venue.busyness_tuesday,
        "busyness_wednesday": venue.busyness_wednesday,
        "busyness_thursday": venue.busyness_thursday,
        "busyness_friday": venue.busyness_friday,
        "busyness_saturday": venue.busyness_saturday,
        "busyness_sunday": venue.busyness_sunday,
        "rating": venue_rating
    }

    return JsonResponse(venue_details)
    
@require_http_methods(['GET'])
def get_venues(request):

    url = BESTTIME_API_URL + "venues/search"
    user_lat = request.GET.get('latitude')
    user_lng = request.GET.get('longitude')
    if not user_lat and not user_lng:
        params = {
            'api_key_private': env('BESTTIME_API_KEY'),
            'q': f"{request.GET.get('busyness','')} {request.GET.get('attraction_type','')} in Manhattan New York {request.GET.get('day','')} {request.GET.get('time','')}",
            'num': 10,
            'fast': False,
            'format': 'raw'
        }
    
    else:
        params = {
            'api_key_private': env('BESTTIME_API_KEY'),
            'q': f"{request.GET.get('busyness','')} {request.GET.get('attraction_type','')} in Manhattan New York {request.GET.get('day','')} {request.GET.get('time','')}",
            'num': 10,
            'lat': user_lat,
            'lng': user_lng,
            'radius': 2000,
            'fast': False,
            'format': 'raw'
        }
    
    venue_search_response = requests.post(url, params=params)
    meta_data = venue_search_response.json()
    search_progress_link = meta_data["_links"]["venue_search_progress"]
    search_progress_response = requests.get(search_progress_link)
    search_progress_response_json = search_progress_response.json()

    while not search_progress_response_json["job_finished"]:
        search_progress_response = requests.get(search_progress_link)
        search_progress_response_json = search_progress_response.json()

    unfiltered_venues = search_progress_response_json["venues"]
    forecasted_venues = filter(is_forecast_available, unfiltered_venues)
    forecasted_manhattan_venues = list(filter(is_in_manhattan, forecasted_venues))
    if user_lat and user_lng:
        nearby_venues = []
        user_zone = find_zone(user_lat, user_lng)
        for venue in forecasted_manhattan_venues:
            venue_zone = find_zone(venue["venue_lat"], venue["venue_lon"])
            if venue_zone is not None and user_zone is not None and venue_zone == user_zone:
                nearby_venues.append(venue)
        venues = nearby_venues
        
    else:
        venues = forecasted_manhattan_venues

    venue_details = {}
    for venue in venues:
        if not Venue.objects.filter(venue_id=venue["venue_id"]).exists():
            venues_static = Venue.objects.create(
            venue_id = venue["venue_id"],
            venue_name = venue["venue_name"],
            venue_address = venue["venue_address"],
            opening_hours = f'{venue["venue_foot_traffic_forecast"][0]["day_info"]["venue_open"]} - {venue["venue_foot_traffic_forecast"][0]["day_info"]["venue_closed"]}',
            longitude = venue["venue_lon"],
            latitude = venue["venue_lat"]
            )
            
            VenueData.objects.create(
                venue_id = venues_static,
                busyness_monday = venue["venue_foot_traffic_forecast"][0]["day_raw"],
                busyness_tuesday = venue["venue_foot_traffic_forecast"][1]["day_raw"],
                busyness_wednesday = venue["venue_foot_traffic_forecast"][2]["day_raw"],
                busyness_thursday = venue["venue_foot_traffic_forecast"][3]["day_raw"],
                busyness_friday = venue["venue_foot_traffic_forecast"][4]["day_raw"],
                busyness_saturday = venue["venue_foot_traffic_forecast"][5]["day_raw"],
                busyness_sunday = venue["venue_foot_traffic_forecast"][6]["day_raw"],
                scrape_date = int(time.time())   
            )
    
        venue_details[venue["venue_id"]] = {
            "venue_name": venue["venue_name"],
            "venue_address": venue["venue_address"],
            "longitude": venue["venue_lon"],
            "latitude": venue["venue_lat"],
            "venue_opening_hours": f'{venue["venue_foot_traffic_forecast"][0]["day_info"]["venue_open"]} - {venue["venue_foot_traffic_forecast"][0]["day_info"]["venue_closed"]}',
            "busyness_monday": venue["venue_foot_traffic_forecast"][0]["day_raw"],
            "busyness_tuesday": venue["venue_foot_traffic_forecast"][1]["day_raw"],
            "busyness_wednesday": venue["venue_foot_traffic_forecast"][2]["day_raw"],
            "busyness_thursday": venue["venue_foot_traffic_forecast"][3]["day_raw"],
            "busyness_friday": venue["venue_foot_traffic_forecast"][4]["day_raw"],
            "busyness_saturday": venue["venue_foot_traffic_forecast"][5]["day_raw"],
            "busyness_sunday": venue["venue_foot_traffic_forecast"][6]["day_raw"],
            }
        search_string = f'{venue["venue_name"]}{venue["venue_address"]}'
        url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={search_string}&inputtype=textquery&fields=formatted_address%2Cname%2Crating&key=AIzaSyA-MvlBdzIUHtnKMNa4bYUXjHtW_79MKSQ"

        response = requests.request("GET", url)
        data = response.json()
        print("data is: ", data)

        if data["candidates"] and "rating" in data["candidates"][0]:
            venue_details[venue["venue_id"]]["rating"] = data["candidates"][0]['rating']
        else:
            venue_details[venue["venue_id"]]["rating"] = None
    return JsonResponse(venue_details, safe=False)

@csrf_exempt
def saved_place(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        #print('data in services are:', data)
        username = data.get('username') 
        print('username in services are:', username)

        # Get the user object of the provided username
        user = User.objects.get(username=username)
        print('user is:', user)
         
        saved_place = data.get('saved_place') 
        #print('saved place in services are:', saved_place)

        if username and saved_place:
            try:
                venue = Venue.objects.get(venue_name=saved_place)
                SavedPlace.objects.create(username=user, saved_place=saved_place, venue_id=venue)
                return JsonResponse({'message': 'Saved successfully'})
            except Exception as e:
                return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def delete_saved_place(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        saved_place = data.get('saved_place')
        if username and saved_place:
            try:
                user = User.objects.get(username=username)
                SavedPlace.objects.filter(username=user, saved_place=saved_place).delete()
                return JsonResponse({'message': 'Deleted successfully'})
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'})
            except Exception as e:
                return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def get_saved_places(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        print("username is: ", username)
        if username:
            try:
                user = User.objects.get(username=username)
                saved_places = SavedPlace.objects.filter(username=user).values('saved_place', 'venue_id')
                saved_places_list = []
                for saved_place in saved_places:
                    venue_id = saved_place['venue_id']  
                    venue = Venue.objects.get(venue_id=venue_id)

                    saved_place_data = {
                        'saved_place': saved_place['saved_place'],
                        'venue_address': venue.venue_address,
                        'longitude': venue.longitude,
                        'latitude': venue.latitude,
                        'opening_hours': venue.opening_hours
                    }
                    saved_places_list.append(saved_place_data)

                return JsonResponse({'saved_places': saved_places_list})
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'})
            except Exception as e:
                return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@require_http_methods(['GET'])
def get_venue_by_name(request):
    venue_name = request.GET.get('venue_name')
    try:
        venue = Venue.objects.get(venue_name=venue_name)
        venue_data = VenueData.objects.get(venue_id=venue.venue_id)

        response = {
            "venue_id": venue.venue_id,
            "venue_name": venue.venue_name,
            "venue_address": venue.venue_address,
            "opening_hours": venue.opening_hours,
            "longitude": venue.longitude,
            "latitude": venue.latitude,
            "busyness_monday": venue_data.busyness_monday,
            "busyness_tuesday": venue_data.busyness_tuesday,
            "busyness_wednesday": venue_data.busyness_wednesday,
            "busyness_thursday": venue_data.busyness_thursday,
            "busyness_friday": venue_data.busyness_friday,
            "busyness_saturday": venue_data.busyness_saturday,
            "busyness_sunday": venue_data.busyness_sunday,
            "scrape_date": venue_data.scrape_date,
        }

        return JsonResponse(response)
    except Venue.DoesNotExist:
        return HttpResponseNotFound('Venue not found')
    

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        username = data.get('username')
        new_password = data.get('new_password')

        try:
            user = User.objects.filter(Q(email=email) & Q(username=username)).first()
            print("user is: ", user)

            if user:
                print("I'm here")
                user.set_password(new_password)
                user.save()
                return JsonResponse({'message': 'Password reset successfully'})
            else:
                return JsonResponse({'error': 'Username does not exist'})

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'})

    return JsonResponse({'error': 'Invalid request method'})
	
	
@require_http_methods(['GET'])
def fetch_rating_from_google(request):
    print("Function started.")
    
    venue_name = request.GET.get('venue_name', None)
    venue_address = request.GET.get('venue_address', None)
    
    print(f"Received venue_name: {venue_name}, venue_address: {venue_address}")

    if not venue_name or not venue_address:
        return JsonResponse({"error": "Missing required parameters."}, status=400)

    search_string = f'{venue_name}{venue_address}'
    url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={search_string}&inputtype=textquery&fields=formatted_address%2Cname%2Crating&key=AIzaSyDHD8Mx3whdiohHLAqUltDnog3v5Q5-KVA"
    
    response = requests.get(url)
    data = response.json()

    if data["candidates"] and 'rating' in data["candidates"][0]:
        return JsonResponse({"rating": data["candidates"][0]['rating']})
    else:
        return JsonResponse({"error": "Rating not found."}, status=404)
    # return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)


@require_http_methods(['GET'])
def get_place_photo(request):
    GOOGLE_API_KEY = 'AIzaSyDHD8Mx3whdiohHLAqUltDnog3v5Q5-KVA'
    REVERSE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo"

    lat = request.GET.get('lat')
    lng = request.GET.get('lng')

    if not lat or not lng:
        return JsonResponse({"error": "lat and lng parameters are required"}, status=400)

    # Reverse geocode to get place_id
    reverse_geocode_response = requests.get(f"{REVERSE_GEOCODE_URL}?latlng={lat},{lng}&key={GOOGLE_API_KEY}")
    if reverse_geocode_response.status_code != 200:
        return JsonResponse({"error": "Failed to reverse geocode"}, status=500)

    reverse_geocode_data = reverse_geocode_response.json()
    results = reverse_geocode_data.get("results")
    if not results:
        return JsonResponse({"error": "No results found in reverse geocode data"}, status=404)
    place_id = results[0].get("place_id")
    if not place_id:
        return JsonResponse({"error": "No place found for this location"}, status=404)

    # Fetch place details to get a photo reference
    place_details_response = requests.get(f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={GOOGLE_API_KEY}")
    if place_details_response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch place details"}, status=500)

    place_details = place_details_response.json()
    photo_reference = place_details.get("result", {}).get("photos", [{}])[0].get("photo_reference")
    if not photo_reference:
        return JsonResponse({"error": "No photo available for this place"}, status=404)

    # Fetch photo using photo_reference
    photo_url = f"{PLACE_PHOTO_URL}?maxwidth=400&photoreference={photo_reference}&key={GOOGLE_API_KEY}"

    return JsonResponse({"photo_url": photo_url}) 


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@require_http_methods(['GET'])
def get_place_description(request):
    GOOGLE_API_KEY = 'AIzaSyDHD8Mx3whdiohHLAqUltDnog3v5Q5-KVA'
    REVERSE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

    lat = request.GET.get('lat')
    lng = request.GET.get('lng')

    logger.info(f"Received lat: {lat}, lng: {lng}")

    if not lat or not lng:
        return JsonResponse({"error": "lat and lng parameters are required"}, status=400)

    # Reverse geocode to get place_id
    reverse_geocode_response = requests.get(f"{REVERSE_GEOCODE_URL}?latlng={lat},{lng}&key={GOOGLE_API_KEY}")
    if reverse_geocode_response.status_code != 200:
        logger.error("Reverse geocode API call failed with status: %s", reverse_geocode_response.status_code)
        return JsonResponse({"error": "Failed to reverse geocode"}, status=500)

    reverse_geocode_data = reverse_geocode_response.json()
    logger.info(f"Reverse geocode data: {reverse_geocode_data}")

    results = reverse_geocode_data.get("results")
    if not results:
        return JsonResponse({"error": "No results found in reverse geocode data"}, status=404)
    place_id = results[0].get("place_id")
    if not place_id:
        return JsonResponse({"error": "No place found for this location"}, status=404)

    # Fetch place details
    place_details_response = requests.get(f"{PLACE_DETAILS_URL}?place_id={place_id}&key={GOOGLE_API_KEY}")
    if place_details_response.status_code != 200:
        logger.error("Place details API call failed with status: %s", place_details_response.status_code)
        return JsonResponse({"error": "Failed to fetch place details"}, status=500)

    place_details = place_details_response.json()
    logger.info(f"Place details data: {place_details}")

    result = place_details.get("result", {})
    
    # Extract relevant fields
    overview = result.get("editorial_summary", {}).get("overview")
    international_phone_number = result.get("international_phone_number")

    # Assuming the 'relative_time_description' and 'text' fields belong to a review:
    review = result.get("reviews", [{}])[0]  # Get the first review, if available
    relative_time_description = review.get("relative_time_description")
    text = review.get("text")

    # Return a structured response instead of cramming everything into description
    response_data = {
        "overview": overview,
        "international_phone_number": international_phone_number,
        "relative_time_description": relative_time_description,
        "review_text": text
    }

    return JsonResponse(response_data)