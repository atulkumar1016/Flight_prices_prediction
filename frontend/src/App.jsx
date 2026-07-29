import React, { useState, useEffect } from 'react';
import './App.css';

// Dynamic API URL for local and production deployment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://flight-prices-prediction-backend.onrender.com'
  : 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Dataset Preview state
  const [dataset, setDataset] = useState([]);
  const [loadingDataset, setLoadingDataset] = useState(false);
  const [datasetPage, setDatasetPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10683);

  // Predictor state
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [depTime, setDepTime] = useState('12:00');
  const [predictResults, setPredictResults] = useState(null);
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [predictError, setPredictError] = useState('');

  // Modal State for Enlarged Charts
  const [enlargedChart, setEnlargedChart] = useState(null);
  const [enlargedChartTitle, setEnlargedChartTitle] = useState('');

  // Fetch Dataset Preview
  useEffect(() => {
    if (activeTab === 'dataset' && dataset.length === 0) {
      fetchDataset();
    }
  }, [activeTab]);

  const fetchDataset = async () => {
    setLoadingDataset(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dataset`);
      const resData = await response.json();
      if (resData.data) {
        setDataset(resData.data);
      }
    } catch (err) {
      console.error('Failed to fetch dataset preview:', err);
    } finally {
      setLoadingDataset(false);
    }
  };

  // Prediction Submit Handler
  const handlePredict = async (e) => {
    e.preventDefault();
    if (!source || !dest || !date || !depTime) {
      alert('Please fill all fields!');
      return;
    }
    if (source === dest) {
      alert('Source and Destination cities cannot be the same!');
      return;
    }

    setLoadingPredict(true);
    setPredictError('');
    setPredictResults(null);

    try {
      const [year, month, day] = date.split('-').map(Number);
      const depHour = Number(depTime.split(':')[0]);
      // Assuming a standard 3-hour flight duration like original project
      const arrHour = (depHour + 3) % 24;

      const payload = {
        source_code: source,
        dest_code: dest,
        day,
        month,
        year,
        dep_hour: depHour,
        arr_hour: arrHour
      };

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.error) {
        setPredictError(data.error);
      } else {
        setPredictResults(data);
      }
    } catch (err) {
      setPredictError('Server connection error. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoadingPredict(false);
    }
  };

  // Swap Source and Destination
  const handleSwap = () => {
    const temp = source;
    setSource(dest);
    setDest(temp);
  };

  // Pagination indexing
  const indexOfLastRecord = datasetPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataset.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dataset.length / recordsPerPage);

  // Helper mapping for Logo paths
  const getLogoPath = (name) => {
    const map = {
      'Air India': 'airindia.png',
      'IndiGo': 'indigo.png',
      'SpiceJet': 'SpiceJet.png',
      'Vistara': 'Vistara.png',
      'Akasa Air': 'Akasa_Air-2.png',
      'AirAsia': 'AirAsia.png',
      'GoAir': 'goair.png',
      'Trujet': 'trujet.png',
      'Jet Airways': 'jet airways.png'
    };
    return map[name] || '';
  };

  const getBrandColorClass = (name) => {
    const map = {
      'IndiGo': 'border-indigo',
      'Air India': 'border-airindia',
      'SpiceJet': 'border-spicejet',
      'Vistara': 'border-vistara',
      'AirAsia': 'border-airasia',
      'GoAir': 'border-goair',
      'Jet Airways': 'border-fallback'
    };
    return map[name] || 'border-fallback';
  };

  return (
    <div className="app-container">
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
            <i className="fas fa-plane"></i> Air Vista
          </a>
          <ul className="nav-menu">
            <li>
              <button 
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'dataset' ? 'active' : ''}`}
                onClick={() => setActiveTab('dataset')}
              >
                Dataset Preview
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'visuals' ? 'active' : ''}`}
                onClick={() => setActiveTab('visuals')}
              >
                Data Insights
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'predictor' ? 'active' : ''}`}
                onClick={() => setActiveTab('predictor')}
              >
                Predict Now
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* --- TAB VIEWS --- */}

      {/* 1. HOME TAB */}
      {activeTab === 'home' && (
        <div>
          <section className="hero">
            <video className="hero-video" autoPlay muted playsInline loop>
              <source src={`${API_BASE_URL}/static/apl.mp4`} type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
            <div className="hero-content">
              <span className="hero-tag">Real-Time Price Predictions</span>
              <h1>Intelligent Flight Pricing</h1>
              <p className="hero-subtitle">Know the Best Price Before You Book</p>
              <button className="predict-submit-btn" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={() => setActiveTab('predictor')}>
                <i className="fas fa-chart-line"></i> Start Predicting
              </button>
            </div>
          </section>

          <section className="section-container">
            <h2 className="section-title">Built with Real Machine Learning</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <i className="fas fa-database"></i>
                <h3>Data Preprocessing</h3>
                <p>Cleans duplicates, resolves missing data, standardizes locations, and applies alphabetical dictionary mappings consistently.</p>
              </div>
              <div className="tech-card">
                <i className="fas fa-screwdriver-wrench"></i>
                <h3>Feature Engineering</h3>
                <p>Creates journey day, month, weekday, weekend indicator, time-of-day categories, ordinal stops mapping, and duration in minutes.</p>
              </div>
              <div className="tech-card">
                <i className="fas fa-tree"></i>
                <h3>XGBoost & Random Forest</h3>
                <p>Trains Linear Regression baseline, Random Forest, and state-of-the-art XGBoost Gradient Boosting models for high prediction accuracy.</p>
              </div>
              <div className="tech-card">
                <i className="fas fa-chart-line"></i>
                <h3>Model Metrics</h3>
                <p>Evaluates prediction capabilities using R² score, MAE, and RMSE. Deploys the model with the highest R² score (currently XGBoost ~90%).</p>
              </div>
            </div>
          </section>

          <section className="airlines-section">
            <div className="section-container">
              <h2 className="section-title">Supported Airlines</h2>
              <div className="airlines-grid">
                <div className="airline-card"><img src={`${API_BASE_URL}/static/indigo.png`} alt="IndiGo" /><div className="airline-name">IndiGo</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/airindia.png`} alt="Air India" /><div className="airline-name">Air India</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/Vistara.png`} alt="Vistara" /><div className="airline-name">Vistara</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/SpiceJet.png`} alt="SpiceJet" /><div className="airline-name">SpiceJet</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/AirAsia.png`} alt="AirAsia" /><div className="airline-name">AirAsia</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/goair.png`} alt="GoAir" /><div className="airline-name">GoAir</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/jet airways.png`} alt="Jet Airways" /><div className="airline-name">Jet Airways</div></div>
                <div className="airline-card"><img src={`${API_BASE_URL}/static/trujet.png`} alt="Trujet" /><div className="airline-name">Trujet</div></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 2. DATASET PREVIEW TAB */}
      {activeTab === 'dataset' && (
        <section className="section-container">
          <h2 className="section-title">Raw Dataset Preview</h2>
          <div className="dataset-info-box">
            <i className="fas fa-info-circle"></i> Showing 50 sample bookings from the 10,000+ flight record database.
          </div>

          {loadingDataset ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Loading dataset preview...</p>
            </div>
          ) : (
            <div>
              <div className="table-wrapper">
                <table className="dataset-table">
                  <thead>
                    <tr>
                      <th>Airline</th>
                      <th>Date of Journey</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>Duration</th>
                      <th>Stops</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>{row.Airline}</strong></td>
                        <td>{row.Date_of_Journey}</td>
                        <td>{row.Source}</td>
                        <td>{row.Destination}</td>
                        <td>{row.Route}</td>
                        <td>{row.Dep_Time}</td>
                        <td>{row.Arrival_Time}</td>
                        <td>{row.Duration}</td>
                        <td>{row.Total_Stops}</td>
                        <td>₹{Number(row.Price).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button 
                  className="page-btn"
                  disabled={datasetPage === 1}
                  onClick={() => setDatasetPage(p => p - 1)}
                >
                  Previous
                </button>
                <span className="page-info">Page {datasetPage} of {totalPages}</span>
                <button 
                  className="page-btn"
                  disabled={datasetPage === totalPages}
                  onClick={() => setDatasetPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. DATA INSIGHTS / VISUALIZATIONS */}
      {activeTab === 'visuals' && (
        <section className="section-container">
          <h2 className="section-title">Exploratory Data Insights & ML Analysis</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', marginTop: '-20px' }}>
            Click on any chart to enlarge and inspect features.
          </p>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>1. Flight Share by Airline</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_airline_share.png'); setEnlargedChartTitle('Flight Share by Airline'); }}>
                <img src={`${API_BASE_URL}/static/chart_airline_share.png`} alt="Airline Share" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>2. Source City Distribution</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_source_city_distribution.png'); setEnlargedChartTitle('Source City Distribution'); }}>
                <img src={`${API_BASE_URL}/static/chart_source_city_distribution.png`} alt="Source City Distribution" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>3. Avg Price by Source City</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_avg_price_by_source.png'); setEnlargedChartTitle('Avg Price by Source City'); }}>
                <img src={`${API_BASE_URL}/static/chart_avg_price_by_source.png`} alt="Price by Source" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>4. Avg Price Trend by Airline</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_avg_price_by_airline.png'); setEnlargedChartTitle('Avg Price by Airline'); }}>
                <img src={`${API_BASE_URL}/static/chart_avg_price_by_airline.png`} alt="Price by Airline" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>5. Price Distribution</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_price_distribution.png'); setEnlargedChartTitle('Price Distribution'); }}>
                <img src={`${API_BASE_URL}/static/chart_price_distribution.png`} alt="Price Distribution" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>6. Model Accuracy Comparison (R²)</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_model_comparison.png'); setEnlargedChartTitle('Model Comparison (R2)'); }}>
                <img src={`${API_BASE_URL}/static/chart_model_comparison.png`} alt="Model Comparison" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>

            <div className="chart-card" style={{ gridColumn: 'span 1' }}>
              <h3>7. Feature Importance Map</h3>
              <div className="chart-img-container" onClick={() => { setEnlargedChart('chart_feature_importance.png'); setEnlargedChartTitle('Feature Importance'); }}>
                <img src={`${API_BASE_URL}/static/chart_feature_importance.png`} alt="Feature Importance" />
                <div className="zoom-overlay"><i className="fas fa-search-plus"></i></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PREDICTOR TAB */}
      {activeTab === 'predictor' && (
        <section className="predictor-hero">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src={`${API_BASE_URL}/static/cpl.mp4`} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>

          <div className="predictor-hero-content" style={{ width: '100%', maxWidth: '900px', zIndex: 2, position: 'relative' }}>
            <h2 className="section-title">FlySmart Flight Price Predictor</h2>
            
            <div className="predictor-layout">
              <div className="predictor-card">
                <form className="predictor-form" onSubmit={handlePredict}>
                  
                  {/* Source City */}
                  <div className="input-group half-width">
                    <label className="input-label">
                      <i className="fas fa-plane-departure"></i> Source City
                    </label>
                    <select 
                      className="select-input"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Departure</option>
                      <option value="DEL">Delhi (DEL)</option>
                      <option value="BOM">Mumbai (BOM)</option>
                      <option value="BLR">Bangalore (BLR)</option>
                      <option value="CCU">Kolkata (CCU)</option>
                      <option value="MAA">Chennai (MAA)</option>
                    </select>
                  </div>

                  {/* Swap button */}
                  <div className="swap-btn-container">
                    <button type="button" className="swap-btn" onClick={handleSwap}>
                      ⇄
                    </button>
                  </div>

                  {/* Destination City */}
                  <div className="input-group half-width">
                    <label className="input-label">
                      <i className="fas fa-plane-arrival"></i> Destination City
                    </label>
                    <select 
                      className="select-input"
                      value={dest}
                      onChange={(e) => setDest(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Arrival</option>
                      <option value="DEL">Delhi (DEL)</option>
                      <option value="BLR">Bangalore (BLR)</option>
                      <option value="CCU">Kolkata (CCU)</option>
                      <option value="HYD">Hyderabad (HYD)</option>
                      <option value="COK">Cochin (COK)</option>
                    </select>
                  </div>

                  {/* Journey Date */}
                  <div className="input-group half-width">
                    <label className="input-label">
                      <i className="fas fa-calendar-alt"></i> Departure Date
                    </label>
                    <input 
                      type="date"
                      className="date-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  {/* Empty column to keep grid aligned */}
                  <div className="swap-btn-container" style={{ visibility: 'hidden' }}></div>

                  {/* Departure Time */}
                  <div className="input-group half-width">
                    <label className="input-label">
                      <i className="fas fa-clock"></i> Departure Time
                    </label>
                    <input 
                      type="time"
                      className="time-input"
                      value={depTime}
                      onChange={(e) => setDepTime(e.target.value)}
                      required
                    />
                  </div>

                  {/* Info Badge */}
                  <div className="info-alert full-width">
                    <i className="fas fa-info-circle"></i>
                    Assumed duration: <b>3h (non-stop)</b> — Stops & parameters auto-generated for optimal predictions.
                  </div>

                  {/* Submit button */}
                  <div className="full-width">
                    <button type="submit" className="predict-submit-btn" disabled={loadingPredict}>
                      {loadingPredict ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Running Machine Learning Model...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-calculator"></i> Predict Flight Rates
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

              {/* Error alerts */}
              {predictError && (
                <div className="error-alert">
                  <i className="fas fa-exclamation-triangle"></i> {predictError}
                </div>
              )}

              {/* Result display */}
              {predictResults && (
                <div className="results-section">
                  <h3 className="results-header">Prediction Results</h3>
                  <p className="results-meta">
                    Route: <span>{predictResults.route}</span> &nbsp;|&nbsp; Date: <span>{predictResults.journey_date}</span>
                  </p>

                  <div className="results-list">
                    {predictResults.results.map((i, idx) => {
                      const isBest = idx === 0;
                      const isWorst = idx === predictResults.results.length - 1;
                      
                      const h = Math.floor(i.duration / 60);
                      const m = i.duration % 60;
                      const dur = `${h}h${m > 0 ? ' ' + m + 'm' : ''}`;
                      const stopsText = h <= 3 ? 'Non-stop' : '1 Stop';

                      return (
                        <div 
                          key={idx} 
                          className={`result-item ${getBrandColorClass(i.airline_name)} ${isBest ? 'best-option' : ''}`}
                        >
                          <div className="result-airline-info">
                            <div className="result-logo-container">
                              {getLogoPath(i.airline_name) ? (
                                <img src={`${API_BASE_URL}/static/${getLogoPath(i.airline_name)}`} alt={i.airline_name} />
                              ) : (
                                <span>{i.airline_name.substring(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="result-details">
                              <h4>{i.airline_name}</h4>
                              <div className="result-badges">
                                <span className="badge-duration">{dur}</span>
                                <span className="badge-stops">{stopsText}</span>
                              </div>
                            </div>
                          </div>
                          <div className="result-price-info">
                            <div className={`result-price ${isBest ? 'best-price' : ''} ${isWorst ? 'worst-price' : ''}`}>
                              ₹{Math.round(i.price).toLocaleString('en-IN')}
                            </div>
                            {isBest && <span className="tag-best">🔥 BEST VALUE</span>}
                            {isWorst && <span className="tag-worst">⚠️ EXPENSIVE</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* --- ENLARGED CHART MODAL --- */}
      {enlargedChart && (
        <div className="modal-overlay" onClick={() => setEnlargedChart(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{enlargedChartTitle}</h3>
              <button className="modal-close-btn" onClick={() => setEnlargedChart(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <img src={`${API_BASE_URL}/static/${enlargedChart}`} alt={enlargedChartTitle} />
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="footer">
        <p>&copy; 2026 Air Vista. Powered by Advanced Gradient Boosting Machine Learning.</p>
        <p>Built as a portfolio project for Data Science graduation.</p>
      </footer>
    </div>
  );
}

export default App;