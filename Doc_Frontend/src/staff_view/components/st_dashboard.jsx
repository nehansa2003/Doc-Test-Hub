import React from "react";
import { Link } from "react-router-dom";
import "./st_dashboard.css";
const Sidebar = () => (
  <div className="sidebar_2">
    <h2>Dashboard</h2>
    <ul>
      <li><Link to="/searchDoc" className="nav-link">Search a Doctor</Link></li>
      <li><Link to="/searchTest"className="nav-link">Search a Test</Link></li>
      <li><Link to="/addAnnoucement"className="nav-link">Update Announcements</Link></li>
      <li><Link to="/announcements"className="nav-link">Notifications</Link></li>
      <li><Link to="/addpay"className="nav-link">Payments</Link></li>
      <li><Link to="/results"className="nav-link">Test Results</Link></li>
      <li><Link to="/home"className="nav-link">Home</Link></li>
      <li><Link to="/aboutus"className="nav-link">About Us</Link></li>
      <li><Link to="/privacy"className="nav-link">Privacy Policy</Link></li>
      <li><Link to="/termsCon"className="nav-link">Terms and Conditions</Link></li>
      <li><Link to="/logout"className="nav-link">Logout</Link></li>
    </ul>
  </div>
);

export default Sidebar;
