import React, { useState } from 'react';
import axios from 'axios';
import "./add-test.css";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

export default function AddTestForm() {
  const [name, setName] = useState('');
  const [payment,setPayment]=useState('');
  const [precautions, setPrecautions] = useState('');
  const [requirements, setRequirements] = useState('');
  const [timePerPerson, setTimePerPerson] = useState('');
  const [message, setMessage] = useState('');
  const [testDetails, setTestDetails] = useState(null);
  let precautionsObj = {};
  let requirementsObj = {};

if (testDetails) {
  precautionsObj = JSON.parse(testDetails.precautions);
  requirementsObj = JSON.parse(testDetails.requirements);
}

  function parseToJsonObject(text) {
   const lines = text.split('\n');
   const jsonObj = {};

   lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      jsonObj[key.trim()] = rest.join(':').trim();
    }
  });

  return jsonObj;
}
const handleSubmit = async e => {
   e.preventDefault();
    let payload = {
    Name: name,
    Precausions: parseToJsonObject(precautions),
    Requirements: parseToJsonObject(requirements),
    Time_for_one_person: parseInt(timePerPerson),
    Payment: parseFloat(payment)
  };
  
  try {
    const response = await fetch('http://127.0.0.1:8000/api/api/add_test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
     

    const result = await response.json();
    if (response.ok) {
      setTestDetails({
        id: result.Test_ID,
        precautions:JSON.stringify(result.Precausions),
        requirements:JSON.stringify(result.Requirements)
      });
      setMessage("Test added successfully");
      setName('');
      setPrecautions('');
      setRequirements('');
      setTimePerPerson('');
      setPayment('');
    } else {
      setMessage("Error: " + JSON.stringify(result));
      setTestDetails(null);
    }
  } catch (error) {
    setTestDetails(null);
     setMessage('Failed to add Test: Network or server error.');
      console.error(error); 
  }
};

return (
  <>
    <Header/>
    <form onSubmit={handleSubmit} className='add-test-form'>
      <h2>Add Medical Test</h2>
      <input type="text" placeholder="Test Name" value={name} onChange={e => setName(e.target.value)} required />
      <textarea placeholder="Precautions" value={precautions} onChange={e => setPrecautions(e.target.value)} required /><br/>
      <textarea placeholder="Requirements" value={requirements} onChange={e => setRequirements(e.target.value)} required />
      <input type="number" placeholder="Time per person (minutes)" value={timePerPerson} onChange={e => setTimePerPerson(e.target.value)} required />
      <input type="text" name="payment" placeholder="Payment" value={payment} onChange={e=>setPayment(e.target.value)}required/>
      <button type="submit">Add Test</button>
      <p>{message}</p>
    </form>
  {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2f1', borderRadius: '8px' }}>
          <p><strong>{message}</strong></p>
          {testDetails && (
            <div>
              <p>🆔<strong> Test_ID:</strong> {testDetails.id}</p>
              <p><strong>Precausions:</strong> </p>
              <ul>
                  {Object.entries(precautionsObj).map(([key, val]) => (
                  <li key={key}>{val}</li>
               ))}
              </ul>
              <p><strong>Requirements:</strong></p>
              <ul>
                {Object.entries(requirementsObj).map(([key, val]) => (
                   <li key={key}>{val}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
  <FootSection/>
  </>
  );
}