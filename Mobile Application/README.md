# Weather Application

A full-stack weather application with admin panel for news management.

## API Keys Setup

### Required API Keys

1. **OpenWeatherMap API Key**
   - Visit: https://openweathermap.org/api
   - Sign up for a free account
   - Generate an API key

2. **StormGlass API Key** (for marine weather)
   - Visit: https://stormglass.io/
   - Sign up for a free account
   - Generate an API key

### Configuration

#### Backend Configuration
1. Copy `backend/Config.example.toml` to `backend/Config.toml`
2. Replace placeholder values with your actual API keys:
   ```toml
   [weatherAPI]
   openWeatherMapKey = "your_actual_openweathermap_api_key"
   stormGlassKey = "your_actual_stormglass_api_key"
   
   [server]
   port = 9090
   ```

#### Frontend Configuration
1. Copy `frontend/.env.example` to `frontend/.env`
2. Copy `admin/.env.example` to `admin/.env`
3. Update URLs if needed (default values should work for local development)

## Running the Application

### Backend
```bash
cd backend
bal run main.bal
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Admin Panel
```bash
cd admin
npm install
npm start
```

### News Service
```bash
cd backend
bal run news_service.bal
```

## Features

- Weather forecasting for multiple cities
- Marine weather data
- Astronomical data (sunrise, sunset, moonrise, moonset)
- News management system
- Admin panel for content management

## Security Note

Never commit actual API keys to the repository. Always use the configuration files that are ignored by Git.