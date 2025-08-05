import React from "react";
import "./Pa_nav_bar.css";
import Sidebar from "./pa_dashboard";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import { Link } from 'react-router-dom';
function Nav_bar_3(){
    const [sidebarOpen, setSidebarOpen]=useState(false);
      const toggleSidebar=()=>{
       setSidebarOpen(!sidebarOpen);
      };
     return(
       <div class="nav_full"> 
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-button" onClick={toggleSidebar}>
                ☰
          </button>
                <div className="description">Patient View</div>
            </div>
            <ul className="navbar-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/announcements">Announcements</Link></li>
                <li><Link to="/MyBooking">My Bookings</Link></li>
                <li><Link to="/channelDoc">Channel a Doctor</Link></li>
                <li><Link to="/testBook">Schedule a Test</Link></li>
            </ul>
        </nav>
        {sidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
       </div>
     );
};
export default Nav_bar_3; 
