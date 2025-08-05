import React, { useState } from "react";
import "./doc_nav_bar.css";
import { MdDashboard } from "react-icons/md";
import Sidebar from "./doc_dashboard";
import { Link } from 'react-router-dom';

function Nav_bar_2() {
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
          <div className="description">Doctor view</div>
        </div>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/announcements">Announcements</Link></li>
          <li><Link to="/appointForDoc">Appointments for Me</Link></li>
        </ul>
      </nav>
      {sidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
    </>
  );
}

export default Nav_bar_2;
