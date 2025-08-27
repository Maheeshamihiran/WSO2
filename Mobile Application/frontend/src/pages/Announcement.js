import React from 'react';

const Announcement = () => {
  return (
    <div className="weather-container">
      <h1>Announcements</h1>
      <div className="announcement-item">
        <h3>Service Update</h3>
        <p>Weather data is now updated every 15 minutes for better accuracy.</p>
      </div>
      <div className="announcement-item">
        <h3>New Cities Added</h3>
        <p>We've expanded our coverage to include more cities worldwide.</p>
      </div>
    </div>
  );
};

export default Announcement;