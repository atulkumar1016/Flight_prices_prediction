# ✈️ AirVista — Flight Price Prediction

**Stack:** React · Node.js · Express · Python · XGBoost · Docker &nbsp;|&nbsp; **Type:** Full-Stack ML Web Application

> AirVista is an intelligent Flight Price Prediction system powered by **XGBoost**, delivering fast and accurate ticket price predictions through a modern **React + Express** architecture. The project includes a complete machine learning pipeline covering data preprocessing, feature engineering, model training, and real-time predictions via a seamless web interface.

---

## 🗂️ Project Overview

AirVista is a full-stack machine learning application designed to predict Indian domestic flight prices based on user inputs such as source city, destination city, departure time, and journey date.

The project combines a **React (Vite)** frontend with an **Express** backend that communicates with a Python prediction engine using `child_process.spawn()`. The trained **XGBoost** model processes the input and returns accurate price predictions for 9 major Indian airlines in real time.

The application is fully containerized using **Docker**, making it easy to set up, run, and deploy consistently across different environments.

---

## ✅ Highlights

- ✔️ XGBoost Regressor (~90% R² accuracy) for flight price prediction
- ✔️ Full-stack architecture: React + Express + Python
- ✔️ Dockerized into a single container (Node + Python)
- ✔️ Modern dark-themed responsive React interface
- ✔️ Real-time predictions via Python `child_process.spawn()`
- ✔️ Complete preprocessing & feature engineering pipeline
- ✔️ REST API powered by Express
- ✔️ Based on real Indian domestic flight data (10,683 records)
- ✔️ Supports 9 major airlines across 7 Indian cities

---

## ✨ Features

### 🎯 ML-Powered Price Prediction
- XGBoost Regressor trained on 10,683 real flight records
- Predicts prices for 9 airlines simultaneously
- Sorted by price — cheapest to most expensive
- Highlights best value and most expensive options

### 🧹 Data Processing Pipeline
- Missing value handling and duplicate removal
- Date & time feature extraction (hour, day, month, weekday)
- Duration parsing and conversion to minutes
- Airline, source, destination, and stops encoding
- Dictionary-based label mappings (`mappings.json`)

### 🌐 Modern Web Interface
- Dark-themed React SPA with smooth animations
- Dataset Preview tab with paginated flight data table
- Data Insights tab with 7 EDA charts (click to enlarge)
- FlySmart Predictor with instant multi-airline results
- Fully responsive layout

### ⚙️ Express Backend
- REST API with `/api/predict` and `/api/dataset` endpoints
- Spawns Python prediction script via `child_process.spawn()`
- Serves static assets and built React frontend
- SPA fallback routing for React Router

### 🐳 Docker Support
- Single multi-stage Dockerfile (Node 20 + Python 3.11)
- Builds React frontend and installs Node/Python dependencies
- Runs the Express server which serves both frontend and API
- No Docker Compose needed — single container, single port

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Backend | Node.js 20, Express 4 |
| Machine Learning | Python, XGBoost |
| Data Processing | Pandas, NumPy |
| Model Format | XGBoost native JSON (`best_model.json`) |
| Containerization | Docker (node:20-bookworm-slim) |
| Deployment | Render / Railway / Fly.io |

---

## 📁 Project Structure

```text
AirVista/
│
├── 📂 frontend/               # React (Vite) SPA
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   └── App.css            # Styles
│   ├── public/                # Static assets (logos, charts, videos)
│   ├── index.html
│   ├── vite.config.js         # Vite config with dev proxy
│   └── package.json
│
├── 📂 backend/                # Express server
│   ├── server.js              # API routes + static file serving
│   ├── predict.py             # XGBoost prediction script
│   ├── requirements.txt       # Python dependencies
│   └── package.json
│
├── 📂 static/                 # Charts, airline logos, videos
│
├── best_model.json            # Trained XGBoost model (native format)
├── mappings.json              # Label encoding mappings
├── flights.csv                # Raw dataset (10,683 records)
├── requirements.txt           # Root Python dependencies
├── Dockerfile                 # Single-container Docker build
├── start.bat                  # Windows one-click local startup
├── .gitignore
└── README.md
