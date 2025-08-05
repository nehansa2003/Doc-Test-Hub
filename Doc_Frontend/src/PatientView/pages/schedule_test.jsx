import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

function TestBooking() {
  const [testName, setTestName] = useState("");
  const [date, setDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [precautions, setPrecautions] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [backendRequirements, setBackendRequirements] = useState([]);
  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
  fetchTests();
}, []);

  useEffect(() => {
    if (showPopup) {
      // setPrecautions here only if not coming from backend
    }
  }, [showPopup]);
  async function fetchTests() {
    try {
      const res = await axios.get('http://localhost:8000/api/tests/');
        setAllTests(res.data);
      
    } catch (error) {
      console.error(error);
    }
  }
  const handleRequirementChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRequirements([...requirements, value]);
    } else {
      setRequirements(requirements.filter((r) => r !== value));
    }
  };

  const handleTestNameChange = (e) => {
    const input = e.target.value;
    setTestName(input);
    if (input) {
      const matches = allTests
        .map(test => test.Name)
        .filter(name => name.toLowerCase().includes(input.toLowerCase()));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setTestName(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem('user_Id');
    const selectedTest = allTests.find(test => test.Name === testName);
  if (!selectedTest) {
    alert("Selected test not found.");
    return;
  }
    try {
      const response = await axios.post("http://localhost:8000/api/api/testBook", {
        test_name: testName,
        test_id:selectedTest.Test_ID,
        date: date,
        time_slot: timeSlot,
        requirements: requirements,
        patient_id:patientId
      });

      if (response.status === 200 || response.status === 201) {
        setShowPopup(false);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 4000);
      }
    } catch (error) {
      console.error("Error booking test:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-vh-100 px-4 py-5 d-flex flex-column align-items-center justify-content-start"
        style={{
          background: "linear-gradient(to bottom right, #e8f5e9, #f5f5f5)",
        }}
      >
        {successMsg && (
          <div className="alert alert-success text-center w-100 text-dark fw-bold shadow">
            ✅ Test Appointment Booked Successfully!
          </div>
        )}

        <div
          className="card shadow-lg p-4"
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "white",
            borderRadius: "1rem",
          }}
        >
          <h3 className="text-center text-success fw-bold mb-4">Schedule a Medical Test</h3>

          {!showPopup && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (testName && date) {
                   const selectedDate = new Date(date);
                   const today = new Date();
                   const maxDate = new Date();
                   maxDate.setDate(today.getDate() + 90);

                   // Normalize time
                   selectedDate.setHours(0, 0, 0, 0);
                   today.setHours(0, 0, 0, 0);
                   maxDate.setHours(0, 0, 0, 0);

                   if (selectedDate < today || selectedDate > maxDate) {
                     alert("❌ Date should be within the next 90 days.");
                     return;
                  }
                   const selectedTest = allTests.find(test => test.Name === testName);
                   if (!selectedTest) {
                     alert("Selected test not found.");
                     return;
                  }
                  try {
                    const response = await axios.get("http://localhost:8000/api/api/testBook/", {
                      params:{
                      Test_ID: selectedTest.Test_ID,
                      date: date,
                      },}
                    );

                    setAvailableSlots(response.data.available_slots || []);
                    setBackendRequirements(response.data.requirements || []);
                    setPrecautions(response.data.precautions || []);
                    setRequirements([]); // clear selected
                    setTimeSlot(""); // reset slot
                    setShowPopup(true);
                  } catch (error) {
                    console.error("Failed to fetch test options:", error);
                    alert("Unable to load test details. Please try again.");
                  }
                }
              }}
            >
              <div className="mb-3 position-relative">
                <label className="form-label fw-semibold text-success">Test Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={testName}
                  onChange={handleTestNameChange}
                  required
                  placeholder="Enter test name"
                />
                {suggestions.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{ zIndex: 10 }}
                  >
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSelectSuggestion(s)}
                        style={{ cursor: "pointer" }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold text-success">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button className="btn btn-success px-5">Next</button>
              </div>
            </form>
          )}

          {showPopup && (
            <form onSubmit={handleSubmit}>
              <h5 className="text-center text-success mb-3">Choose Time & Confirm Details</h5>

              <div className="mb-3">
                <label className="form-label text-success fw-semibold">Available Time Slots</label>
                <select
                  className="form-select"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                >
                  <option value="">-- Select a time slot --</option>
                  {availableSlots.map((slot, i) => (
                    <option key={i} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
               <label className="form-label fw-semibold text-success">Requirements</label>
<div>
  {backendRequirements && typeof backendRequirements === 'object' && Object.entries(backendRequirements).map(([key, value], i) => (
    <div key={i} className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        value={key}
        onChange={handleRequirementChange}
        checked={requirements.includes(key)}
      />
      <label className="form-check-label">{key}: {value}</label>
    </div>
  ))}
</div>

<div className="mb-4">
  <label className="form-label fw-semibold text-success">Precautions</label>
  <ul className="list-group">
    {precautions && typeof precautions === 'object' && Object.entries(precautions).map(([key, value], i) => (
      <li
        key={i}
        className="list-group-item bg-light text-dark border-start border-success border-3"
      >
        <strong>{key}</strong>: {value}
      </li>
    ))}
  </ul>
</div>
 </div>

              <div className="text-center">
                <button className="btn btn-success px-5">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <FootSection />
    </>
  );
}

export default TestBooking;
