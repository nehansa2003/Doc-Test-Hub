import React from 'react';
import FootSection from '../../common_view/components/footer';
import Header from '../../common_view/components/Logo _title';
import Nav_bar_1 from "../../Admin_view/components/ad_nav_bar";
import "./addings.css"
import { Link } from 'react-router-dom';
function Addings () {
   const handleClick = (form) => {
     console.log(`Cliked:${form}`); 
};
 return (
    <div>
      <Header />
      
      <main className="main-section">
        <div className="button-container">
          <Link to="/add-doctor">
          <button className="add-button">Add Doctors</button>
          </Link>
          <Link to="/add-admin">
          <button className="add-button">Add Admins</button>
          </Link>
          <Link to="/add-staff">
           <button className="add-button">Add Staff Members</button>
           </Link>
           <Link to="/add-test">
          <button className="add-button">Add Tests</button>
          </Link>
        </div>
      </main>
      <FootSection />
    </div>
  );
}


export default Addings;

