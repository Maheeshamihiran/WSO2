import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">WeatherWise</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/announcement">Announcement</Link></li>
        <li><Link to="/news">News</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;