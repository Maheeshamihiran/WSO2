import React from 'react';
import './Announcement.css';

const Announcement = () => {
  const announcements = [
    {
      id: 1,
      date: '2024-01-20',
      title: '🌪️ Cyclone Warning System Enhanced',
      content: 'Our new AI-powered cyclone tracking system now provides 72-hour advance warnings with 95% accuracy for the Indian Ocean region.',
      priority: 'high'
    },
    {
      id: 2,
      date: '2024-01-18',
      title: '📱 Mobile Weather Alerts Upgraded',
      content: 'Real-time push notifications now include detailed safety recommendations and evacuation routes for severe weather events.',
      priority: 'medium'
    },
    {
      id: 3,
      date: '2024-01-15',
      title: '🌊 Tsunami Early Warning Integration',
      content: 'We have integrated with the Pacific Tsunami Warning Center to provide immediate alerts for coastal areas.',
      priority: 'high'
    },
    {
      id: 4,
      date: '2024-01-12',
      title: '🌡️ Temperature Monitoring Expansion',
      content: 'Added 500 new weather stations across South Asia for more accurate local temperature and humidity readings.',
      priority: 'low'
    },
    {
      id: 5,
      date: '2024-01-10',
      title: '⚡ Lightning Detection Network',
      content: 'New lightning detection sensors provide real-time strike locations with precision up to 100 meters.',
      priority: 'medium'
    }
  ];

  return (
    <div className="announcement-container">
      <h1>Announcements</h1>
      <div className="announcements-list">
        {announcements.map(announcement => (
          <div key={announcement.id} className={`announcement-card ${announcement.priority}`}>
            <div className="announcement-header">
              <div className="announcement-date">{announcement.date}</div>
              <span className={`priority-badge ${announcement.priority}`}>
                {announcement.priority.toUpperCase()}
              </span>
            </div>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;