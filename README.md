# 🌍 NasaSpaceApps2025

<p align="center">
  <img src="https://img.shields.io/badge/Project-Air%20Pollution%20Prediction-blue" alt="Project Badge" />
  <img src="https://img.shields.io/badge/Status-Active-green" alt="Status Badge" />
  <img src="https://img.shields.io/badge/Frontend-Angular-red" alt="Frontend Badge" />
  <img src="https://img.shields.io/badge/Backend-Flask-orange" alt="Backend Badge" />
</p>

A full-stack web application for **air pollution prediction** using **Google Earth Engine data**, **machine learning models**, and **interactive visualizations**.

Built with **Angular (frontend)** and **Flask / Python (backend)**.

---

## 🚀 Overview

This project predicts **air quality (AQI)** and pollution risk levels over time using a machine learning model trained on Earth Engine satellite data.
Users can view **weather and pollution forecasts**, explore interactive **charts and maps**, and understand pollution trends in their area.

### ✨ Key Features

* 🧠 Predicts air pollution and AQI levels for user-selected time ranges
* 🌦️ Displays live weather data and forecasts
* 🛰️ Integrates with Google Earth Engine for satellite & environmental data
* 📊 Interactive frontend dashboard (charts, maps, visual summaries)
* ⚙️ Flask-based REST API backend serving predictions & weather data
* 🧾 Local `db.json` mock database for frontend display and testing

---

## 📁 Project Structure

```
NasaSpaceApps2025/
│
├── backend/
│   ├── app.py
│   ├── earth_engine_predictor.py
│   ├── pollution_regression_model.pkl
│   ├── pollution_classification_model.pkl
│   ├── model_metadata.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── pages/
│   │   └── assets/
│   ├── angular.json
│   ├── package.json
│   └── db.json
│
└── README.md  ← you are here
```

### Folder Explanation

* **backend/** → Flask API + ML prediction logic
* **frontend/** → Angular dashboard for visualization
* **db.json** → Local JSON file acting as a **mock database** for testing and offline display

---

## 🧩 db.json Usage

The **`db.json`** file (inside the `frontend` folder) is used as a lightweight mock database during development.
It temporarily holds sample **pollution** and **weather** data to power the frontend before the backend or live Earth Engine connection is ready.

### Example structure:

```json
{
  "pollution": [
    { "id": 1, "aqi": 42, "status": "Good", "timestamp": "2025-10-05T12:00:00" },
    { "id": 2, "aqi": 95, "status": "Moderate", "timestamp": "2025-10-05T13:00:00" }
  ],
  "weather": [
    { "id": 1, "temp": 27, "humidity": 68, "wind": 10 },
    { "id": 2, "temp": 29, "humidity": 64, "wind": 12 }
  ]
}
```

### To use it locally:

```bash
# inside frontend/
npx json-server --watch db.json --port 6000
```

Then in Angular, you can fetch:

* Pollution data → `http://localhost:6000/pollution`
* Weather data → `http://localhost:6000/weather`

This setup allows frontend testing **without needing to run the backend**.

---

## 🛠️ Tech Stack

| Layer             | Technology                                |
| ----------------- | ----------------------------------------- |
| **Frontend**      | Angular, TypeScript, Chart.js             |
| **Backend**       | Flask, Python                             |
| **Data & ML**     | Google Earth Engine, scikit-learn, joblib |
| **Visualization** | Charts, Maps                              |
| **Dev Tools**     | json-server, virtualenv                   |

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Authenticate Google Earth Engine
earthengine authenticate

# Run Flask server
python app.py
```

By default, the backend runs at:

```
http://localhost:5000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Access the app at:

```
http://localhost:4200
```

If you're using the local `db.json`, run the mock server before starting Angular:

```bash
npx json-server --watch db.json --port 6000
```

---

## 🌐 API Endpoints

| Endpoint                | Method | Parameters            | Description                       |
| ----------------------- | ------ | --------------------- | --------------------------------- |
| `/api/health`           | GET    | —                     | Returns API health & model status |
| `/api/predict`          | GET    | `start_time`, `hours` | Returns pollution predictions     |
| `/api/getPollutionData` | GET    | `start_time`, `hours` | Retrieves pollution data          |
| `/api/getWeatherData`   | GET    | `date`, `lat`, `lon`  | Fetches weather data              |

**Example:**

```
GET http://localhost:5000/api/predict?start_time=2025-10-05T12:00:00&hours=24
```

---

## 🧠 How It Works

1. **User** selects a time range from the Angular frontend
2. **Frontend** sends the query to Flask backend
3. **Flask** calls Earth Engine APIs to gather atmospheric & weather data
4. **ML Models** (regression + classification) generate AQI predictions
5. **Response** is returned as JSON and visualized via Angular charts

Example response:

```json
{
  "metadata": { "location": "Cairo", "units": "µg/m³" },
  "predictions": [
    { "time": "2025-10-05T12:00:00", "AQI_pred": 75, "polluted": false },
    { "time": "2025-10-05T13:00:00", "AQI_pred": 98, "polluted": true }
  ]
}
```

---

## 💡 Development Tips

* Use **ISO timestamp format** (`YYYY-MM-DDTHH:MM:SS`) to avoid conversion issues
* If you get `"unconverted data remains: :00"`, check datetime parsing in Flask
* Configure **CORS** in the backend to allow Angular requests
* Use `db.json` for testing UI before the backend or Earth Engine are ready

---

## 🙏 Acknowledgments

* 🌎 [Google Earth Engine](https://earthengine.google.com/)
* 🧠 [scikit-learn](https://scikit-learn.org/)
* 🖥️ [Angular Framework](https://angular.dev/)
* 🐍 [Flask](https://flask.palletsprojects.com/)

---

## ⭐️ Support

Give this repo a **⭐️ star** if you found it useful or inspiring!
Contributions and feedback are always welcome 🙌

---
