import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='container-fluid'>
       <div className='row'>
       <div className='col-3'>
        <h4>WeatherWise</h4>
        <p>WeatherWise Solutions is a leading weather technology company dedicated to providing accurate, real-time weather information to users worldwide.</p>
       </div>
       <div className='col-3'>
        <h4>Quick Links</h4>
        <ul style={{listStyle: 'none', padding: 0}}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/news">News</Link></li>
        </ul>
       </div>
       <div className='col-3'>
        <h4>Contact Us</h4>
        <p><FaEnvelope style={{marginRight: '8px'}} />info@weatherwise.com</p>
        <p><FaPhone style={{marginRight: '8px'}} />+1 (555) 123-4567</p>
       </div>
       <div className='col-3'>
        <h4>Follow Us</h4>
        <div style={{display: 'flex', gap: '10px'}}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
       </div>
       </div>
       
         
         
      </div>
    </footer>
  );
};

export default Footer;