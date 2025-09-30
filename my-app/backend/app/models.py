from datetime import datetime
from . import db


class SoilSample(db.Model):
    __tablename__ = "SoilSample"

    id = db.Column(db.Integer, primary_key=True)
    potassium = db.Column(db.Float, nullable=False)
    nitrogen = db.Column(db.Float, nullable=False)
    phosphorus = db.Column(db.Float, nullable=False)
    pH = db.Column(db.Float, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "potassium": self.potassium,
            "nitrogen": self.nitrogen,
            "phosphorus": self.phosphorus,
            "pH": self.pH,
            "createdAt": self.createdAt.isoformat() + "Z" if self.createdAt else None,
        }


