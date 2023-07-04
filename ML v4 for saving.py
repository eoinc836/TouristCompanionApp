import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
# from sklearn.linear_model import LinearRegression
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
# from sklearn.neural_network import MLPRegressor
# from sklearn.preprocessing import StandardScaler
import seaborn as sns
import matplotlib.pyplot as plt
import os
import joblib

# Load your data
data = pd.read_csv(r'C:\Users\MSI-Pc\Desktop\Summer project\merged_taxi_subwayV4.csv')

# Convert the timestamp column back to datetime format
data['timestamp'] = pd.to_datetime(data['timestamp'])

# Prepare the data for the ML model
features = ['zone', 'hour', 'day_of_week', 'is_weekend', 'is_holiday', 'month']  # Removed 'ridership', 'passenger_count'
target = 'busyness'

# Normalize the features for the Neural Network model
# scaler = StandardScaler()
# data[features] = scaler.fit_transform(data[features])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(data[features], data[target], test_size=0.2, random_state=42)

# Create and train different models
models = {
    "RandomForestRegressor": RandomForestRegressor(n_estimators=200, random_state=42),
    # "LinearRegression": LinearRegression(),
    # "GradientBoostingRegressor": GradientBoostingRegressor(random_state=42),
    "DecisionTreeRegressor": DecisionTreeRegressor(random_state=42),
    # "MLPRegressor": MLPRegressor(random_state=42, max_iter=500)  # Simple Neural Network
}

for model_name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    cv_scores = cross_val_score(model, X_train, y_train, cv=5)
    print(f'Metrics for {model_name}:')
    print('Mean Absolute Error:', mae)
    print('Mean Squared Error:', mse)
    print('R^2 Score:', r2)
    print('Cross Validation Scores:', cv_scores)
    print('Average Cross Validation Score:', cv_scores.mean())
    print('---')

    # Save the model
    filename = os.path.join(r'C:\Users\MSI-Pc\Desktop\Summer project', f'{model_name}.sav')
    joblib.dump(model, filename)

# Calculate statistics about the 'busyness' feature
busyness_stats = data['busyness'].describe()

# Exclude 'ridership' and 'passenger_count' from the correlation matrix
correlation_matrix = data.drop(['ridership', 'passenger_count'], axis=1).corr()

# Correlation Heatmap
plt.figure(figsize=(12, 8))
correlation_matrix = data.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
plt.show()

# Print correlation values
print("Correlation values:")
print(correlation_matrix)

# Print statistics about the 'busyness' feature
print("Statistics about 'busyness':")
print(busyness_stats)