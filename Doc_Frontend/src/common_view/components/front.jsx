import React from "react";
import "./test.css";
import { useNavigate } from "react-router-dom";
import Head from "./Logo _title";
import FootSection from "./footer";
import Front_nav from "./front_navbar";

const Front = () => {
  const navigate = useNavigate();

  return (
    <>
    <Head/>
    <Front_nav/>
    <div className="front">
      <div className="left-section">
        <div className="para_1">
          Your Trusted Gateway to Seamless Consultations and Medical Tests.
        </div>
      </div>

      <div className="middle-section">
        <div className="front-left">
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide a convenient, reliable, and patient-friendly
            platform to schedule doctor appointments and medical tests at one centralized
            location. We aim to enhance healthcare accessibility by streamlining the
            booking process, ensuring timely medical care, and promoting a smooth
            experience for every user.
          </p>
        </div>

        <div className="button-container">
          <button className="login" onClick={() => navigate('/login')}>Login</button>
          <button className="register" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
    <FootSection/>
    </>
  );
};

export default Front;
