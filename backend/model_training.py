import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score, classification_report

# Load dataset
df = pd.read_csv("df_clean.csv")

# Features and targets
target_reg = "future_TOTEXTTAU"
target_clf = "is_polluted_future"

features = df.drop(columns=[target_reg, target_clf, "time"])  # time not used in training

X = features
y_reg = df[target_reg]
y_clf = df[target_clf]

# Split data
X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(X, y_reg, test_size=0.2, random_state=42)
X_train_clf, X_test_clf, y_train_clf, y_test_clf = train_test_split(X, y_clf, test_size=0.2, random_state=42)

# Train regression model
reg_model = RandomForestRegressor(n_estimators=200, random_state=42)
reg_model.fit(X_train_reg, y_train_reg)

# Evaluate regression
y_pred_reg = reg_model.predict(X_test_reg)
print("Regression -> RMSE:", mean_squared_error(y_test_reg, y_pred_reg, squared=False))
print("Regression -> R2:", r2_score(y_test_reg, y_pred_reg))

# Train classification model
clf_model = RandomForestClassifier(n_estimators=200, random_state=42)
clf_model.fit(X_train_clf, y_train_clf)

# Evaluate classification
y_pred_clf = clf_model.predict(X_test_clf)
print("Classification -> Accuracy:", accuracy_score(y_test_clf, y_pred_clf))
print("Classification Report:\n", classification_report(y_test_clf, y_pred_clf))

# Save models
joblib.dump(reg_model, "reg_model.pkl")
joblib.dump(clf_model, "clf_model.pkl")

print("Models saved successfully!")
