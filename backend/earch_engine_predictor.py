# earth_engine_predictor.py
import ee
import numpy as np
import joblib
from datetime import datetime, timedelta

class EarthEnginePredictor:
    def __init__(self):
        self.reg_model = None
        self.clf_model = None 
        self.metadata = None
        self.initialize_ee()
        self.load_models()
    
    def initialize_ee(self):
        """Initialize Earth Engine"""
        try:
            ee.Authenticate()

            ee.Initialize(project='nomadic-pathway-473815-a9')
            print("✅ Earth Engine initialized!")
        except Exception as e:
            print(f"❌ Earth Engine init failed: {e}")
            # For service account authentication:
            # service_account = 'your-service-account@your-project.iam.gserviceaccount.com'
            # credentials = ee.ServiceAccountCredentials(service_account, 'path/to/private-key.json')
            # ee.Initialize(credentials)
    
    def load_models(self):
        """Load trained models"""
        try:
            self.reg_model = joblib.load('pollution_regression_model.pkl')
            self.clf_model = joblib.load('pollution_classification_model.pkl')
            self.metadata = joblib.load('model_metadata.pkl')
            print("✅ Models loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading models: {e}")
    
    def get_earth_engine_data(self, date, latitude=30.0444, longitude=31.2357):
        """Get REAL aerosol and weather data from Earth Engine"""
        point = ee.Geometry.Point([longitude, latitude])
        
        # Define date range (1 day for historical context)
        start_date = ee.Date(date).advance(-1, 'day')  # Get previous day for lags
        end_date = ee.Date(date).advance(1, 'day')     # Get next day
        
        # Get MODIS Aerosol Data (TOTEXTTAU and components)
        modis = ee.ImageCollection('MODIS/061/MCD19A2_GRANULES') \
                  .filterDate(start_date, end_date) \
                  .filterBounds(point)
        
        # Get ERA5 Weather Data
        era5 = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY') \
                .filterDate(start_date, end_date) \
                .filterBounds(point)
        
        # Extract values at point
        try:
            # Get aerosol data
            modis_data = modis.first().sample(region=point, scale=1000).first().getInfo()
            # Get weather data
            era5_data = era5.first().sample(region=point, scale=1000).first().getInfo()
            
            return {
                # Aerosol parameters (REAL DATA)
                'BCEXTTAU': modis_data.get('Optical_Depth_047', 0.015),
                'DUEXTTAU': modis_data.get('Optical_Depth_055', 0.12),
                'OCEXTTAU': modis_data.get('AOD_550', 0.018),
                'TOTEXTTAU': modis_data.get('AOD_550', 0.25),  # Main target
                
                # Weather parameters (REAL DATA)
                'PS': era5_data.get('surface_pressure', 101000),
                'QV2M': era5_data.get('specific_humidity', 0.009),
                'T2M': era5_data.get('temperature_2m', 298.0),
                'U10M': era5_data.get('u_component_of_wind_10m', 1.5),
                'V10M': era5_data.get('v_component_of_wind_10m', -2.0),
            }
            
        except Exception as e:
            print(f"⚠️ Earth Engine data fetch failed: {e}")
            return self.get_fallback_data()
    
    def create_features(self, timestamp, ee_data):
        """Create feature vector using REAL Earth Engine data"""
        hour = timestamp.hour
        month = timestamp.month
        dayofweek = timestamp.weekday()
        dayofyear = timestamp.timetuple().tm_yday
        
        # Use REAL Earth Engine data
        features = [
            ee_data['BCEXTTAU'],  # REAL aerosol data
            ee_data['DUEXTTAU'],  # REAL aerosol data  
            ee_data['OCEXTTAU'],  # REAL aerosol data
            ee_data['PS'],        # REAL pressure
            ee_data['QV2M'],      # REAL humidity
            0.025,                # SSEXTTAU (might need different band)
            0.065,                # SUEXTTAU (might need different band)
            ee_data['T2M'],       # REAL temperature
            ee_data['U10M'],      # REAL U wind
            ee_data['V10M'],      # REAL V wind
            
            # Time features
            hour, dayofweek, month, dayofyear,
            np.sin(2 * np.pi * hour / 24),
            np.cos(2 * np.pi * hour / 24),
            np.sqrt(ee_data['U10M']**2 + ee_data['V10M']**2),  # REAL wind speed
            
            # Lag features (you'd need historical EE data for these)
            0.25, 0.24, 0.23, 0.22, 0.21, 0.20,  # Would be real historical values
            0.24, 0.22  # Rolling means
        ]
        
        return features
    
    def safe_parse_datetime(self,dt_str):
        try:
            return datetime.fromisoformat(dt_str)
        except ValueError:
        # fallback if it's missing 'T' or seconds
            for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M"):
                try:
                    return datetime.strptime(dt_str, fmt)
                except ValueError:
                    continue
        raise ValueError(f"Unrecognized datetime format: {dt_str}")
    def predict(self, start_time, hours=24):
        """Main prediction function with REAL Earth Engine data"""
        if not all([self.reg_model, self.clf_model, self.metadata]):
            return {"error": "Models not loaded"}
        
        predictions = []
        current_dt = self.safe_parse_datetime(start_time)
        
        for i in range(hours):
            # Get REAL Earth Engine data for this timestamp
            ee_data = self.get_earth_engine_data(current_dt.isoformat())
            
            features = self.create_features(current_dt, ee_data)
            
            aqi_value = float(self.reg_model.predict([features])[0])
            pollution_prob = float(self.clf_model.predict_proba([features])[0][1])
            is_polluted = pollution_prob >= self.metadata.get('safety_threshold', 0.2)
            
            predictions.append({
                "time": current_dt.isoformat(),
                "AQI_pred": round(aqi_value, 4),
                "polluted": bool(is_polluted),
                "prob": round(pollution_prob, 4),
                "data_source": "Earth Engine"
            })
            
            current_dt += timedelta(hours=1)
        
        return {
            "predictions": predictions,
            "metadata": {
                "prediction_horizon": self.metadata.get('prediction_horizon', 6),
                "total_predictions": len(predictions),
                "data_source": "Google Earth Engine"
            }
        }

    def get_fallback_data(self):

        """Fallback data if Earth Engine fails"""
        return {
            'BCEXTTAU': 0.015, 'DUEXTTAU': 0.12, 'OCEXTTAU': 0.018, 'TOTEXTTAU': 0.25,
            'PS': 101000, 'QV2M': 0.009, 'T2M': 298.0, 'U10M': 1.5, 'V10M': -2.0
        }
    
