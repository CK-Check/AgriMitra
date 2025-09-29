import { useState } from 'react';

const InputDashboard = () => {
  const [soilData, setSoilData] = useState({
    potassium: '',
    nitrogen: '',
    phosphorus: '',
    pH: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoilData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate Potassium (0-2000 ppm)
    if (!soilData.potassium || isNaN(soilData.potassium)) {
      newErrors.potassium = 'Potassium is required and must be a number';
    } else if (soilData.potassium < 0 || soilData.potassium > 2000) {
      newErrors.potassium = 'Potassium must be between 0-2000 ppm';
    }

    // Validate Nitrogen (0-500 ppm)
    if (!soilData.nitrogen || isNaN(soilData.nitrogen)) {
      newErrors.nitrogen = 'Nitrogen is required and must be a number';
    } else if (soilData.nitrogen < 0 || soilData.nitrogen > 500) {
      newErrors.nitrogen = 'Nitrogen must be between 0-500 ppm';
    }

    // Validate Phosphorus (0-200 ppm)
    if (!soilData.phosphorus || isNaN(soilData.phosphorus)) {
      newErrors.phosphorus = 'Phosphorus is required and must be a number';
    } else if (soilData.phosphorus < 0 || soilData.phosphorus > 200) {
      newErrors.phosphorus = 'Phosphorus must be between 0-200 ppm';
    }

    // Validate pH (0-14)
    if (!soilData.pH || isNaN(soilData.pH)) {
      newErrors.pH = 'pH is required and must be a number';
    } else if (soilData.pH < 0 || soilData.pH > 14) {
      newErrors.pH = 'pH must be between 0-14';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Soil Data Submitted:', soilData);
      alert('Soil data submitted successfully!');
      // Here you can add logic to send data to your backend or process it further
    }
  };

  const handleReset = () => {
    setSoilData({
      potassium: '',
      nitrogen: '',
      phosphorus: '',
      pH: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Soil Analysis Dashboard</h2>
        <p className="text-gray-600">Enter your soil test results to get recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Potassium Input */}
        <div className="space-y-2">
          <label htmlFor="potassium" className="block text-sm font-medium text-gray-700">
            Potassium (K) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={soilData.potassium}
              onChange={handleInputChange}
              placeholder="Enter potassium level (0-2000 ppm)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.potassium ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              max="2000"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              ppm
            </span>
          </div>
          {errors.potassium && (
            <p className="text-red-500 text-sm">{errors.potassium}</p>
          )}
        </div>

        {/* Nitrogen Input */}
        <div className="space-y-2">
          <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700">
            Nitrogen (N) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="nitrogen"
              name="nitrogen"
              value={soilData.nitrogen}
              onChange={handleInputChange}
              placeholder="Enter nitrogen level (0-500 ppm)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.nitrogen ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              max="500"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              ppm
            </span>
          </div>
          {errors.nitrogen && (
            <p className="text-red-500 text-sm">{errors.nitrogen}</p>
          )}
        </div>

        {/* Phosphorus Input */}
        <div className="space-y-2">
          <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700">
            Phosphorus (P) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="phosphorus"
              name="phosphorus"
              value={soilData.phosphorus}
              onChange={handleInputChange}
              placeholder="Enter phosphorus level (0-200 ppm)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.phosphorus ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              max="200"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              ppm
            </span>
          </div>
          {errors.phosphorus && (
            <p className="text-red-500 text-sm">{errors.phosphorus}</p>
          )}
        </div>

        {/* pH Input */}
        <div className="space-y-2">
          <label htmlFor="pH" className="block text-sm font-medium text-gray-700">
            pH Level <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="pH"
              name="pH"
              value={soilData.pH}
              onChange={handleInputChange}
              placeholder="Enter pH level (0-14)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.pH ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              max="14"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              pH
            </span>
          </div>
          {errors.pH && (
            <p className="text-red-500 text-sm">{errors.pH}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Analyze Soil
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Information Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Soil Analysis Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Potassium (K):</strong> Essential for plant growth and disease resistance</li>
          <li>• <strong>Nitrogen (N):</strong> Promotes leaf and stem growth</li>
          <li>• <strong>Phosphorus (P):</strong> Important for root development and flowering</li>
          <li>• <strong>pH:</strong> Affects nutrient availability (6.0-7.0 is ideal for most crops)</li>
        </ul>
      </div>
    </div>
  );
};

export default InputDashboard;
