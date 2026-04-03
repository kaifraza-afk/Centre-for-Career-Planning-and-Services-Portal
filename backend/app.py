# app.py

from flask import Flask, request, jsonify
from model import predict_ctc, get_disciplines

app = Flask(__name__)

# Health check
@app.route("/")
def home():
    return "CCPS Placement Analytics API Running 🚀"


# Get disciplines list
@app.route("/api/disciplines", methods=["GET"])
def disciplines():
    return jsonify(get_disciplines())


# Prediction API
@app.route("/api/predict", methods=["GET"])
def predict():
    try:
        year = int(request.args.get("year"))
        discipline = request.args.get("discipline")
        placement = float(request.args.get("placement"))

        predicted_ctc = predict_ctc(year, discipline, placement)

        return jsonify({
            "Year": year,
            "Discipline": discipline,
            "Predicted_Avg_CTC_LPA": predicted_ctc
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)