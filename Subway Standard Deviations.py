import pandas as pd
import numpy as np

#Read CSV file
df = pd.read_csv(r'/Users/eoin/Desktop/Cleaned-Subway-Data/Selected-Data.csv')

#Combine all the ridership for trips at thr same hour in the same station
df.groupby(['transit_hour','station_complex_id'])['ridership_total']
grouped_df = df.groupby(['station_complex_id', 'transit_hour']).agg({'ridership_total': 'sum'})
sums_list = grouped_df['ridership_total'].tolist()

#Each station should have 24 trips when we round to the hour
occurrences = df.groupby(['station_complex_id', 'transit_hour']).size().reset_index(name='count')
count = occurrences['count'].tolist()
stations = occurrences['station_complex_id']

#Remove duplicate stations and sort to the correct order
stations = list(set(stations))
stations.sort()

#Adding the mean of each hour in each station to an array
means = np.array([])
for i in range (len(sums_list)):
    means = np.append(means,sums_list[i]/count[i])

#Split the means array into 120 sub arrays, each one representing a station containg 24 values (one for each hour)
means = np.split(means, 120)

means_dict = {}

#To calculate standard deviation we must first get the distance of each data point to the mean
for i in range(120):
    for j in range(24):
        means_dict[f"{stations[i]}/{j}"] = means[i][j]

#Define a function to use the correct mean based on the row
def mean_diff(row):
     return (row['ridership_total'] - means_dict[(f"{row['station_complex_id']}/{row['transit_hour']}")])**2

#Adding a column to show the square difference from the mean
df['mean-diff-sqr'] = df.apply(lambda row: mean_diff(row), axis=1)

#We now need to return the sums of the 'mean-dff-sqr' feature for each station and hour pairing
def groupingFunction(group):
    total_value = group['ridership_total'].sum()
    pairing = f"{group['station_complex_id'].iloc[0]}/{group['transit_hour'].iloc[0]}"
    return pd.Series({'pairing': pairing, 'total_value': total_value})

# Group by station id and transit hour, calculate the sum of total ridership and include pairing details
grouped_df = df.groupby(['station_complex_id', 'transit_hour']).apply(lambda x: groupingFunction(x)).reset_index()

#Each pairing should have 334x24 enteries (8016) (one for each hour of each day though Janurary is missing from the dataset)
grouped_df['avg_value'] = grouped_df['total_value']/8016
grouped_df['std'] = grouped_df['avg_value'].pow(0.5)

#Create a dict similar to before for our standard deviations
std_dict = {}

for i in range(2880):
    std_dict[f"{grouped_df['pairing'][i]}"] = grouped_df['std'][i]

#Define a function to assign the correct std and means to the correct pairing
def assign_std(row):
    pairing = f"{row['station_complex_id']}/{row['transit_hour']}"
    return std_dict.get(pairing, 0)  # Provide a default value if pairing is not found in std_dict

def assign_mean(row):
    pairing = f"{row['station_complex_id']}/{row['transit_hour']}"
    return means_dict.get(pairing, 0)

def stds_from_mean(row):
    pairing = f"{row['station_complex_id']}/{row['transit_hour']}"
    mean = means_dict.get(pairing,0)
    std = std_dict.get(pairing,0)
    return (abs(mean - row['ridership_total']))/std

df['standard_deviation'] = df.apply(assign_std, axis=1)
df['mean'] = df.apply(assign_mean,axis=1)
df['STD_from_mean'] = df.apply(stds_from_mean,axis=1)

#Save the new dataframe
df.to_csv(r'/Users/eoin/Desktop/Cleaned-Subway-Data/Selected-Data.csv',index=False)

