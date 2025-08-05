import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
const FootSection=()=>{
  return (
    <div>
        
<footer>
  <div className="footer-container">
   
    <div className="footer-logo">
      <img src="new_logo.jpg" alt="Doc & Test Hub Logo"/>
      <br/>
      <p>Your gateway to seemless medical consultations and tests. </p>
      <div className="social-media">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook"></i> 
        <img src="fb.webp" alt="Fb"/> facebook</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-instagram"></i>
        <img src="instergram.jpg" alt="IG"/> instergram</a><br/>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter"></i> 
        <img src="twitter.jpg" alt="X"/> x twitter </a>
      </div>
    </div>
   
    <div className="footer-contact">
      <h3>Contact Us</h3>
      <p>Address:"Doc & Test Hub ",Medical Center,Wakwella Road,Galle.</p>
      <p>Phone:+94-123-456789 </p>
      <p>Email:info@docandtesthub.com </p>
      
    </div>
    
   
    <div className="footer-legal">
      <p><Link to="/privacy">Privacy Policy</Link> | <Link to="/termsCon">Terms & Conditions</Link> </p>
    </div>
    
  </div>
</footer>

</div>
);
};
export default FootSection;
