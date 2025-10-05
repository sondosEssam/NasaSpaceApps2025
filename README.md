# NasaSpaceApps2025

A full-stack application for **air pollution prediction** using Earth Engine data, ML models, and interactive charts/maps.  
Built with **Angular** (frontend) + **Flask / Python** (backend).

---

## 🌍 Project Overview

This project aims to provide forecasts of air quality (AQI) using Earth Engine data and machine learning models.  
Users can visualize predictions over time, see weather data, and explore maps/charts of pollution levels.

Key features:
- Real-time (or near real-time) pollution forecasting for a given time horizon  
- Use of Google Earth Engine for satellite + weather data retrieval  
- Machine learning models (regression + classification) to estimate AQI and pollution risk  
- A frontend dashboard with charts, maps, and data visualizations  
- REST API backend serving predictions and weather endpoints  

---

## 📁 Repository Structure

/
├── backend/
│ ├── app.py
│ ├── earth_engine_predictor.py
│ ├── pollution_regression_model.pkl
│ ├── pollution_classification_model.pkl
│ └── model_metadata.pkl
├── frontend/
│ ├── src/
│ ├── package.json
│ └── angular components, services, etc.
├── db.json
└── README.md (you’re here)



- **backend/**: Flask server + Earth Engine integration + ML models  
- **frontend/**: Angular UI for displaying forecasts, charts, maps  
- **db.json**:  example or local data store  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular, TypeScript, Chart.js / other charting libs |
| Backend | Flask, Python |
| Data & ML | Google Earth Engine, joblib, scikit-learn / custom models |
| Deployment / Env | (Add info here: Docker, Heroku, local, etc.) |

---

## 🚀 Setup & Installation

### Prerequisites

- Python 3.x  
- Node.js & npm / Angular CLI  
- Google Earth Engine account / credentials  
- (Optional) Virtual environment for Python  

### Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
# or: source venv/bin/activate  # Linux / macOS
pip install -r requirements.txt
# Then authenticate Earth Engine:
earthengine authenticate
# Run Flask server:
python app.py
By default, it runs on http://localhost:5000.

Frontend setup
bash
Copy code
cd frontend
npm install
ng serve
This typically starts the Angular dev server at http://localhost:4200.

You may need to adjust your frontend to point to the backend API URL (e.g. in environment files).

📡 API Endpoints
Here are some of the key backend endpoints you’ve built (or should have):

Endpoint	Method	Parameters	Returns
/api/health	GET	—	Server & model status info
/api/predict	GET	start_time (ISO string), hours	Predictions & metadata JSON
/api/getPollutionData	GET	start_time, hours	Similar to /api/predict
/api/getWeatherData	GET	date, latitude, longitude	Weather / Earth Engine data JSON

Example:
GET http://localhost:5000/api/predict?start_time=2025-10-05T12:00:00&hours=24

🧩 How It Works (Internals)
Flask receives a request with start_time and hours.

The backend uses EarthEnginePredictor to fetch data from Google Earth Engine (aerosol + weather).

It builds feature vectors, passes them into regression and classification models.

Returns a JSON structure:

json
Copy code
{
  "metadata": { … },
  "predictions": [
    { "time": "...", "AQI_pred": ..., "polluted": bool, "prob": ... },
    …
  ]
}
Angular frontend consumes this JSON, plots charts/maps, lets user visualize trends.

🧠 Usage & Tips
When calling from Angular, ensure CORS is configured (so frontend can talk to backend).

Use ISO format for timestamps (YYYY-MM-DDTHH:MM:SS) to avoid parsing errors.

Handle cases when Earth Engine data is missing (fallback data).



✍️ Acknowledgments & Credits
Google Earth Engine for data access

Machine Learning algorithms & models

Angular / Flask frameworks

