import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.tree import DecisionTreeRegressor
import os
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

# Load your data
data = pd.read_csv(r'C:\Users\MSI-Pc\Desktop\Summer project\merged_taxi_subwayV4.csv')

# Remove unnecessary columns
data = data.drop(columns=['Unnamed: 10', 'Unnamed: 11', 'Unnamed: 12', 'passenger_count', 'ridership'])

# Convert the timestamp column back to datetime format
data['timestamp'] = pd.to_datetime(data['timestamp'], format="%d/%m/%Y %H:%M")

# Replace NaN values with 0
data.fillna(0, inplace=True)

# Convert the columns to category type
data['zone'] = data['zone'].astype('category')
data['hour'] = data['hour'].astype('category')
data['day_of_week'] = data['day_of_week'].astype('category')
data['is_weekend'] = data['is_weekend'].astype('category')
data['month'] = data['month'].astype('category')
data['is_holiday'] = data['is_holiday'].astype('category')

# Prepare the data for the ML model
features = ['zone', 'hour', 'day_of_week', 'is_weekend', 'is_holiday', 'month']
target = 'busyness'

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(data[features], data[target], test_size=0.2, random_state=42)

# Create and train different models
models = {
    "DecisionTreeRegressor": DecisionTreeRegressor(random_state=42)
}

cv_scores_list = []

for model_name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    cv_scores = cross_val_score(model, X_train, y_train, cv=5)
    
    cv_scores_list.append({'model': model_name, 'cv_scores': cv_scores})
    
    print(f'Metrics for {model_name}:')
    print('Mean Absolute Error:', mae)
    print('Mean Squared Error:', mse)
    print('R^2 Score:', r2)
    print('Cross Validation Scores:', cv_scores)
    print('Average Cross Validation Score:', cv_scores.mean())
    print('---')

    # Save the model
    filename = os.path.join(r'C:\Users\MSI-Pc\Desktop\Summer project\old models', f'{model_name}v3.sav')
    joblib.dump(model, filename)

# Visualize data
sns.set()

# Correlation matrix
data_without_timestamp = data.drop(columns=['timestamp'])
correlation_matrix = data_without_timestamp.corr()
plt.figure(figsize=(15, 10))
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm")
plt.title("Correlation Matrix of Features")
plt.show()

# Distribution of busyness
plt.figure(figsize=(10, 6))
sns.histplot(data['busyness'], kde=True)
plt.title("Distribution of Busyness")
plt.show()

# Distribution of busyness by hour
plt.figure(figsize=(10, 6))
sns.lineplot(x='hour', y='busyness', data=data)
plt.title("Busyness by Hour")
plt.show()

# Distribution of busyness by month
plt.figure(figsize=(10, 6))
sns.lineplot(x='month', y='busyness', data=data)
plt.title("Busyness by Month")
plt.show()

