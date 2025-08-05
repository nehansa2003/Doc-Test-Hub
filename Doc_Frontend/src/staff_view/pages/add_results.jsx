import React, { useState } from 'react';
import axios from 'axios';
import "./add_results.css";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";
const UploadResult = () => {
  const [appId, setAppId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!appId || !file) {
      setMessage('Please provide both App_ID and a PDF file');
      return;
    }
const formData = new FormData();
    formData.append('App_ID', appId);
    formData.append('Result_file', file);
    formData.append('St_ID', localStorage.getItem('user_Id')); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-result/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setAppId('');
      setFile(null);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed');
    }
  };

 return (
  <>
  <Header/>
    <div>
      <h2>Upload Test Result</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label>Appointment ID:</label>
          <input type="text" value={appId} onChange={(e) => setAppId(e.target.value)} />
        </div>
        <div>
          <label>Result File (PDF):</label>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit">Upload Result</button>
      </form>
      <p>{message}</p>
    </div>
    <FootSection/>
    </>
  );
};

export default UploadResult;