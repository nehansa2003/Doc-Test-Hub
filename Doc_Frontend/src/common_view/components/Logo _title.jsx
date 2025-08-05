import React from "react";
import"./Logo_title.css";
const Header=()=>{
    return(
        <div className="header">
            <div className="header-left">
                <img className="logo" src="/new_logo.jpg"/>
                <span className="logo-text">Doc & Test Hub</span>
                <br/>
                <p className="logo-text_1">Easy Appointments for Care</p>
            </div>
            <div className="header-right">
                <img src="\OIP.webp" alt="top" className="top-image"/>
            </div>
        </div>
    )
}
export default Header;