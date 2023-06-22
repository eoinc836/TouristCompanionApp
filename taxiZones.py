import json
json_path = 'taxiZones.json'

with open(json_path,'r') as file:
    zoneData = json.load(file)


#index 12 is area name
#index 14 is the borough
#index 13 is TLC Taxi Zone

zonesAndNames = {}
for i in range (len(zoneData['data'])):
    if (zoneData['data'][i][14]) == 'Manhattan':
        zonesAndNames[f"{zoneData['data'][i][13]}"] = {zoneData['data'][i][12]}

#Area in square miles
namesAndAreas = {
    'Alphabet City': 0.28,
    'Bloomingdale': 0.50,
    'Battery Park': 0.35,
    'Battery Park City': 0.31,
    'Central Harlem': 1.60,
    'Chinatown': 0.29,
    'Central Harlem North': 0.85,
    'Central Park': 1.32,
    'Clinton East': 0.16,
    'Clinton West': 0.13,
    'East Chelsea': 0.31,
    'East Village': 0.66,
    'East Harlem North': 0.59,
    'East Harlem South': 0.77,
    'Financial District North': 0.42,
    'Financial District South': 0.31,
    'Flatiron': 0.16,
    'Hudson Sq': 0.11,
    'Garment District': 0.25,
    "Governor's Island/Ellis Island/Liberty Island": 0.20,  # Approximation based on similar islands
    'Gramercy': 0.34,
    'Greenwich Village North': 0.14,
    'Greenwich Village South': 0.15,
    'Hamilton Heights': 0.87,
    'Highbridge Park': 0.25,
    'Inwood': 1.34,
    'Inwood Hill Park': 0.25,
    'Manhattan Valley': 0.40,
    'Lenox Hill East': 0.43,
    'Kips Bay': 0.31,
    'Lenox Hill West': 0.46,
    'Lincoln Square East': 0.23,
    'Manhattanville': 0.30,
    'Lincoln Square West': 0.27,
    'Little Italy/NoLiTa': 0.10,
    'Lower East Side': 0.54,
    'Marble Hill': 0.60,
    'Meatpacking/West Village West': 0.20,
    'Midtown Center': 0.23,
    'Midtown East': 0.40,
    'Midtown North': 0.19,
    'Midtown South': 0.30,
    'Murray Hill': 0.34,
    'Morningside Heights': 0.78,
    'Penn Station/Madison Sq West': 0.18,
    'Randalls Island': 0.50,  # Approximation based on size
    'Roosevelt Island': 0.80,  # Approximation based on size
    'Seaport': 0.10,
    'SoHo': 0.31,
    'Stuy Town/Peter Cooper Village': 0.24,
    'Sutton Place/Turtle Bay North': 0.28,
    'Times Sq/Theatre District': 0.09,
    'TriBeCa/Civic Center': 0.35,
    'Upper West Side South': 0.73,
    'Two Bridges/Seward Park': 0.17,
    'UN/Turtle Bay South': 0.21,
    'Union Sq': 0.15,
    'Upper East Side North': 0.59,
    'Upper East Side South': 0.80,
    'Upper West Side North': 0.63,
    'Yorkville West': 0.37,
    'Washington Heights North': 1.22,
    'Washington Heights South': 0.81,
    'West Chelsea/Hudson Yards': 0.28,
    'West Village': 0.38,  # Approximation based on similar neighborhood size
    'World Trade Center': 0.31,  # Approximation based on similar neighborhood size
    'Yorkville East': 0.56  # Approximation based on similar neighborhood size
}
