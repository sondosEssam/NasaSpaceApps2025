from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from pollution_predictor import CairoPollutionPredictor
from earch_engine_predictor import EarthEnginePredictor

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow Angular frontend to call Flask
# Initialize predictor
predictor = EarthEnginePredictor()  # ← Use correct class name

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "models_loaded": predictor.reg_model is not None})

@app.route('/api/predict', methods=['GET'])
def predict_pollution():
    try:
        start_time_str = request.args.get('start_time')
        hours = request.args.get('hours', default=24, type=int)

        if not start_time_str:
            return jsonify({"error": "start_time is required"}), 400

        try:
            start_time = datetime.fromisoformat(start_time_str)
        except ValueError:
            return jsonify({
                "error": "Invalid datetime format. Expected ISO 8601 (e.g., 2025-10-05T12:00:00)"
            }), 400

        # Convert to string for predictor
        result = predictor.predict(start_time.strftime("%Y-%m-%d %H:%M:%S"), hours)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/api/getPollutionData", methods=["GET"])
def get_pollution_data():
    start_time = request.args.get("start_time")
    hours = int(request.args.get("hours", 24))
    
    if not start_time:
        return jsonify({"error": "start_time parameter is required"}), 400
    
    try:
        result = predictor.predict(start_time, hours)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/api/getWeatherData", methods=["GET"])
def get_weather_data():
    date = request.args.get("date")
    latitude = float(request.args.get("latitude", 30.0444))  # Default to Cairo
    longitude = float(request.args.get("longitude", 31.2357))  # Default to Cairo
    
    if not date:
        return jsonify({"error": "date parameter is required"}), 400
    
    try:
        weather_data = predictor.get_earth_engine_data(date, latitude, longitude)
        return jsonify(weather_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)