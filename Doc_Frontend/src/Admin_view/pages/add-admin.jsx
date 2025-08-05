import React from "react";
import axios from 'axios';
import "./add-admin.css";
import { useState } from "react";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";
export default function AddAdminForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [adminDetails, setAdminDetails] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/Admin/', {
        Name:name,
        Username:username,
        Password:password,
        Email:email,
        Contact_no:contact
      });
      setAdminDetails({
        id: res.data.Ad_ID,
        username: res.data.Username,
        password: res.data.Password
      });

      setMessage(res.data.message||"Admin added successfully.");
      setName('');
      setUsername('');
      setPassword('');
      setEmail('');
      setContact('');
    } catch (err) {
      setAdminDetails(null);
      if (err.response && err.response.data) {
        // Backend validation error
        const errorData = err.response.data;
        const errorMessages = Object.values(errorData).flat().join(', ');
        setMessage("Failed: " + errorMessages);
      } else {
        setMessage('Failed to add admin: Network or server error');
      }
    }
  };
 return (
    <>
     <Header/>
    <form onSubmit={handleSubmit}>
      <h2>Add Admin</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} required />
      <button type="submit">Add Admin</button>
      <p>{message}</p>
    </form>

          {adminDetails && (
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2f1', borderRadius: '8px' }}>
              <p>🆔 ID: {adminDetails.id}</p>
              <p>👤 Username: {adminDetails.username}</p>
              <p>🔑 Password: {adminDetails.password}</p>
            </div>
          )}
        
   <FootSection/>
  </>
  );
}