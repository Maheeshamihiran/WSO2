import React, { useState, useEffect } from 'react';
import './News.css';
import fire1 from '../images/fire (1).jpg';
import fire2 from '../images/fire (2).jpg';
import flood from '../images/flood.jpg';
import snow from '../images/snow.jpg';
import summer from '../images/summer.jpg';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const backgroundImages = [fire1, snow, summer];
  
  const getNewsImage = (imageName) => {
    const imageMap = {
      'fire (1).jpg': fire1,
      'fire (2).jpg': fire2,
      'flood.jpg': flood
    };
    console.log('Looking for image:', imageName, 'Found:', imageMap[imageName]);
    return imageMap[imageName];
  };

  useEffect(() => {
    fetchNews();
    
    // Background rotation every 7 seconds
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    
    return () => clearInterval(bgInterval);
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8081/news/list');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="weather-containesr">
        <h1>Weather News</h1>
        <div className="loading-message">
          <p>Loading latest weather news...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="weather-containers-images"
      style={{
        backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
      }}
    >
      <div className="content-overlay">
        <h1>Weather News</h1>
        {news.length === 0 ? (
          <div className="no-news-message">
            <p>No weather news available at the moment.</p>
            <p>Check back later for the latest updates!</p>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((item) => (
              <div key={item.id} className="news-item">
                {item.image && getNewsImage(item.image) && (
                  <div className="news-image">
                    <img src={getNewsImage(item.image)} alt={item.title} onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <span className="news-timestamp">
                  {new Date(item.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;