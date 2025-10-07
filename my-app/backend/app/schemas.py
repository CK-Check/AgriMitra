from pydantic import BaseModel, Field, ValidationError, model_validator
from typing import Optional


class SoilSampleCreate(BaseModel):
    potassium: float = Field(ge=0, le=2000)
    nitrogen: float = Field(ge=0, le=500)
    phosphorus: float = Field(ge=0, le=200)
    pH: float = Field(ge=0, le=14)


class SoilSampleUpdate(BaseModel):
    potassium: Optional[float] = Field(default=None, ge=0, le=2000)
    nitrogen: Optional[float] = Field(default=None, ge=0, le=500)
    phosphorus: Optional[float] = Field(default=None, ge=0, le=200)
    pH: Optional[float] = Field(default=None, ge=0, le=14)


def parse_body(model_cls, data):
    try:
        return model_cls.model_validate(data)
    except ValidationError as e:
        return e


