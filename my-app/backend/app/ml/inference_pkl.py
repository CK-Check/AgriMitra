import joblib
from pathlib import Path
import threading
import pandas as pd

_artifact_path = Path(__file__).parent.parent.parent / "artifacts" / "model.pkl"
_model = None
_lock = threading.Lock()

FEATURES_COLUMNS = [
    "potassium", "nitrogen", "phosphorus", "pH"
]

def _load_model():
    global _model
    with _lock:
        if _model is None:
            _model = joblib.load(_artifact_path)
    return _model

def predict_one(payload: dict):
    model = _load_model()
    df = pd.DataFrame([{col: payload[col] for col in FEATURES_COLUMNS}])
    pred = model.predict(df)[0]
    try:
        return float(pred)
    except Exception:
        return pred