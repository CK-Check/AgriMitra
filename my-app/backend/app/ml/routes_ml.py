from flask import Blueprint, request, jsonify
from .ml.inference_pkl import predict_one, FEATURES_COLUMNS

ml_bp = Blueprint("ml", __name__, url_prefix="/api/ml")

@ml_bp.post("/predict")
def predict():
    data = request.get_json(silent=True) or {}
    missing = [k for k in FEATURES_COLUMNS if k not in data]
    if missing:
        return jsonify({"error": "Missing fields", "fields": missing}), 400
    try:
        out = predict_one(data)
        return jsonify({"prediction": out})
    except Exception as e:
        return jsonify({"error": "Inference failed", "details": str(e)}), 500