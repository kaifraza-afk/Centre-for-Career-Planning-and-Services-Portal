import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv("IIT_Bhilai_Placement_Data_2019_2025.csv")

# Ensure numeric columns are numeric
numeric_cols = [
    'Registered_Students',
    'Placed_Students',
    'Placement_Percentage',
    'Avg_CTC_LPA',
    'Median_CTC_LPA'
]
df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
df.fillna(0, inplace=True)

# Extract numeric year
df['Year_Num'] = df['Year'].apply(lambda x: int(str(x).split('-')[0]))

# Label encoding
le_discipline = LabelEncoder()
df['Discipline_Encoded'] = le_discipline.fit_transform(df['Discipline'])

le_program = LabelEncoder()
df['Program_Encoded'] = le_program.fit_transform(df['Program'])

# Train CTC model
X_ctc = df[['Year_Num', 'Placement_Percentage', 'Discipline_Encoded']]
y_ctc = df['Avg_CTC_LPA']
model_ctc = LinearRegression()
model_ctc.fit(X_ctc, y_ctc)

# Train placement rate model
X_placement = df[['Year_Num', 'Program_Encoded', 'Discipline_Encoded']]
y_placement = df['Placement_Percentage']
model_placement_rate = LinearRegression()
model_placement_rate.fit(X_placement, y_placement)

# Discipline statistics for placement chance
discipline_stats = df.groupby('Discipline').agg({
    'Placement_Percentage': 'mean',
    'Avg_CTC_LPA': 'mean',
    'Median_CTC_LPA': 'mean',
    'Registered_Students': 'sum',
    'Placed_Students': 'sum'
}).reset_index()
disciplinePlacement = dict(zip(discipline_stats['Discipline'], discipline_stats['Placement_Percentage']))

# Program statistics
program_stats = df.groupby('Program').agg({
    'Placement_Percentage': 'mean',
    'Avg_CTC_LPA': 'mean',
    'Registered_Students': 'sum',
    'Placed_Students': 'sum'
}).reset_index()

# --- ML Prediction Functions ---

def predict_ctc(year, discipline, placement_percent):
    try:
        discipline_encoded = le_discipline.transform([discipline])[0]
    except:
        discipline_encoded = 0
    input_data = np.array([[year, placement_percent, discipline_encoded]])
    prediction = model_ctc.predict(input_data)[0]
    return round(float(prediction), 2)

def predict_placement_rate(year, program, discipline):
    try:
        program_encoded = le_program.transform([program])[0]
    except:
        program_encoded = 0
    try:
        discipline_encoded = le_discipline.transform([discipline])[0]
    except:
        discipline_encoded = 0
    input_data = np.array([[year, program_encoded, discipline_encoded]])
    prediction = model_placement_rate.predict(input_data)[0]
    return round(float(prediction), 2)

def predict_placement_chance(cgpa, program, discipline, year):
    base_rate = disciplinePlacement.get(discipline, 50)
    cgpa_factor = min(30, (cgpa - 5) * 5)
    year_factor = (year - 2019) * 2
    program_factor = {'BTech':10, 'MTech':5, 'MSc':-5}.get(program, 0)
    chance = base_rate*0.4 + cgpa_factor*0.4 + year_factor*0.1 + program_factor*0.1
    return round(max(5, min(98, chance)), 2)

# --- Data for API ---

def get_disciplines():
    return sorted([str(d) for d in df['Discipline'].unique() if d != 'Total'])

def get_years():
    return sorted([int(y) for y in df['Year_Num'].unique()])

def get_programs():
    return sorted([str(p) for p in df['Program'].unique() if p not in ['Overall', 'Total']])

def get_eda_summary():
    total_students = int(df['Registered_Students'].sum())
    placed_students = int(df['Placed_Students'].sum())
    avg_placement = round(float(df['Placement_Percentage'].mean()), 2)
    avg_ctc = round(float(df['Avg_CTC_LPA'].mean()), 2)
    median_ctc = round(float(df['Median_CTC_LPA'].mean()), 2)
    max_ctc = round(float(df['Avg_CTC_LPA'].max()), 2)
    min_ctc = round(float(df[df['Avg_CTC_LPA']>0]['Avg_CTC_LPA'].min()), 2)
    num_companies = 50
    return {
        'totalStudents': total_students,
        'placedStudents': placed_students,
        'unplacedStudents': total_students-placed_students,
        'avgPlacement': avg_placement,
        'avgCTC': avg_ctc,
        'medianCTC': median_ctc,
        'maxCTC': max_ctc,
        'minCTC': min_ctc,
        'numCompanies': num_companies
    }

def get_yearly_trends():
    yearly = df[df['Program']=='Overall'].copy().sort_values('Year_Num')
    trends = []
    for _, row in yearly.iterrows():
        trends.append({
            'year': int(row['Year_Num']),
            'placement': round(float(row['Placement_Percentage']),2),
            'avgCTC': round(float(row['Avg_CTC_LPA']),2),
            'medianCTC': round(float(row['Median_CTC_LPA']),2),
            'registered': int(row['Registered_Students']),
            'placed': int(row['Placed_Students']),
            'unplaced': int(row['Registered_Students']) - int(row['Placed_Students'])
        })
    return trends

def get_discipline_comparison():
    comp = df[df['Program'] != 'Overall'].copy()
    disc_group = comp.groupby('Discipline').agg({
        'Placement_Percentage': 'mean',
        'Avg_CTC_LPA': 'mean',
        'Median_CTC_LPA': 'mean',
        'Registered_Students': 'sum',
        'Placed_Students': 'sum'
    }).reset_index()
    result = []
    for _, row in disc_group.iterrows():
        if row['Discipline'] != 'Total':
            result.append({
                'discipline': str(row['Discipline']),
                'placement': round(float(row['Placement_Percentage']),2),
                'avgCTC': round(float(row['Avg_CTC_LPA']),2),
                'medianCTC': round(float(row['Median_CTC_LPA']),2),
                'registered': int(row['Registered_Students']),
                'placed': int(row['Placed_Students'])
            })
    return result

def get_program_distribution():
    prog = df[df['Program'] != 'Overall'].copy()
    prog_group = prog.groupby('Program').agg({
        'Registered_Students':'sum',
        'Placed_Students':'sum',
        'Avg_CTC_LPA':'mean',
        'Placement_Percentage':'mean'
    }).reset_index()
    result = []
    for _, row in prog_group.iterrows():
        result.append({
            'program': str(row['Program']),
            'registered': int(row['Registered_Students']),
            'placed': int(row['Placed_Students']),
            'avgCTC': round(float(row['Avg_CTC_LPA']),2),
            'placement': round(float(row['Placement_Percentage']),2)
        })
    return result

def get_placement_matrix():
    matrix = df[df['Program'] != 'Overall'].copy()
    pivot = matrix.pivot_table(
        values='Placement_Percentage',
        index='Discipline',
        columns='Year_Num',
        aggfunc='mean'
    ).reset_index()
    result = []
    for _, row in pivot.iterrows():
        discipline = row['Discipline']
        if discipline != 'Total':
            entry = {'discipline': str(discipline)}
            for year in sorted(df['Year_Num'].unique()):
                entry[str(year)] = round(float(row.get(year,0)),2) if pd.notna(row.get(year)) else 0
            result.append(entry)
    return result

def get_ctc_trends():
    yearly = df[df['Program']=='Overall'].copy().sort_values('Year_Num')
    trends = []
    for _, row in yearly.iterrows():
        trends.append({
            'year': int(row['Year_Num']),
            'avgCTC': round(float(row['Avg_CTC_LPA']),2),
            'medianCTC': round(float(row['Median_CTC_LPA']),2)
        })
    return trends

def get_student_trends():
    yearly = df[df['Program']=='Overall'].copy().sort_values('Year_Num')
    trends = []
    for _, row in yearly.iterrows():
        trends.append({
            'year': int(row['Year_Num']),
            'registered': int(row['Registered_Students']),
            'placed': int(row['Placed_Students']),
            'unplaced': int(row['Registered_Students']) - int(row['Placed_Students'])
        })
    return trends

def get_all_eda():
    return {
        'summary': get_eda_summary(),
        'yearlyTrends': get_yearly_trends(),
        'disciplineComparison': get_discipline_comparison(),
        'programDistribution': get_program_distribution(),
        'placementMatrix': get_placement_matrix(),
        'ctcTrends': get_ctc_trends(),
        'studentTrends': get_student_trends(),
        'disciplines': get_disciplines(),
        'years': get_years(),
        'programs': get_programs()
    }