import React from "react";
import axios from 'axios';
import { useState } from "react";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";
export default function Doctorform(){
   const [formData, setFormData] = useState({
    name: '',
    gender: '',
    specialization: '',
    email: '',
    username:'',
    password:'',
    contact: '',
    payment:'',
    availability: {}, // Format: { Monday: { start: "16:00", end: "19:00" }, ... }
  });
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [message, setMessage] = useState('');

  const specializationOptions = [
    'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic Surgeon', 'Pediatrician',
    'Psychiatrist', 'Ophthalmologist', 'ENT Specialist', 'Gynecologist', 'General Physician',
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = day => {
    setFormData(prev => {
      const updatedAvailability = { ...prev.availability };
      if (updatedAvailability[day]) {
        delete updatedAvailability[day];
      } else {
        updatedAvailability[day] = { start: '', end: '' };
      }
      return { ...prev, availability: updatedAvailability };
    });
  };

  const handleTimeChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: { ...prev.availability[day], [field]: value },
      },
    }));
 };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/Doctor/',{
        Name: formData.name,
        Gender: formData.gender,
        Specialization: formData.specialization,
        Email: formData.email,
        Username: formData.username,
        Password: formData.password,
        Contact_no: formData.contact,
        Payment: formData.payment,
        Ch_date_time: formData.availability,
  });
  setDoctorDetails({
        id: res.data.Doc_ID,
        username: res.data.Username,
        password: res.data.Password
      });

      setMessage(res.data.message || "Doctor added successfully.");
    } catch (err){
      setDoctorDetails(null);
      if (err.response && err.response.data) {
        // Backend validation error
        const errorData = err.response.data;
        const errorMessages = Object.values(errorData).flat().join(', ');
        setMessage("Failed: " + errorMessages);
      } else {
        setMessage('Failed to add Doctor: Network or server error');
      }
    };
  };
return (
  <>
    <Header/>
    <form onSubmit={handleSubmit}>
      <h2>Add Doctor</h2>

      <input type="text" name="name" placeholder="Doctor Name" value={formData.name} onChange={handleChange} required />
     <div className="mb-3 d-flex align-items-center gap-3">
      <label className="me-3">Gender:</label>
        <br/><br/>
        <div className="form-check form-check-inline">
         <input
           className="form-check-input"
           type="radio"
           name="gender"
           id="genderMale"
           value="Male"
           onChange={handleChange}
           required />
         <label className="form-check-label" htmlFor="genderMale">
           Male
         </label>
        </div>

        <div className="form-check form-check-inline">
         <input
           className="form-check-input"
           type="radio"
           name="gender"
           id="genderFemale"
           value="Female"
           onChange={handleChange}
           required/>
         <label className="form-check-label" htmlFor="genderFemale">
           Female
         </label>
        </div>
    </div>

      
  <div>
        Specialization:
        <select name="specialization" value={formData.specialization} onChange={handleChange} required>
          <option value="">Select specialization</option>
          {specializationOptions.map((spec, idx) => (
            <option key={idx} value={spec}>{spec}</option>
          ))}
        </select>
      </div><br/>
      <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} required />
      <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
      <input type="text" name="payment" placeholder="Payment" value={formData.payment} onChange={handleChange}required/>
<div>
        <h4>Channel Days and Time:</h4>
        {weekdays.map(day => (
          <div key={day} className="mb-3">
             <div className="d-flex align-items-center gap-5"> 
            <label style={{ width: "130px", marginBottom: 0 }}>
               {day}
            </label>
              <input className="d-flex align-items-center mb-2 gap-9"
                type="checkbox"
                checked={!!formData.availability[day]}
                onChange={() => handleDayToggle(day)}
              />
          </div>
            {formData.availability[day] && (
              <div  className="d-flex flex-column ms-4 mt-1" >
                <div className="d-flex align-items-center mb-2 gap-2">
                   <span>Start</span> 
                  <input
                    type="time"
                    value={formData.availability[day].start}
                    onChange={e => handleTimeChange(day, 'start', e.target.value)}
                    required
                  />
                   
                </div>
                <div className="d-flex align-items-center gap-3">
                   <span>End </span>
                   <input
                      type="time"
                      value={formData.availability[day].end}
                      onChange={e => handleTimeChange(day, 'end', e.target.value)}
                      required
                    />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
 <button type="submit">Add Doctor</button>
      <p>{message}</p>
    </form>
  {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2f1', borderRadius: '8px' }}>
          <p><strong>{message}</strong></p>
          {doctorDetails && (
            <div>
              <p>🆔 ID: {doctorDetails.id}</p>
              <p>👤 Username: {doctorDetails.username}</p>
              <p>🔑 Password: {doctorDetails.password}</p>
            </div>
          )}
        </div>
      )}
  <FootSection/>
  </>
  );
}
