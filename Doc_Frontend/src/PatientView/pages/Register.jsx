import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Address: '',
    Gender: '',
    Email: '',
    email_confirm: '',
    Contact: '',
    Username: '',
    Password: '',
    password_confirm: '',
  });

  const [message, setMessage] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);

      setMessage(
        <>
          {response.data.success || 'Registration Successful.'}{' '}
          <Link to='/Login'>Login</Link>
        </>
      );

      setPatientDetails({
        id: response.data.P_ID,
        username: response.data.Username,
        password: response.data.Password
      });

      // Clear the form
      setFormData({
        Name: '',
        Age: '',
        Address: '',
        Gender: '',
        Email: '',
        email_confirm: '',
        Contact: '',
        Username: '',
        Password: '',
        password_confirm: '',
      });
    } catch (err) {
      setPatientDetails(null);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMessages = Object.values(errorData).flat().join(', ');
        setMessage("Failed: " + errorMessages);
      } else {
        setMessage('Failed to register: Network or server error');
      }
    }
  };

  return (
    <>
      <Header />
      <div className='Register-part'>
        <div className='Register-container'>
          <h2>Patient Registration</h2>
          <form onSubmit={handleSubmit} className='Register-form'>
            {['Name', 'Age', 'Address', 'Gender', 'Email', 'email_confirm', 'Contact', 'Username', 'Password', 'password_confirm'].map(field => (
              <div key={field}>
                <h5>{field.replace('_', ' ')}</h5>
                <input className='blanks'
                  type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  placeholder={field.replace('_', ' ')}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit">Register</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
      {patientDetails && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2f1', borderRadius: '8px' }}>
          <p>🆔 ID: {patientDetails.id}</p>
          <p>👤 Username: {patientDetails.username}</p>
          <p>🔑 Password: {patientDetails.password}</p>
        </div>
      )}
      <FootSection />
    </>
  );
}

export default Register;
