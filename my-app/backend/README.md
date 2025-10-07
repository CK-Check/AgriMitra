# Flask Backend for AgriMitra

## Setup

1. Create venv and install deps
```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Configure database (optional)
- Default: SQLite file `soil.db` in this folder
- To use MySQL, set `DATABASE_URL`, e.g.
```bash
$env:DATABASE_URL = "mysql+pymysql://user:pass@localhost:3306/agrimitra"
```

3. Run
```bash
python wsgi.py
```

## API
- GET `/health`
- CRUD under `/api/soil-samples`
  - GET `/api/soil-samples`
  - POST `/api/soil-samples`
  - GET `/api/soil-samples/:id`
  - PATCH `/api/soil-samples/:id`
  - DELETE `/api/soil-samples/:id`

Payload schema (POST):
```json
{
  "potassium": 0,
  "nitrogen": 0,
  "phosphorus": 0,
  "pH": 7
}
```
