# Guide My Way 🎓

A career guidance platform that helps students in India navigate the pathways available to them after school — from choosing an intermediate stream to picking the right entrance exam, vocational trade, or defence entry scheme.

## 🌐 Live Demo

- **Website:** [guide-my-way.netlify.app](https://guide-my-way.netlify.app)
- **API:** [guide-my-way-three.vercel.app](https://guide-my-way-three.vercel.app)
- **Interactive API docs:** [guide-my-way-three.vercel.app/docs](https://guide-my-way-three.vercel.app/docs)

## ✨ Features

Guide My Way covers career pathways across multiple categories:

**Quick Pathways**
- Intermediate Streams (10+2) — compare core subjects, degree options, and entrance exams
- Engineering Diplomas
- Non-Engineering Diplomas
- ITI Trades (Vocational)
- Arts & Humanities

**Specialized Fields**
- Sports Academy Pathways
- Defence Entry Schemes
- Entrance Exam List
- Interactive Career Timeline

**Platform**
- Searchable pathway database
- About Us & Impact page
- Home dashboard with quick navigation

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Animations | Framer Motion |
| Backend | FastAPI (Python) |
| ASGI Server | Uvicorn |
| Frontend Hosting | Netlify |
| Backend Hosting | Vercel (serverless functions) |

## 📁 Project Structure

```
guide-my-way/
├── backend/
│   ├── main.py            # FastAPI app entrypoint
│   ├── requirements.txt   # Python dependencies
│   └── *.json             # Data files (streams, exams, etc.)
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components (Streams, Timeline, etc.)
│   │   ├── components/     # Shared components (Navbar, Footer, etc.)
│   │   └── config.js       # API base URL configuration
│   ├── dist/               # Production build output
│   └── package.json
├── netlify.toml            # Netlify build configuration
└── start-local.bat         # One-click local dev launcher (Windows)
```

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Python 3.11+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)

### 1. Clone the repository
```bash
git clone https://github.com/terli-mahesh-cse/guide-my-way.git
cd guide-my-way
```

### 2. Set up the backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
Backend runs at `http://localhost:8000` (API docs at `/docs`).

### 3. Set up the frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

### Quick launch (Windows)
Double-click `start-local.bat` in the project root to start both servers and open the site automatically.

## ⚙️ Environment Variables

**Frontend** (`frontend/.env` or Netlify environment variables)

| Variable | Description | Local value |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:8000` |

**Backend** (Vercel environment variables)

| Variable | Description |
|---|---|
| `FRONTEND_URL` | Allowed origin for CORS (your deployed frontend URL) |

## 📦 Deployment

- **Frontend** is deployed to [Netlify](https://netlify.com), building from the `frontend/` directory (`npm run build` → `dist/`).
- **Backend** is deployed to [Vercel](https://vercel.com) as serverless functions, building from the `backend/` directory.
- Both auto-deploy on every push to the `main` branch.

## 📬 Contact

- **Email:** support@guidemyway.in
- **Phone:** +91 800-CAREER-GO
- **Location:** Hyderabad, India

## 📄 License

© 2026 Guide My Way. All rights reserved.
