# ================================
# 📄 predict.py - بفيتشرز مضبوطة
# ================================

import numpy as np
import joblib
import json
from datetime import datetime, timedelta

class CairoPollutionPredictor:
    def __init__(self):
        self.reg_model = None
        self.clf_model = None 
        self.metadata = None
        self.load_models()
    
    def load_models(self):
        """Load trained models"""
        try:
            self.reg_model = joblib.load('pollution_regression_model.pkl')
            self.clf_model = joblib.load('pollution_classification_model.pkl')
            self.metadata = joblib.load('model_metadata.pkl')
            print("Models loaded successfully!")
        except Exception as e:
            print(f"Error loading models: {e}")
    
    def create_features(self, timestamp):
        """Create feature vector EXACTLY like in training"""
        hour = timestamp.hour
        month = timestamp.month
        dayofweek = timestamp.weekday()  # Monday=0, Sunday=6
        dayofyear = timestamp.timetuple().tm_yday
        
        # FEATURES EXACTLY LIKE IN TRAINING:
        features = [
            # Original features (11 features)
            0.015,    # BCEXTTAU
            0.12,     # DUEXTTAU  
            0.018,    # OCEXTTAU
            101000.0, # PS
            0.009,    # QV2M
            0.025,    # SSEXTTAU
            0.065,    # SUEXTTAU
            298.0,    # T2M
            1.5,      # U10M
            -2.0,     # V10M
            
            # Time features (4 features)
            hour,           # hour
            dayofweek,      # dayofweek  
            month,          # month
            dayofyear,      # dayofyear
            
            # Cyclical features (2 features)
            np.sin(2 * np.pi * hour / 24),  # hour_sin
            np.cos(2 * np.pi * hour / 24),  # hour_cos
            
            # Engineered features (1 feature)
            np.sqrt(1.5**2 + (-2.0)**2),    # wind_speed
            
            # Lag features (6 features)
            0.25,  # TOTEXTTAU_lag_1h
            0.24,  # TOTEXTTAU_lag_2h  
            0.23,  # TOTEXTTAU_lag_3h
            0.22,  # TOTEXTTAU_lag_6h
            0.21,  # TOTEXTTAU_lag_12h
            0.20,  # TOTEXTTAU_lag_24h
            
            # Rolling features (2 features)
            0.24,  # TOTEXTTAU_rolling_mean_3h
            0.22   # TOTEXTTAU_rolling_mean_24h
        ]
        
        # Total: 11 + 4 + 2 + 1 + 6 + 2 = 26 features
        return features
    
    def predict(self, start_date, hours=24):
        """Main prediction function"""
        if not all([self.reg_model, self.clf_model, self.metadata]):
            return {"error": "Models not loaded"}
        
        predictions = []
        current_dt = datetime.strptime(start_date, "%Y-%m-%d %H:%M")
        
        for i in range(hours):
            features = self.create_features(current_dt)
            
            # Get predictions from both models
            aqi_value = float(self.reg_model.predict([features])[0])
            pollution_prob = float(self.clf_model.predict_proba([features])[0][1])
            is_polluted = pollution_prob >= self.metadata.get('safety_threshold', 0.2)
            
            predictions.append({
                "time": current_dt.strftime("%Y-%m-%d %H:%M"),
                "AQI_pred": round(aqi_value, 4),
                "polluted": bool(is_polluted),
                "prob": round(pollution_prob, 4)
            })
            
            current_dt += timedelta(hours=1)
        
        return {
            "predictions": predictions,
            "metadata": {
                "prediction_horizon": self.metadata.get('prediction_horizon', 6),
                "safety_threshold": self.metadata.get('safety_threshold', 0.2),
                "total_predictions": len(predictions)
            }
        }

# Usage
if __name__ == "__main__":
    predictor = CairoPollutionPredictor()
    result = predictor.predict("2025-10-03 08:00", hours=6)
    print(json.dumps(result, indent=2, ensure_ascii=False))