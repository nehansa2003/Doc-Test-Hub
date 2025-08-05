import React from 'react';
import './front_navbar.css';
import { Link } from 'react-router-dom';

const Front_nav = () => (
  <div className='nav_front'>
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/termsCon">Terms & Conditions</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/search-tests">Search Tests</Link></li>
        <li><Link to="/search-doctors">Search Doctors</Link></li>
      </ul>
    </nav>
  </div>
);

export default Front_nav;
