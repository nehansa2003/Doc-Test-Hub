import React from "react";
import { Link } from "react-router-dom";
import "./doc_dashboard.css";

const Sidebar = () => (
  <div className="sidebar">
    <h2>Dashboard</h2>
    <ul>
      <li><Link to="/home" className="nav-link">Home</Link></li>
      <li><Link to="/aboutus"className="nav-link">About Us</Link></li>
      <li><Link to="/announcements"className="nav-link">Announcements</Link></li>
      <li><Link to="/appointForDoc"className="nav-link">Appointments for Me</Link></li>
      <li><Link to="/searchTest"className="nav-link">Search a Medical Test</Link></li>
      <li><Link to="/privacy"className="nav-link">Privacy Policy</Link></li>
      <li><Link to="/termsCon"className="nav-link">Terms and Conditions</Link></li>
      <li><Link to="/logout"className="nav-link">Logout</Link></li>
    </ul>
  </div>
);

export default Sidebar;

    