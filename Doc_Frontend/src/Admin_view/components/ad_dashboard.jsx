

import React from "react"; 
import "./ad_dashboard.css";
import { Link } from "react-router-dom"; 
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/home" className="nav-link">Home</Link></li>
        <li><Link to="/aboutus" className="nav-link">About us</Link></li>
        <li><Link to="/announcements" className="nav-link">Announcements</Link></li>
        <li><Link to="/addings" className="nav-link">Addings</Link></li>
        <li><Link to="/search-doctors" className="nav-link">Search a Doctor</Link></li>
        <li><Link to="/search-tests" className="nav-link">Search a Medical Test</Link></li>
        <li><Link to="/removings" className="nav-link">Removings</Link></li>
        <li><Link to='/reports' className="nav-link">Reports</Link></li>
        <li><Link to="/privacy" className="nav-link">Privacy Policy</Link></li>
        <li><Link to="/termsCon" className="nav-link">Terms and Conditions</Link></li>
        <li><Link to="/logout" className="nav-link">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
