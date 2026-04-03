from flask import Flask, request, jsonify
from flask_cors import CORS
from model import *

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'ML API Running'})

@app.route('/disciplines', methods=['GET'])
def disciplines():
    return jsonify(get_disciplines())

@app.route('/years', methods=['GET'])
def years():
    return jsonify(get_years())

@app.route('/programs', methods=['GET'])
def programs():
    return jsonify(get_programs())

@app.route('/eda', methods=['GET'])
def eda():
    return jsonify(get_all_eda())

@app.route('/summary', methods=['GET'])
def summary():
    return jsonify(get_eda_summary())

@app.route('/yearly-trends', methods=['GET'])
def yearly_trends():
    return jsonify(get_yearly_trends())

@app.route('/discipline-comparison', methods=['GET'])
def discipline_comparison():
    return jsonify(get_discipline_comparison())

@app.route('/program-distribution', methods=['GET'])
def program_distribution():
    return jsonify(get_program_distribution())

@app.route('/placement-matrix', methods=['GET'])
def placement_matrix():
    return jsonify(get_placement_matrix())

@app.route('/ctc-trends', methods=['GET'])
def ctc_trends():
    return jsonify(get_ctc_trends())

@app.route('/student-trends', methods=['GET'])
def student_trends():
    return jsonify(get_student_trends())

@app.route('/predict-ctc', methods=['GET'])
def predict_ctc_route():
    try:
        year = int(request.args.get('year'))
        discipline = request.args.get('discipline')
        placement = float(request.args.get('placement', 0))
        return jsonify({
            'year': year,
            'discipline': discipline,
            'placement': placement,
            'predictedCTC': predict_ctc(year, discipline, placement)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict-placement-rate', methods=['GET'])
def predict_placement_rate_route():
    try:
        year = int(request.args.get('year'))
        program = request.args.get('program')
        discipline = request.args.get('discipline')
        return jsonify({
            'year': year,
            'program': program,
            'discipline': discipline,
            'predictedPlacementRate': predict_placement_rate(year, program, discipline)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict-placement-chance', methods=['GET'])
def predict_placement_chance_route():
    try:
        cgpa = float(request.args.get('cgpa'))
        program = request.args.get('program')
        discipline = request.args.get('discipline')
        year = int(request.args.get('year'))
        return jsonify({
            'cgpa': cgpa,
            'program': program,
            'discipline': discipline,
            'year': year,
            'placementChance': predict_placement_chance(cgpa, program, discipline, year)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    print("Starting ML API on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)