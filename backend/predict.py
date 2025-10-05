import pandas as pd
import joblib
import json

class CairoPollutionPredictor:
    def __init__(self, df_path="df_clean.csv"):
        self.df_path = df_path
        self.reg_model = joblib.load("pollution_regression_model.pkl")
        self.clf_model = joblib.load("pollution_classification_model.pkl")
        print("Models loaded successfully!")

    def predict_next_hours(self, prediction_horizon=12):
        df = pd.read_csv(self.df_path)

        features = df.drop(columns=["future_TOTEXTTAU", "is_polluted_future", "time", "TOTEXTTAU"])
        times = df["time"].tail(prediction_horizon).reset_index(drop=True)

        reg_preds = self.reg_model.predict(features.tail(prediction_horizon))
        clf_probs = self.clf_model.predict_proba(features.tail(prediction_horizon))[:, 1]
        clf_preds = (clf_probs > 0.5).astype(int)

        output = {
            "predictions": [
                {
                    "time": str(times[i]),
                    "AQI_pred": float(round(reg_preds[i], 4)),
                    "polluted": bool(clf_preds[i]),
                    "prob": float(round(clf_probs[i], 4))
                }
                for i in range(len(times))
            ],
            "metadata": {
                "prediction_horizon": prediction_horizon,
                "safety_threshold": 0.2,
                "total_predictions": len(times)
            }
        }

        return json.dumps(output, indent=2)
