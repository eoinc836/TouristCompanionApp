from pandas.tseries.holiday import USFederalHolidayCalendar as calendar
import os, joblib, pandas as pd

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "../modeling/DecisionTreeRegressor.sav")
model = joblib.load(model_path)

zones = [262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231, 230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158, 153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114, 113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41, 13, 12, 24, 4]

def is_us_holiday(date_str):
    """Check if a given date (str) is a US federal holiday."""
    cal = calendar()
    holidays = cal.holidays(start='2020-01-01', end='2023-12-31')
    return pd.to_datetime(date_str) in holidays