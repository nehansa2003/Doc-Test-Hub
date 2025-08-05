import React, { useState } from 'react';
import axios from 'axios';
import "./add-staff.css";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

export default function AddStaffForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
try {
      const res = await axios.post('http://127.0.0.1:8000/api/Staff/', {
        Name:name,
        Role:role,
        Username:username,
        Password:password,
        Email:email,
        Contact_no:contact
      });

      setStaffDetails({
        id: res.data.St_ID,
        username: res.data.Username,
        password: res.data.Password
      });

      setMessage(res.data.message||"Staff added successfully.");
      setName('');
      setRole('');
      setUsername('');
      setPassword('');
      setEmail('');
      setContact('');
    } catch (err) {
      setStaffDetails(null);
      if (err.response && err.response.data) {
        // Backend validation error
        const errorData = err.response.data;
        const errorMessages = Object.values(errorData).flat().join(', ');
        setMessage("Failed: " + errorMessages);
      } else {
        setMessage('Failed to add staff: Network or server error');
      }
    }
  };
  return (
    <>
     <Header/>
    <form onSubmit={handleSubmit}>
      <h2>Add Staff Member</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} required />
      <button type="submit">Add Staff</button>
      <p>{message}</p>
    </form>
   
      {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2f1', borderRadius: '8px' }}>
          <p><strong>{message}</strong></p>
          {staffDetails && (
            <div>
              <p>🆔 ID: {staffDetails.id}</p>
              <p>👤 Username: {staffDetails.username}</p>
              <p>🔑 Password: {staffDetails.password}</p>
            </div>
          )}
        </div>
      )}
   <FootSection/>
   </>
  );
}