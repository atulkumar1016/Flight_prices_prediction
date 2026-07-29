# ✈️ AirVista — Flight Price Prediction

**Tool:** Python, Flask, Machine Learning &nbsp;|&nbsp; **Type:** Web Application

> ✈️ AirVista is an intelligent flight price prediction system built using RandomForest Regressor optimized with SelectKBest feature selection — achieving 83.27% accuracy with a complete ML pipeline covering data cleaning, feature engineering, encoding, and instant predictions via a modern Flask web interface. | Domain: Data Analysis

---

## 🗂️ Project Overview

**AirVista** is a lightweight yet powerful Flight Price Prediction web app designed around real Indian domestic flight patterns. It follows a complete machine learning workflow — from raw data cleaning to live deployment — delivering instant ticket price predictions through a smooth, responsive Flask interface.

---

## ✅ Highlights

- ✔️ RandomForest (KBest-optimized) chosen as the best-performing model
- ✔️ Achieves 83.27% accuracy on test data
- ✔️ Uses SelectKBest (f_regression) to extract the most impactful features
- ✔️ Complete preprocessing pipeline (cleaning, encoding, time extraction, duration parsing)
- ✔️ Instant predictions through a smooth Flask web interface
- ✔️ Fully structured, lightweight, and easy to deploy on Render / Vercel / Railway
- ✔️ Designed using real patterns of Indian domestic flight data

---

## ✨ Features

### 🎯 ML-Powered Price Prediction
- RandomForest Regressor optimized with SelectKBest feature selection
- Achieves 83.27% prediction accuracy on test data
- Selects only the most impactful features using `f_regression` scoring

### 🧹 Complete Preprocessing Pipeline
- Data cleaning and handling of missing/inconsistent values
- Time and route feature engineering (departure hour, duration parsing)
- Categorical encoding for airline, source, destination, and stops

### 🌐 Flask Web Interface
- Modern, responsive UI for seamless user interaction
- Users can select airline, route, departure time, and number of stops
- Instant price prediction output with no page reload delays

### 🚀 Deployment Ready
- Lightweight and structured for easy hosting
- Compatible with Render, Vercel, and Railway platforms

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python, Flask |
| **ML Model** | RandomForest Regressor, SelectKBest |
| **Data Processing** | Pandas, NumPy |
| **Feature Selection** | Scikit-learn (f_regression) |
| **Encoding** | Label Encoding, One-Hot Encoding |
| **Deployment** | Render / Vercel / Railway |

---

## 📁 File Structure

```
AirVista/
│
├── 📄 app.py                        # Flask application entry point
├── 📄 model.py                      # Model training & prediction logic
├── 📄 preprocess.py                 # Data cleaning & feature engineering
├── 📂 templates/
│   └── index.html                   # Frontend HTML template
├── 📂 static/
│   └── style.css                    # Web interface styling
├── 📂 data/
│   ├── raw_flights.csv              # Original flight dataset
│   └── cleaned_flights.csv          # Preprocessed dataset
├── 📄 requirements.txt              # Python dependencies
│
└── 📄 README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or later
- Libraries: `flask`, `pandas`, `numpy`, `scikit-learn`

```bash
pip install -r requirements.txt
```

### How to Run Locally
1. **Clone** the repository
2. **Install** dependencies
```bash
pip install -r requirements.txt
```
3. **Run** the Flask app
```bash
python app.py
```
4. **Open** `http://localhost:5000` in your browser

---

## 📌 Key Concepts Covered

- **RandomForest Regressor** — ensemble learning for regression tasks
- **SelectKBest** — statistical feature selection using f_regression
- **Feature Engineering** — extracting time, duration, and route features
- **Categorical Encoding** — Label & One-Hot encoding for ML compatibility
- **Flask Deployment** — building and hosting a Python ML web app
- **Indian Flight Data** — real-world domestic route and pricing patterns

---

## 📷 App Preview

> *(Add screenshots of the web interface here)*

```
[ App Screenshot Placeholder ]
```

---

## 🎯 Learning Outcomes

- Built an **optimized ML pipeline** with feature selection for better accuracy
- Learned **time and route feature engineering** on real flight datasets
- Developed a **responsive Flask web app** for live price predictions
- Gained experience in **model evaluation and deployment** on cloud platforms

---

## 🤝 Connect

Feel free to explore, fork, or give feedback!
If you found this helpful, don't forget to ⭐ the repo!

---

*#MachineLearning #FlightPricePrediction #RandomForest #Flask #Python #DataAnalysis #FeatureEngineering #Deployment*
