cd backend
python3 -m venv .venv
source .venv/bin/activate # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000