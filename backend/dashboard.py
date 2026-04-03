# dashboard.py

import pandas as pd
import dash
from dash import dcc, html, Input, Output
import plotly.express as px

# Load dataset
df = pd.read_csv("placement_data.csv")

# Create Dash app
app = dash.Dash(__name__)
server = app.server  # For integration with Flask if needed

# Layout
app.layout = html.Div([
    html.H1("CCPS Placement Analytics Dashboard"),

    html.Label("Select Discipline"),
    dcc.Dropdown(
        id="discipline-dropdown",
        options=[{"label": d, "value": d} for d in df["Discipline"].unique()],
        value=df["Discipline"].unique()[0]
    ),

    dcc.Graph(id="placement-trend"),
    dcc.Graph(id="salary-trend"),
    dcc.Graph(id="branch-comparison")
])


# Callback
@app.callback(
    Output("placement-trend", "figure"),
    Output("salary-trend", "figure"),
    Output("branch-comparison", "figure"),
    Input("discipline-dropdown", "value")
)
def update_dashboard(selected_discipline):

    filtered_df = df[df["Discipline"] == selected_discipline]

    # Placement Trend
    fig1 = px.line(
        filtered_df,
        x="Year",
        y="Placement_Percentage",
        markers=True,
        title="Year-wise Placement Trend"
    )

    # Salary Trend
    fig2 = px.line(
        filtered_df,
        x="Year",
        y="Avg_CTC_LPA",
        markers=True,
        title="Average CTC Trend"
    )

    # Comparison Chart
    fig3 = px.bar(
        df.groupby("Discipline")["Avg_CTC_LPA"].mean().reset_index(),
        x="Discipline",
        y="Avg_CTC_LPA",
        title="Average CTC Comparison Across Disciplines"
    )

    return fig1, fig2, fig3


if __name__ == "__main__":
    app.run_server(debug=True, port=8050)