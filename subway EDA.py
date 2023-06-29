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

# Print the data types of all columns
print(df.dtypes)

# Using Z-score to identify outliers
z_scores = stats.zscore(df[['ridership', 'transfers']])
abs_z_scores = np.abs(z_scores)
filtered_entries = (abs_z_scores < 3).all(axis=1) 

df = df[filtered_entries] 
print(filtered_entries)

# stats 
df.describe()

# Ridership per station
plt.figure(figsize=(12, 10))  # Increase the figure size
ax = sns.barplot(y='station_complex', x='ridership', data=df)  # Swap x and y axis
ax.set_title('Ridership per Station')
ax.set_xlabel('Ridership')  # Update x-axis label
ax.set_ylabel('Station Complex')  # Update y-axis label
plt.show()



# Ridership over time
plt.figure(figsize=(10,6))
df.set_index('transit_timestamp')['ridership'].plot()
plt.title('Ridership over Time')
plt.show() 

# correlation 
numerical_df = df.select_dtypes(include=[np.number])  # Select only numeric columns
correlation_matrix = numerical_df.corr()
sns.heatmap(correlation_matrix, annot=True)
plt.title('Correlation Matrix')
plt.show() 

# trends
df['hour'] = df['transit_timestamp'].dt.hour
df['day_of_week'] = df['transit_timestamp'].dt.dayofweek
df['month'] = df['transit_timestamp'].dt.month 

# Ridership by time of day
sns.lineplot(x='hour', y='ridership', data=df)
plt.title('Ridership by Time of Day')
plt.show() 

# Ridership by day of week
sns.lineplot(x='day_of_week', y='ridership', data=df)
plt.title('Ridership by Day of Week')
plt.show() 

# Ridership by month
sns.lineplot(x='month', y='ridership', data=df)
plt.title('Ridership by Month')
plt.show() 

# peak 
peak_hours = df.groupby('hour')['ridership'].mean().idxmax()
peak_day = df.groupby('day_of_week')['ridership'].mean().idxmax()
print(f"The peak hours for subway usage are around {peak_hours}.")
print(f"The peak day for subway usage is {peak_day}.") 

# High-Traffic Station
top_stations = df.groupby('station_complex')['ridership'].sum().nlargest(5)
print("The top 5 stations with highest ridership are: \n", top_stations)

# transfers
top_transfer_stations = df.groupby('station_complex')['transfers'].sum().nlargest(5)
print("The top 5 stations with highest transfers are: \n", top_transfer_stations)

# temporal trend: 
# Resample data to daily frequency and calculate the sum of ridership each day
daily_ridership = df.resample('D', on='transit_timestamp')['ridership'].sum() 

# Plotting the daily ridership
daily_ridership.plot(kind='line', figsize=(10, 6))
plt.title('Daily Ridership')
plt.xlabel('Date')
plt.ylabel('Ridership')
plt.show() 


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


