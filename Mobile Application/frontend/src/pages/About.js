import React from 'react';
<<<<<<< HEAD
import './About.css';
import weatherVideo from '../images/weather.mp4';
import  dr from '../images/dr.jpg';
import experts from '../images/experts.jpg';
import communication from '../images/communication.jpg';
import real from '../images/real.jpg';
=======
>>>>>>> cacb93a8f4b095054d0ae631c8b397fdcd943a34

const About = () => {
  return (
    <div className="weather-container">
      <h1>About Us</h1>
<<<<<<< HEAD
      <p>We combine weather data, technology, and human insight to improve lives and businesses.</p>
      <p>We provide real-time weather data for cities around the globe.</p>
      <video src={weatherVideo} autoPlay loop muted />
      
      <div className="dr-section">
        <img src={dr} alt="Dr. Hapuarachchi" className="dr-image" />
        <div className="dr-text">
          <p>"Over our history, we have many examples of where we made a big difference, prevented injuries and the spread of disease, and saved lives outright."</p>
          <p><strong>Dr.Hapuarachchi, Founder & Executive Chairman</strong></p>
        </div>
      </div>

      <div className="feature left">
        <img src={experts} alt="Best Experts" className="feature-image" />
        <div className="feature-text">
          <h3>Best Experts</h3>
          <p>Our team includes top meteorologists and data scientists with decades of experience in weather prediction.</p>
        </div>
      </div>

      <div className="feature right">
        <div className="feature-text">
          <h3>Clear Communication</h3>
          <p>We translate complex weather data into understandable insights and actionable recommendations.</p>
        </div>
        <img src={communication} alt="Clear Communication" className="feature-image" />
      </div>

      <div className="feature left">
        <img src={real} alt="Real-Time Updates" className="feature-image" />
        <div className="feature-text">
          <h3>Real-Time Updates</h3>
          <p>Get instant notifications about changing weather conditions with our advanced monitoring systems.</p>
        </div>
      </div>
=======
      <p>Welcome to Weather Info Service - your reliable source for accurate weather information worldwide.</p>
      <p>We provide real-time weather data for cities around the globe.</p>
>>>>>>> cacb93a8f4b095054d0ae631c8b397fdcd943a34
    </div>
  );
};

export default About;