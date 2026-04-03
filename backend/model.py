# model.py

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("IIT_Bhilai_Placement_Data_2019_2025.csv")

# Ensure numeric conversion
numeric_cols = [
    'Registered_Students',
    'Placed_Students',
    'Placement_Percentage',
    'Avg_CTC_LPA',
    'Median_CTC_LPA',
    'Unplaced_Students'
]

df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
df.fillna(0, inplace=True)

# Encode Discipline
le = LabelEncoder()
df['Discipline_Encoded'] = le.fit_transform(df['Discipline'])

# Features & Target
X = df[['Year', 'Placement_Percentage', 'Discipline_Encoded']]
y = df['Avg_CTC_LPA']

# Train model
model = LinearRegression()
model.fit(X, y)


# Prediction function
def predict_ctc(year, discipline, placement_percent):
    discipline_encoded = le.transform([discipline])[0]
    input_data = np.array([[year, placement_percent, discipline_encoded]])
    prediction = model.predict(input_data)[0]
    return round(float(prediction), 2)


# Get available disciplines (for dropdown in frontend)
def get_disciplines():
    return sorted(df['Discipline'].unique())