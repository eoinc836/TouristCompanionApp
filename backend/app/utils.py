from pandas.tseries.holiday import USFederalHolidayCalendar as calendar
<<<<<<< Updated upstream
import os, joblib, requests, json, environ, pandas as pd
=======
import os, joblib, json, environ, pandas as pd
>>>>>>> Stashed changes
from shapely.geometry import Point, shape

env = environ.Env()
environ.Env.read_env("../backend/.env")
<<<<<<< Updated upstream
# GOOGLE_MAPS_API_KEY = env('GOOGLE_MAPS_API_KEY')

zones = [262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231, 230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158, 153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114, 113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41, 13, 12, 24, 4]
=======

zones = [262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231, 230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158, 153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114, 113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41, 13, 12, 24, 4]

top_attractions = ["Central Park", "Times Square", "Empire State Building", "The Metropolitan Museum of Art", "One World Observatory", "Whitney Museum of American Art", "Rockefeller Center", "Chrysler Building", "Grand Central Terminal", "9/11 Memorial & Museum", "The Museum of Modern Art", "Bryant Park", "Chelsea Market", "Flatiron Building", "St. Patrick's Cathedral", "American Museum of Natural History", "New York Public Library - Stephen A. Schwarzman Building", "Washington Square Park", "Solomon R. Guggenheim Museum", "Top of the Rock"]
>>>>>>> Stashed changes

current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(current_dir, "../modeling/DecisionTreeRegressor.sav")
model = joblib.load(model_path)

geo_json_path = os.path.join(current_dir, "../modeling/NYC Taxi Zones.geojson")
with open(geo_json_path) as file:
    geo_json_data = json.load(file)

def is_us_holiday(date_str):
    """Check if a given date (str) is a US federal holiday."""
    cal = calendar()
    holidays = cal.holidays(start='2020-01-01', end='2023-12-31')
    return pd.to_datetime(date_str) in holidays

def is_forecast_available(venue):
    return venue["forecast"]

def is_in_manhattan(venue):
    # method 1 - faster
    venue_lat = venue["venue_lat"]
    venue_lon = venue["venue_lon"]
    point = Point(venue_lon, venue_lat)  
    for feature in geo_json_data['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(point) and int(feature['properties']['location_id']) in zones:
            return True
    return False

    # method 2 - slower (uses google maps api)
        # venue_lat = venue["venue_lat"]
        # venue_lon = venue["venue_lon"]
        # url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={venue_lat},{venue_lon}&key={GOOGLE_MAPS_API_KEY}"
        # response = requests.get(url)
        # google_data = response.json()
        # if "Manhattan" in google_data["results"][0]["formatted_address"]:
        #     return True
        # elif "Manhattan" in google_data["results"][0]["address_components"][2]["long_name"] or "Manhattan" in google_data["results"][0]["address_components"][3]["long_name"]:
        #     return True
        # return False

def find_zone(lat, lng):
    point = Point(lng, lat)  
    for feature in geo_json_data['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(point) and int(feature['properties']['location_id']) in zones:
            return feature['properties']['location_id']
<<<<<<< Updated upstream
    return None
=======
    return None


>>>>>>> Stashed changes
