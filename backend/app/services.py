from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import *
from .utils import is_forecast_available, find_zone, is_in_manhattan
import time, environ, requests

env = environ.Env()
environ.Env.read_env("../backend/.env")

BESTTIME_API_URL = "https://besttime.app/api/v1/"

@require_http_methods(['GET'])
def get_forecast(request):
    venue_name = request.GET['venue_name']
    venue_address = request.GET['venue_address'].replace(", USA", "")
    venue_rating = request.GET['venue_rating']

    if Venue.objects.filter(venue_address=venue_address).exists():
        venue_static = Venue.objects.get(venue_address=venue_address)
        venue = VenueData.objects.get(venue_id=venue_static.venue_id)
        if not venue.rating:
            venue.rating = venue_rating
            venue.save()
        venue_response = {
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
        return JsonResponse(venue_response)
    
    else:
        url = BESTTIME_API_URL + "forecasts"
        params = {
            'api_key_private': 'pri_516e2b7a8e794fb9a8a4aad46661b961',
            'venue_name': venue_name,
            'venue_address': venue_address
        }

        response = requests.post(url, params=params)
        data = response.json()

        # if("Venue found, but could not forecast this venue") in 

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
            weekday = day["day_info"]["day_text"]
            busyness_dict[weekday] = day["day_raw"]

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

        venue_response = {
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

        return JsonResponse(venue_response)

@require_http_methods(['GET'])
def get_venues(request):

    url = BESTTIME_API_URL + "venues/search"
    user_lat = request.GET.get('latitude')
    user_lng = request.GET.get('longitude')
    if not user_lat and not user_lng:
        params = {
            'api_key_private': 'pri_516e2b7a8e794fb9a8a4aad46661b961',
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

    venue_response = {}
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
    
        venue_response[venue["venue_id"]] = {
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

    return JsonResponse(venue_response, safe=False)