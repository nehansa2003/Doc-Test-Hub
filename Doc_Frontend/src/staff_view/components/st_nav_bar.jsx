
import "./st_nav_bar.css";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Sidebar from "./st_dashboard";

function Nav_bar_4() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="description">Staff View</div>
        </div>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/addpay">Payments</Link></li>
          <li><Link to="/addAnnoucement">Update Announcements</Link></li>
          <li><Link to="/results">Test Results</Link></li>
        </ul>
      </nav>

      {sidebarOpen && (
        <div className="sidebar-overlay">
          <Sidebar closeSidebar={toggleSidebar} />
        </div>
      )}
    </>
  );
}

export default Nav_bar_4;
