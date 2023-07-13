from pandas.tseries.holiday import USFederalHolidayCalendar as calendar
import os 
import joblib
import pandas as pd

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "../modeling/DecisionTreeRegressor.sav")
model = joblib.load(model_path)

def is_us_holiday(date_str):
    """Check if a given date (str) is a US federal holiday."""
    cal = calendar()
    holidays = cal.holidays(start='2020-01-01', end='2023-12-31')
    return pd.to_datetime(date_str) in holidays
