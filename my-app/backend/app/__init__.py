from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    database_url = os.getenv("DATABASE_URL")
    if database_url and database_url.startswith("mysql://"):
        database_url = database_url.replace("mysql://", "mysql+pymysql://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url or "sqlite:///soil.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)

    from .routes import bp as api_bp
    app.register_blueprint(api_bp)

    try:
        from .ml.routes_ml import ml_bp
        app.register_blueprint(ml_bp)
    except ImportError:
        pass

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app

