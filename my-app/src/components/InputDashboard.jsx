import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';

const ComprehensiveDashboard = () => {
  const [formData, setFormData] = useState({
    // Soil parameters
    potassium: '',
    nitrogen: '',
    phosphorus: '',
    pH: '',
    EC: '',
    OC: '',
    
    // Climate parameters
    temperature: '',
    humidity: '',
    rainfall: '',
    solarRadiation: '',
    windSpeed: '',
    
    // Crop parameters
    cropType: '',
    plantingDate: '',
    growthStage: '',
    irrigationFreq: '',
    region: '',
    season: '',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock real-time updates for climate and irrigation
  useEffect(() => {
    const interval = setInterval(() => {
      if (results) {
        setResults(prev => ({
          ...prev,
          currentWeather: {
            ...prev.currentWeather,
            temperature: Math.floor(Math.random() * 10) + 25,
            humidity: Math.floor(Math.random() * 20) + 60,
          },
          irrigation: {
            ...prev.irrigation,
            soilMoisture: Math.floor(Math.random() * 30) + 40,
          }
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [results]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setDiseaseImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.potassium || formData.potassium < 0 || formData.potassium > 2000) {
      newErrors.potassium = 'Potassium must be between 0-2000 ppm';
    }
    if (!formData.nitrogen || formData.nitrogen < 0 || formData.nitrogen > 500) {
      newErrors.nitrogen = 'Nitrogen must be between 0-500 ppm';
    }
    if (!formData.cropType.trim()) {
      newErrors.cropType = 'Crop type is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate comprehensive ML analysis
    setTimeout(() => {
      const mockResults = {
        yieldPrediction: {
          predicted: (Math.random() * 3 + 4).toFixed(1),
          confidence: Math.floor(Math.random() * 15) + 85,
          trend: Math.random() > 0.5 ? 'increasing' : 'stable',
          historical: [3.2, 3.8, 4.1, 4.5, 4.2, 4.8].map(v => v + Math.random() * 0.5)
        },
        
        climateAlerts: [
          {
            type: 'warning',
            icon: '🌡️',
            title: 'Heat Wave Alert',
            description: 'High temperatures expected for next 5 days',
            severity: 'moderate',
            action: 'Increase irrigation frequency'
          },
          {
            type: 'info',
            icon: '🌧️',
            title: 'Rainfall Forecast',
            description: 'Light showers expected this weekend',
            severity: 'low',
            action: 'Reduce irrigation schedule'
          },
          {
            type: 'success',
            icon: '🌤️',
            title: 'Optimal Conditions',
            description: 'Perfect growing conditions for next week',
            severity: 'low',
            action: 'Maintain current practices'
          }
        ],
        
        currentWeather: {
          temperature: Math.floor(Math.random() * 10) + 25,
          humidity: Math.floor(Math.random() * 20) + 60,
          windSpeed: Math.floor(Math.random() * 10) + 5,
          uvIndex: Math.floor(Math.random() * 5) + 6
        },
        
        irrigation: {
          soilMoisture: Math.floor(Math.random() * 30) + 40,
          recommendation: Math.random() > 0.6 ? 'Increase irrigation by 20%' : 'Maintain current schedule',
          nextWatering: Math.random() > 0.5 ? 'Tomorrow morning' : 'In 2 days',
          efficiency: Math.floor(Math.random() * 20) + 75,
          weeklySchedule: [
            { day: 'Mon', amount: 25, status: 'completed' },
            { day: 'Wed', amount: 30, status: 'scheduled' },
            { day: 'Fri', amount: 25, status: 'scheduled' },
            { day: 'Sun', amount: 20, status: 'scheduled' }
          ]
        },
        
        diseaseDetection: {
          status: diseaseImage ? 'analyzed' : 'pending',
          result: diseaseImage ? {
            disease: ['Healthy', 'Leaf Spot', 'Rust', 'Blight'][Math.floor(Math.random() * 4)],
            confidence: Math.floor(Math.random() * 20) + 80,
            severity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
            treatment: 'Apply fungicide spray every 7 days',
            affectedArea: Math.floor(Math.random() * 15) + 5
          } : null
        },
        
        soilHealth: {
          overall: Math.floor(Math.random() * 25) + 70,
          nutrients: {
            nitrogen: Math.floor(Math.random() * 30) + 65,
            phosphorus: Math.floor(Math.random() * 35) + 60,
            potassium: Math.floor(Math.random() * 20) + 75
          },
          recommendations: [
            'Add organic compost to improve soil structure',
            'Consider lime application to adjust pH',
            'Implement crop rotation for better nutrient cycling'
          ]
        }
      };
      
      setResults(mockResults);
      setActiveTab('results');
      setLoading(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin-slow text-6xl mb-4">🌾</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Analyzing Your Agricultural Data</h2>
          <p className="text-green-600">Running ML models for comprehensive insights...</p>
          <div className="mt-4 w-64 bg-green-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-grow-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-yellow-50">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-green-700 mb-2">🌾 AgriMitra Comprehensive Dashboard</h1>
          <p className="text-xl text-green-900 mb-6">Complete Agricultural Intelligence Platform</p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'input'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
            >
              📊 Data Input
            </button>
            <button
              onClick={() => setActiveTab('results')}
              disabled={!results}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'results' && results
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-600 hover:bg-green-50 disabled:opacity-50'
              }`}
            >
              📈 ML Insights
            </button>
          </div>
        </div>

        {activeTab === 'input' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            {/* Input Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-green-700 mb-6">🌱 Agricultural Parameters</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Soil Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                    🧪 Soil Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-700 font-medium mb-1">
                        Potassium (K) *
                      </label>
                      <input
                        type="number"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleInputChange}
                        placeholder="0-2000 ppm"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                          errors.potassium ? 'border-red-500' : 'border-green-300'
                        }`}
                      />
                      {errors.potassium && <p className="text-red-500 text-sm mt-1">{errors.potassium}</p>}
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">
                        Nitrogen (N) *
                      </label>
                      <input
                        type="number"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleInputChange}
                        placeholder="0-500 ppm"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                          errors.nitrogen ? 'border-red-500' : 'border-green-300'
                        }`}
                      />
                      {errors.nitrogen && <p className="text-red-500 text-sm mt-1">{errors.nitrogen}</p>}
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Phosphorus (P)</label>
                      <input
                        type="number"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleInputChange}
                        placeholder="0-200 ppm"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">pH Level</label>
                      <input
                        type="number"
                        name="pH"
                        value={formData.pH}
                        onChange={handleInputChange}
                        placeholder="0-14"
                        step="0.1"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Climate Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                    🌤️ Climate Conditions
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Temperature (°C)</label>
                      <input
                        type="number"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        placeholder="15-45"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Humidity (%)</label>
                      <input
                        type="number"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleInputChange}
                        placeholder="30-90"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Rainfall (mm)</label>
                      <input
                        type="number"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleInputChange}
                        placeholder="0-2000"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Crop Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                    🌾 Crop Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Crop Type *</label>
                      <select
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                          errors.cropType ? 'border-red-500' : 'border-green-300'
                        }`}
                      >
                        <option value="">Select Crop</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="maize">Maize</option>
                        <option value="soybean">Soybean</option>
                      </select>
                      {errors.cropType && <p className="text-red-500 text-sm mt-1">{errors.cropType}</p>}
                    </div>
                    <div>
                      <label className="block text-green-700 font-medium mb-1">Growth Stage</label>
                      <select
                        name="growthStage"
                        value={formData.growthStage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 transition"
                      >
                        <option value="">Select Stage</option>
                        <option value="seedling">Seedling</option>
                        <option value="vegetative">Vegetative</option>
                        <option value="flowering">Flowering</option>
                        <option value="maturity">Maturity</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-4 rounded-lg hover:from-green-700 hover:to-green-500 transition transform hover:scale-105"
                >
                  🚀 Run Complete Analysis
                </button>
              </form>
            </div>

            {/* Disease Detection Upload */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-green-700 mb-6">🔬 Disease Detection</h2>
              
              <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="disease-upload"
                />
                <label htmlFor="disease-upload" className="cursor-pointer">
                  {diseaseImage ? (
                    <div className="space-y-4">
                      <img src={diseaseImage} alt="Uploaded crop" className="w-full h-48 object-cover rounded-lg" />
                      <p className="text-green-600 font-medium">✅ Image uploaded successfully!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📷</div>
                      <div>
                        <p className="text-lg font-medium text-gray-600">Upload Crop Image</p>
                        <p className="text-sm text-gray-500">Click to select image for disease analysis</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📋 Analysis Features</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Disease identification with 95%+ accuracy</li>
                  <li>• Severity assessment and progression prediction</li>
                  <li>• Treatment recommendations</li>
                  <li>• Prevention strategies for future crops</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && results && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Predicted Yield</p>
                    <p className="text-3xl font-bold text-green-600">{results.yieldPrediction.predicted}</p>
                    <p className="text-xs text-gray-500">tons/hectare</p>
                  </div>
                  <div className="text-3xl">📈</div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Soil Health</p>
                    <p className="text-3xl font-bold text-blue-600">{results.soilHealth.overall}%</p>
                    <p className="text-xs text-gray-500">overall score</p>
                  </div>
                  <div className="text-3xl">🌱</div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Soil Moisture</p>
                    <p className="text-3xl font-bold text-cyan-600">{results.irrigation.soilMoisture}%</p>
                    <p className="text-xs text-gray-500">current level</p>
                  </div>
                  <div className="text-3xl">💧</div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-3xl font-bold text-orange-600">{results.currentWeather.temperature}°C</p>
                    <p className="text-xs text-gray-500">real-time</p>
                  </div>
                  <div className="text-3xl">🌡️</div>
                </div>
              </div>
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Yield Prediction Analysis */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                  📈 Yield Prediction Analysis
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-lg font-semibold text-green-800">Predicted Yield</p>
                      <p className="text-3xl font-bold text-green-600">{results.yieldPrediction.predicted} tons/ha</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className="text-lg font-bold text-green-600">{results.yieldPrediction.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-medium text-gray-700">Historical Yield Trend</p>
                    <div className="flex items-end space-x-2 h-16">
                      {results.yieldPrediction.historical.map((val, idx) => (
                        <div key={idx} className="flex-1 bg-green-200 rounded-t" style={{height: `${(val/6)*100}%`}}>
                          <div className="w-full bg-green-500 rounded-t" style={{height: '20%'}}></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>6 months ago</span>
                      <span>Current</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Climate Alerts */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                  ⚠️ Climate Alerts & Weather
                </h3>
                <div className="space-y-4">
                  {results.climateAlerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{alert.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                          <p className="text-xs font-medium">Action: {alert.action}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Current Weather Conditions</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>🌡️ Temperature: {results.currentWeather.temperature}°C</div>
                      <div>💧 Humidity: {results.currentWeather.humidity}%</div>
                      <div>💨 Wind Speed: {results.currentWeather.windSpeed} km/h</div>
                      <div>☀️ UV Index: {results.currentWeather.uvIndex}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Irrigation Management */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                  💧 Smart Irrigation Management
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-cyan-800">Current Soil Moisture</span>
                      <span className="font-bold text-2xl text-cyan-600">{results.irrigation.soilMoisture}%</span>
                    </div>
                    <div className="w-full bg-cyan-200 rounded-full h-4">
                      <div 
                        className="bg-cyan-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${results.irrigation.soilMoisture}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                    <p className="text-blue-700">{results.irrigation.recommendation}</p>
                    <p className="text-sm text-blue-600 mt-2">Next watering: {results.irrigation.nextWatering}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Weekly Irrigation Schedule</h4>
                    <div className="space-y-2">
                      {results.irrigation.weeklySchedule.map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{day.day}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{day.amount}L</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              day.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {day.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Disease Detection Results */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                  🔬 Disease Detection Results
                </h3>
                {results.diseaseDetection.status === 'analyzed' ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                      <h4 className="font-semibold text-red-800">Detection Result</h4>
                      <p className="text-2xl font-bold text-red-600 my-2">
                        {results.diseaseDetection.result.disease}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Confidence: {results.diseaseDetection.result.confidence}%</div>
                        <div>Severity: {results.diseaseDetection.result.severity}</div>
                        <div>Affected Area: {results.diseaseDetection.result.affectedArea}%</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Treatment Recommendation</h4>
                      <p className="text-yellow-700">{results.diseaseDetection.result.treatment}</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Prevention Tips</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Maintain proper plant spacing for air circulation</li>
                        <li>• Apply preventive fungicide before disease onset</li>
                        <li>• Remove infected plant debris regularly</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📷</div>
                    <p className="text-gray-600">Upload a crop image to get disease analysis</p>
                  </div>
                )}
              </div>
            </div>

            {/* Soil Health Breakdown */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                🧪 Detailed Soil Health Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {Object.entries(results.soilHealth.nutrients).map(([nutrient, value]) => (
                  <div key={nutrient} className="text-center">
                    <h4 className="font-semibold text-gray-700 mb-2 capitalize">{nutrient}</h4>
                    <div className="relative w-24 h-24 mx-auto">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="48" cy="48" r="40" 
                          stroke={value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${value * 2.51} 251.2`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold">{value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Soil Improvement Recommendations</h4>
                <ul className="space-y-2">
                  {results.soilHealth.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-green-700">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-green-700 py-6 text-center text-white font-semibold">
        <p>© 2025 AgriMitra | Powered by Advanced Agricultural AI</p>
      </footer>
    </div>
  );
};

export default ComprehensiveDashboard;
