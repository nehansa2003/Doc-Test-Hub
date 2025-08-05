import React, { useState } from "react";
import "./ad_nav_bar.css";
import { MdDashboard } from "react-icons/md";
import Sidebar from "./ad_dashboard";
import { Link } from 'react-router-dom';


function Nav_bar_1() {
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
          <div className="description">Admin View</div>
        </div>
        <ul className="navbar-links">


           <li><Link to="/aboutus">About Us</Link></li>

          <li><Link to="/announcements">Announcements</Link></li>
          <li><Link to="/addings">Addings</Link></li>
        </ul>
      </nav>

      {sidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}

      {/* <div className="page-content">
        <button>Button One</button>
        <button>Button Two</button>
      </div> */}
    </>
  );
}

export default Nav_bar_1;
