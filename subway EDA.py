import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns 
import folium
from folium.plugins import HeatMap 
from scipy import stats 
import numpy as np

# Specify the file path
file_path = r'C:\Users\MSI-Pc\Desktop\Summer project\MTA_Subway_Hourly_Ridership__Beginning_February_2022.csv'

# Read the CSV file into a DataFrame (df)
df = pd.read_csv(file_path)

# Remove the specified attributes from the DataFrame
df = df.drop(columns=['station_complex_id'])

# Display the loaded data
print(df.head())

# Get a quick overview of the data
df.info() 

# Check for missing data
print(df.isnull().sum())

# data types
df['ridership'] = df['ridership'].astype(int)
df['transfers'] = df['transfers'].astype(int) 

# Convert 'transit_timestamp' to datetime
df['transit_timestamp'] = pd.to_datetime(df['transit_timestamp'])



# Group data by latitude and longitude and calculate the sum of ridership at each location
location_ridership = df.groupby(['latitude', 'longitude'])['ridership'].sum().reset_index()

# Create a map centered around New York City
map = folium.Map(location=[40.7128, -74.0060], zoom_start=12) 

# Add a heat map to the map
heatmap_data = [[row['latitude'], row['longitude'], row['ridership']] for index, row in location_ridership.iterrows()]
HeatMap(heatmap_data).add_to(map)

# Display the map
map
map.save('heatmap.html')


