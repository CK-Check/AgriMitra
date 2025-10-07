from flask import Blueprint, request, jsonify, abort
from sqlalchemy.exc import IntegrityError
from . import db
from .models import SoilSample
from .schemas import SoilSampleCreate, SoilSampleUpdate, parse_body

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.errorhandler(Exception)
def handle_error(err):
    # Basic error logging; in production, integrate with proper logging
    return jsonify({"error": "Internal Server Error"}), 500


@bp.get("/soil-samples")
def list_soil_samples():
    samples = SoilSample.query.order_by(SoilSample.createdAt.desc()).all()
    return jsonify([s.to_dict() for s in samples])


@bp.post("/soil-samples")
def create_soil_sample():
    parsed = parse_body(SoilSampleCreate, request.get_json(silent=True) or {})
    if isinstance(parsed, Exception):
        return jsonify({"error": "Validation failed", "details": parsed.errors()}), 400
    sample = SoilSample(**parsed.model_dump())
    db.session.add(sample)
    db.session.commit()
    return jsonify(sample.to_dict()), 201


@bp.get("/soil-samples/<int:id>")
def get_soil_sample(id: int):
    sample = SoilSample.query.get_or_404(id)
    return jsonify(sample.to_dict())


@bp.patch("/soil-samples/<int:id>")
def update_soil_sample(id: int):
    parsed = parse_body(SoilSampleUpdate, request.get_json(silent=True) or {})
    if isinstance(parsed, Exception):
        return jsonify({"error": "Validation failed", "details": parsed.errors()}), 400
    sample = SoilSample.query.get_or_404(id)
    data = {k: v for k, v in parsed.model_dump().items() if v is not None}
    print(data)
    for k, v in data.items():
        setattr(sample, k, v)
    db.session.commit()
    return jsonify(sample.to_dict())


@bp.delete("/soil-samples/<int:id>")
def delete_soil_sample(id: int):
    sample = SoilSample.query.get_or_404(id)
    db.session.delete(sample)
    db.session.commit()
    return ("", 204)


