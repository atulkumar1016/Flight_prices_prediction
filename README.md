# ✈️ AirVista — Flight Price Prediction

**Stack:** React · Node.js · Express · Python · XGBoost · Docker &nbsp;|&nbsp; **Type:** Full-Stack Machine Learning Web Application

> AirVista is an intelligent Flight Price Prediction system powered by **XGBoost**, delivering fast and accurate ticket price predictions through a modern **React + Express** architecture. The project includes a complete machine learning pipeline covering data preprocessing, feature engineering, model training, and real-time predictions through a seamless web interface.

---

# 🗂️ Project Overview

AirVista is a full-stack machine learning application designed to predict Indian domestic flight prices based on user inputs such as source city, destination city, departure time, arrival time, and journey date.

The application combines a **React (Vite)** frontend with an **Express** backend that communicates with a Python prediction engine using `child_process.spawn()`. The trained **XGBoost** model processes the input and returns accurate flight price predictions in real time.

The project is fully containerized using **Docker**, providing a consistent development and deployment environment.

---

# ✅ Highlights

- ✔️ XGBoost Regressor (~89.7% R² Score) for flight price prediction
- ✔️ Full-stack architecture using React, Express, and Python
- ✔️ Dockerized application for simplified deployment
- ✔️ Modern responsive React interface
- ✔️ Real-time predictions using Python and `child_process.spawn()`
- ✔️ Complete preprocessing & feature engineering pipeline
- ✔️ REST API powered by Express
- ✔️ Trained on real Indian domestic flight dataset (10,683 records)

---

# ✨ Features

## 🎯 Machine Learning Prediction

- XGBoost Regressor
- Real-time flight price prediction
- Trained on Indian domestic flight dataset
- Optimized preprocessing pipeline
- Instant prediction results

---

## 🧹 Data Processing Pipeline

- Missing value handling
- Duplicate removal
- Date & time feature extraction
- Duration parsing
- Airline encoding
- Source & destination encoding
- Total stops encoding
- Dictionary-based label mappings (`mappings.json`)

---

## 🌐 Modern Web Interface

- React (Vite) Single Page Application
- Responsive UI
- Dark-themed interface
- Instant prediction results
- Dataset preview
- Interactive data visualization charts

---

## ⚙️ Express Backend

- REST API
- Python integration using `child_process.spawn()`
- JSON-based request & response
- Static frontend serving (Production)
- React Router SPA fallback

---

## 🐳 Docker Support

- Single Docker container
- Node.js + Python runtime
- Production-ready Docker image
- Consistent development environment
- Easy deployment across platforms

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
| Containerization | Docker |
| Deployment | Render, Railway, Fly.io |

---

# 📁 Project Structure

```text
AirVista/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── predict.py
│   ├── package.json
│   └── requirements.txt
│
├── static/
│
├── best_model.json
├── mappings.json
├── flights.csv
├── requirements.txt
├── Dockerfile
├── start.bat
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js (v18 or above)
- Python 3.10+
- npm
- Docker (Optional)

---

## 1. Clone Repository

```bash
git clone https://github.com/atulkumar1016/Flight_prices_prediction.git
cd AirVista
```

---

## 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

or

```bash
pip install -r backend/requirements.txt
```

---

## 3. Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

## 4. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

(Vite automatically proxies `/api/*` requests to the backend.)

---

## 5. Open Application

```
http://localhost:5173
```

---

# ⚡ Windows Quick Start

Run

```bash
start.bat
```

This automatically starts both frontend and backend in separate terminal windows.

---

# 🐳 Run with Docker

## Build Docker Image

```bash
docker build -t airvista .
```

## Run Container

```bash
docker run -p 5000:5000 airvista
```

Open:

```
http://localhost:5000
```

The Docker image builds the React frontend, installs all Node.js and Python dependencies, and serves the frontend and backend from a single Express server.

---

# 📌 Machine Learning Pipeline

- Data Cleaning
- Missing Value Handling
- Duplicate Removal
- Feature Engineering
- Date & Time Processing
- Duration Extraction
- Airline Encoding
- Source Encoding
- Destination Encoding
- Total Stops Encoding
- XGBoost Model Training
- Model Evaluation
- Real-Time Prediction

---

# 🔌 API Reference

## POST `/api/predict`

Predicts flight prices based on user inputs.

### Request

```json
{
  "source_code": "DEL",
  "dest_code": "BLR",
  "day": 15,
  "month": 8,
  "year": 2026,
  "dep_hour": 10,
  "arr_hour": 13
}
```

### Response

```json
{
  "route": "DEL -> BLR",
  "journey_date": "15-8-2026",
  "results": [
    {
      "airline_name": "GoAir",
      "price": 5071.93,
      "duration": 180
    },
    {
      "airline_name": "IndiGo",
      "price": 5571.88,
      "duration": 180
    }
  ]
}
```

---

## GET `/api/dataset`

Returns a preview of the flight dataset.

---

# 🛫 Supported Airports

The prediction model supports flights across major Indian airports, including:

- Delhi (DEL)
- Mumbai (BOM)
- Bangalore (BLR)
- Kolkata (CCU)
- Hyderabad (HYD)
- Chennai (MAA)
- Cochin (COK)

---

# 🎯 Learning Outcomes

- Built a complete Full-Stack Machine Learning application
- Integrated React frontend with Express backend
- Connected Node.js with Python using `child_process.spawn()`
- Implemented a real-time ML prediction API
- Worked with XGBoost regression models
- Performed feature engineering and preprocessing on real flight data
- Containerized a hybrid Node.js + Python application using Docker
- Built and deployed a production-ready Machine Learning web application

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

# 🏷️ Tags

`Machine Learning` `Flight Price Prediction` `XGBoost` `React` `Node.js` `Express` `Python` `Docker` `Data Science` `Full Stack`
