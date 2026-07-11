import os
import json
from typing import List, Dict, Any, Union
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Guide My Way API",
    description="Career Guidance Platform Backend for Indian Students",
    version="1.0.0"
)

# Enable CORS for frontend integration
frontend_url = os.getenv("FRONTEND_URL", "*")
origins = [frontend_url] if frontend_url != "*" else ["*"]
if frontend_url != "*":
    origins.extend([
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resolve data path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

def load_json_file(filename: str) -> Any:
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        # Fallback to current directory data folder if running in a different cwd
        filepath = os.path.join("backend", "data", filename)
        if not os.path.exists(filepath):
            filepath = os.path.join("data", filename)
            
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

# Helper function for search match checking
def matches_query(val: Any, q: str) -> bool:
    if isinstance(val, str):
        return q in val.lower()
    elif isinstance(val, list):
        return any(matches_query(item, q) for item in val)
    elif isinstance(val, dict):
        # Avoid matching system keys like 'id' or 'type'
        return any(matches_query(v, q) for k, v in val.items() if k not in ("id", "type"))
    return False

@app.get("/")
def read_root():
    return {"message": "Welcome to Guide My Way Career Platform API", "status": "Running"}

@app.get("/api/streams")
def get_streams():
    return load_json_file("streams.json")

@app.get("/api/engineering-diplomas")
def get_engineering_diplomas():
    return load_json_file("engineering_diplomas.json")

@app.get("/api/non-engineering-diplomas")
def get_non_engineering_diplomas():
    return load_json_file("non_engineering_diplomas.json")

@app.get("/api/iti-trades")
def get_iti_trades():
    return load_json_file("iti_trades.json")

@app.get("/api/arts-humanities")
def get_arts_humanities():
    return load_json_file("arts_humanities.json")

@app.get("/api/sports-pathways")
def get_sports_pathways():
    return load_json_file("sports_pathways.json")

@app.get("/api/defence-schemes")
def get_defence_schemes():
    return load_json_file("defence_schemes.json")

@app.get("/api/exams")
def get_exams():
    return load_json_file("exams.json")

@app.get("/api/timeline")
def get_timeline():
    return load_json_file("career_timeline.json")

@app.get("/api/search")
def search(q: str = Query("", description="Search query keyword")):
    if not q:
        return {
            "streams": [],
            "engineeringDiplomas": [],
            "nonEngineeringDiplomas": [],
            "itiTrades": [],
            "artsHumanities": [],
            "sportsPathways": [],
            "defenceSchemes": [],
            "exams": [],
            "timeline": []
        }
    
    q_lower = q.lower().strip()
    
    # Load all data
    streams = load_json_file("streams.json")
    eng_diplomas = load_json_file("engineering_diplomas.json")
    non_eng_diplomas = load_json_file("non_engineering_diplomas.json")
    iti_trades_raw = load_json_file("iti_trades.json")
    arts_raw = load_json_file("arts_humanities.json")
    sports_raw = load_json_file("sports_pathways.json")
    defence_raw = load_json_file("defence_schemes.json")
    exams = load_json_file("exams.json")
    timeline = load_json_file("career_timeline.json")
    
    # Process ITI trades (it's a dictionary with engineering and nonEngineering arrays)
    iti_trades = []
    if isinstance(iti_trades_raw, dict):
        iti_trades.extend(iti_trades_raw.get("engineering", []))
        iti_trades.extend(iti_trades_raw.get("nonEngineering", []))
    else:
        iti_trades = iti_trades_raw
        
    # Process sports pathways
    sports_list = []
    if isinstance(sports_raw, dict):
        sports_list.extend(sports_raw.get("disciplines", []))
        sports_list.extend(sports_raw.get("schemes", []))
    else:
        sports_list = sports_raw

    # Process defence pathways
    defence_list = []
    if isinstance(defence_raw, dict):
        defence_list.extend(defence_raw.get("pathways", []))
        # Add ssbProcess details as a searchable unit
        ssb = defence_raw.get("ssbProcess", {})
        for day, info in ssb.items():
            defence_list.append({
                "id": f"ssb_{day}",
                "scheme": f"SSB Process - {info.get('title', '')}",
                "eligibility": "Part of SSB Selection",
                "selectionProcess": info.get('details', ''),
                "training": "N/A",
                "rank": "N/A"
            })
    else:
        defence_list = defence_raw

    # Filter each category
    matched_streams = [s for s in streams if matches_query(s, q_lower)]
    matched_eng_diplomas = [d for d in eng_diplomas if matches_query(d, q_lower)]
    matched_non_eng_diplomas = [d for d in non_eng_diplomas if matches_query(d, q_lower)]
    matched_iti_trades = [t for t in iti_trades if matches_query(t, q_lower)]
    matched_arts = [a for a in arts_raw if matches_query(a, q_lower)]
    matched_sports = [s for s in sports_list if matches_query(s, q_lower)]
    matched_defence = [d for d in defence_list if matches_query(d, q_lower)]
    matched_exams = [e for e in exams if matches_query(e, q_lower)]
    matched_timeline = [t for t in timeline if matches_query(t, q_lower)]
    
    return {
        "streams": matched_streams,
        "engineeringDiplomas": matched_eng_diplomas,
        "nonEngineeringDiplomas": matched_non_eng_diplomas,
        "itiTrades": matched_iti_trades,
        "artsHumanities": matched_arts,
        "sportsPathways": matched_sports,
        "defenceSchemes": matched_defence,
        "exams": matched_exams,
        "timeline": matched_timeline
    }
