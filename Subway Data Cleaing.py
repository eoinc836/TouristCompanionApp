import pandas as pd
import numpy as np
import holidays

# Load the dataset
df = pd.read_csv(r'/Users/eoin/Downloads/MTA_Subway_Hourly_Ridership__Beginning_February_2022.csv')

# Filter for Manhattan borough
df = df[df['borough'] == 'M']

# Keep only relevant columns
df = df[['transit_timestamp', 'station_complex_id', 'station_complex', 'ridership','latitude','longitude','borough']]

# Remove duplicates
print(f'Original dataframe size: {df.shape[0]}')
df.drop_duplicates(inplace=True)
print(f'Dataframe size after removing duplicates: {df.shape[0]}')

# Remove missing values
df.dropna(inplace=True)
print(f'Dataframe size after removing missing values: {df.shape[0]}')

# Convert datetime columns to datetime format and handle AM/PM entries
df['transit_timestamp'] = pd.to_datetime(df['transit_timestamp'])

# Add derived columns
df['transit_hour'] = df['transit_timestamp'].dt.round('H').dt.hour
df['is_weekday'] = np.where(df['transit_timestamp'].dt.weekday < 5, 1, 0)
df['is_weekend'] = np.where(df['transit_timestamp'].dt.weekday >= 5, 1, 0)

us_holidays = holidays.US(state='NY')
df['is_holiday'] = df['transit_timestamp'].dt.date.apply(lambda x: 1 if x in us_holidays else 0)

# Define seasons based on month
seasons = {12: 'Winter', 1: 'Winter', 2: 'Winter', 3: 'Spring', 4: 'Spring', 5: 'Spring', 6: 'Summer', 7: 'Summer', 8: 'Summer', 9: 'Autumn', 10: 'Autumn', 11: 'Autumn'}
df['season'] = df['transit_timestamp'].dt.month.map(seasons)

df['day_of_week'] = df['transit_timestamp'].dt.day_name()

# Aggregate Ridership
df['ridership_total'] = df.groupby(['transit_timestamp', 'station_complex_id'])['ridership'].transform('sum')

#Drop the singular ridership column
df = df.drop('ridership',axis=1)

#Sort by time stamp
df.sort_values('transit_timestamp', inplace=True)

#Sense Check
#Confirm all trips are recorded with a time that makes sense (i.e 0 <= Transit Hour <= 23)
invalidTimes = len(df[(df['transit_hour'] < 0) | (df['transit_hour'] > 23)])
print(f"Number of invalid times:{invalidTimes}")

# Save the processed dataset
df.to_csv(r'/Users/eoin/Desktop/Cleaned-Subway-Data/Selected-Data.csv',index=False)

