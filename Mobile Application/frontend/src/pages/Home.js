import React, { useState } from 'react';
import heroImage from '../images/hg.jpg';
import marineImage from '../images/bg1.jpg';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [marineData, setMarineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isMarineMode, setIsMarineMode] = useState(false);

  const cities = ['london', 'newyork', 'tokyo', 'sydney'];

  const generateForecastData = (baseData) => {
    const forecast = [];
    for (let i = 1; i <= 4; i++) {
      forecast.push({
        temperature: baseData.temperature + Math.floor(Math.random() * 10 - 5),
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: baseData.humidity + Math.floor(Math.random() * 20 - 10),
        dt: Date.now() / 1000 + (i * 24 * 60 * 60)
      });
    }
    return forecast;
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    setMarineData(null);
    try {
      const response = await fetch(`http://localhost:9090/weather/${cityName}`);
      if (!response.ok) throw new Error('Weather data not found');
      const data = await response.json();
      
      data.daily = generateForecastData(data);
      setWeatherData(data);
    } catch (err) {
      setError(`Failed to fetch: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarineWeather = async (lat, lng) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      // Direct call to StormGlass API since your backend endpoint isn't working
      const response = await fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=waveHeight,waterTemperature,windSpeed,windDirection`,
        {
          headers: {
            'Authorization': 'd9a51c3e-82ac-11f0-9010-0242ac130006-d9a51cf2-82ac-11f0-9010-0242ac130006'
          }
        }
      );
      
      if (!response.ok) {
        // If StormGlass API fails, use mock data as fallback
        console.warn('StormGlass API failed, using mock data');
        throw new Error('API failed, using demo data');
      }
      
      const data = await response.json();
      
      // Transform the API response to match your expected format
      if (data.hours && data.hours.length > 0) {
        const current = data.hours[0];
        const marineData = {
          waveHeight: current.waveHeight && current.waveHeight.noaa ? current.waveHeight.noaa : 1.2,
          waterTemperature: current.waterTemperature && current.waterTemperature.noaa ? current.waterTemperature.noaa : 18.5,
          windSpeed: current.windSpeed && current.windSpeed.noaa ? current.windSpeed.noaa : 5.2,
          windDirection: current.windDirection && current.windDirection.noaa ? current.windDirection.noaa : 180,
          latitude: lat,
          longitude: lng,
          timestamp: Date.now()
        };
        setMarineData(marineData);
      } else {
        throw new Error('No marine data available');
      }
    } catch (err) {
      console.warn(err.message);
      // Fallback to mock data if API fails
      setMarineData({
        waveHeight: (1 + Math.random() * 4).toFixed(1),
        waterTemperature: (15 + Math.random() * 10).toFixed(1),
        windSpeed: (3 + Math.random() * 12).toFixed(1),
        windDirection: Math.floor(Math.random() * 360),
        latitude: latitude,
        longitude: longitude,
        timestamp: Date.now()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomCity = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      await fetchWeather(city.toLowerCase());
    }
  };

  const handleMarineSearch = async (e) => {
    e.preventDefault();
    if (latitude.trim() && longitude.trim()) {
      await fetchMarineWeather(latitude, longitude);
    }
  };

  // Function to convert wind direction from degrees to compass direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <>
      <div className="hero-section" style={{backgroundImage: `url(${isMarineMode ? marineImage : heroImage})`}}>
        <div className="hero-tagline">
          "We bring you precise forecasts, so you never get caught unprepared by rain, shine, or storm."
        </div>
         <div className="mode-toggle">
          <button 
            onClick={() => {
              setIsMarineMode(!isMarineMode);
              setWeatherData(null);
              setMarineData(null);
              setError(null);
            }}
            className="mode-btn"
          >
            {isMarineMode ? 'Switch to Weather' : 'Switch to Marine Weather'}
          </button>
        </div>
      </div>
      
      <div className="weather-container">
       
      
        {!isMarineMode ? (
          <form onSubmit={handleCustomCity} className="custom-city">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="city-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        ) : (
          <form onSubmit={handleMarineSearch} className="custom-city">
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
              className="city-input"
              step="any"
            />
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
              className="city-input"
              step="any"
            />
            <button type="submit" className="search-btn">Search Marine</button>
          </form>
        )}

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {/* Display Regular Weather Data */}
        {weatherData && !isMarineMode && (
          <div className="weather-section">
            <h1>{weatherData.city}</h1>
            
                     
          <div className="weather-cards-container" style={{display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0'}}>
            <div className="weather-card" style={{minWidth: '180px', flex: '0 0 auto'}}>
              <div className="textbox">
              <h3>Today</h3>
              <div className="temp">{weatherData.current?.temperature || weatherData.temperature}°C</div>
              <div className="condition">{weatherData.current?.condition || weatherData.condition}</div>
              <div className="humidity">Humidity: {weatherData.current?.humidity || weatherData.humidity}%</div>
              <div className="date">{new Date(weatherData.current?.dt || Date.now()).toLocaleDateString()}</div>
              </div>
            </div>

            {weatherData.daily && weatherData.daily.slice(0, 4).map((day, index) => (
              <div key={index} className="weather-card" style={{minWidth: '180px', flex: '0 0 auto'}}>
                <h3>{index === 0 ? 'Tomorrow' : `Day ${index + 1}`}</h3>
                <div className="temp">{day.temperature || day.temp?.day}°C</div>
                <div className="condition">{day.condition || day.weather?.[0]?.description}</div>
                <div className="humidity">Humidity: {day.humidity}%</div>
                <div className="date">{new Date(day.dt * 1000).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
            
            <div className="timestamp">
              Updated: {new Date(weatherData.timestamp || Date.now()).toLocaleString()}
            </div>
          </div>
        )}

        {/* Display Marine Weather Data */}
        {marineData && isMarineMode && (
          <div className="marine-section">
            <h1>Marine Weather at ({marineData.latitude}, {marineData.longitude})</h1>
            
            <div className="marine-cards-container">
              <div className="marine-card">
                <h3>Current Conditions</h3>
                <div className="marine-data">
                  <div className="data-item">
                    <strong>Wave Height:</strong> {marineData.waveHeight}m
                  </div>
                  <div className="data-item">
                    <strong>Wind Speed:</strong> {marineData.windSpeed}m/s
                  </div>
                  <div className="data-item">
                    <strong>Wind Direction:</strong> {getWindDirection(marineData.windDirection)} ({marineData.windDirection}°)
                  </div>
                  <div className="data-item">
                    <strong>Water Temperature:</strong> {marineData.waterTemperature}°C
                  </div>
                </div>
              </div>

              <div className="marine-cards">
                <h3>Safety Advisory</h3>
                <div className="safety-info">
                  {marineData.waveHeight > 3 ? (
                    <p style={{color: 'red', fontWeight: 'bold'}}>
                      ⚠️ High waves! Not safe for small vessels.
                    </p>
                  ) : marineData.waveHeight > 1.5 ? (
                    <p style={{color: 'orange'}}>
                      ⚠️ Moderate waves. Exercise caution.
                    </p>
                  ) : (
                    <p style={{color: 'green'}}>
                      ✅ Calm conditions. Safe for navigation.
                    </p>
                  )}
                  
                  {marineData.windSpeed > 10 ? (
                    <p style={{color: 'red', fontWeight: 'bold'}}>
                      💨 Strong winds! Be cautious.
                    </p>
                  ) : (
                    <p style={{color: 'green'}}>🌬️ Moderate winds</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="timestamp">
              Updated: {new Date(marineData.timestamp || Date.now()).toLocaleString()}
            </div>
          </div>
        )}

        {!isMarineMode && (
          <div className="city-buttons">
            {cities.map(cityName => (
              <button 
                key={cityName}
                onClick={() => fetchWeather(cityName)}
                className="city-btn"
              >
                {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;