# ✈️ AirVista — Flight Price Prediction

**Tool:** React, Node.js, Express, Python, Machine Learning, Docker | **Type:** Full-Stack Web Application

> ✈️ AirVista is an intelligent Flight Price Prediction system powered by **XGBoost**, delivering fast and accurate ticket price predictions through a modern **React + Express** architecture. The project includes a complete machine learning pipeline covering data preprocessing, feature engineering, model training, and real-time predictions via a seamless web interface.

---

# 🗂️ Project Overview

AirVista is a full-stack machine learning application designed to predict Indian domestic flight prices based on user inputs such as airline, source, destination, departure time, arrival time, total stops, and journey date.

The project combines a modern React frontend with an Express backend that communicates with a Python prediction engine using `child_process.spawn()`. The trained XGBoost model processes the input and returns accurate flight price predictions in real time.

The application is fully containerized using **Docker** and **Docker Compose**, making it easy to set up, run, and deploy consistently across different environments.

---

# ✅ Highlights

- ✔️ XGBoost Regressor for accurate flight price prediction
- ✔️ Full-stack architecture (React + Express + Python)
- ✔️ Dockerized application using Docker Compose
- ✔️ Modern responsive React interface
- ✔️ Real-time predictions using Python backend
- ✔️ Complete preprocessing & feature engineering pipeline
- ✔️ REST API powered by Express
- ✔️ Easy deployment on Vercel + Render
- ✔️ Based on real Indian domestic flight data

---

# ✨ Features

## 🎯 Machine Learning Prediction

- XGBoost Regressor
- Real-time flight price prediction
- Trained on Indian domestic flight dataset
- Optimized preprocessing pipeline

## 🧹 Data Processing

- Missing value handling
- Date & time feature extraction
- Duration parsing
- Airline encoding
- Source & destination encoding
- Total stops encoding

## 🌐 Modern Web Interface

- React frontend
- Responsive UI
- Instant prediction results
- User-friendly design

## ⚙️ Express Backend

- REST API
- Executes Python prediction script using `child_process.spawn()`
- Returns prediction results as JSON

## 🐳 Docker Support

- Dockerized frontend
- Dockerized backend
- Docker Compose orchestration
- Consistent development environment
- Easy local setup

## 🚀 Deployment Ready

- Frontend deployed on Vercel
- Backend deployed on Render
- Easily portable to Railway or other cloud platforms

---

# 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Machine Learning | Python, XGBoost |
| Data Processing | Pandas, NumPy |
| Model Training | Scikit-learn |
| API Communication | REST API |
| Containerization | Docker, Docker Compose |
| Deployment | Vercel + Render |

---

# 📁 Project Structure

```text
AirVista/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── predict.py
│   ├── Dockerfile
│   ├── package.json
│   └── requirements.txt
│
├── best_model.json
├── mappings.json
├── flights.csv
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js
- Python 3.10+
- npm
- Docker (Optional)

---

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Run Backend

```bash
cd backend
npm start
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

---

## Open

```
http://localhost:5173
```

---

# 🐳 Run with Docker

## Build and Start Containers

```bash
docker-compose up --build
```

## Run in Background

```bash
docker-compose up -d
```

## Stop Containers

```bash
docker-compose down
```

---

# 📌 Machine Learning Pipeline

- Data Cleaning
- Feature Engineering
- Date & Time Processing
- Duration Extraction
- Airline Encoding
- Source Encoding
- Destination Encoding
- Total Stops Encoding
- XGBoost Training
- Real-Time Prediction

---

# 🎯 Learning Outcomes

- Built a complete Full-Stack Machine Learning application
- Integrated React with Express backend
- Connected Node.js with Python using `child_process.spawn()`
- Implemented real-time ML prediction API
- Worked with XGBoost regression models
- Performed feature engineering and preprocessing
- Containerized the application using Docker
- Orchestrated multiple services with Docker Compose
- Deployed a hybrid Node.js + Python application

---

# 🤝 Connect

Feel free to explore, fork, or contribute to this project.

If you found this project useful, don't forget to ⭐ the repository!

---

## 🏷️ Tags

`Machine Learning`
`Flight Price Prediction`
`XGBoost`
`React`
`Node.js`
`Express`
`Python`
`Data Science`
`Full Stack`
`Docker`
`Docker Compose`
