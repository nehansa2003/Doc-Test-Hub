import React, { useState, useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

function DoctorAppointment() {
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [cost, setCost] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);
  const [weekDates, setWeekDates] = useState([]);

  // Dynamically generate next 7 dates
  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(today.getDate() + i);
      dates.push(nextDay.toISOString().split("T")[0]);
    }
    setWeekDates(dates);
  }, []);

  // Fetch available specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/api/getDoctors");
        const data = await response.json();
        if (Array.isArray(data.specializations)) {
          setSpecializationList(data.specializations);
        }
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };
    fetchSpecializations();
  }, []);

  // Fetch doctors based on selected specialization
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!specialization) return;
      try {
        const response = await fetch("http://127.0.0.1:8000/api/api/getDoctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ specialization }),
        });

        const data = await response.json();
        if (data.success && data.doctor_info) {
          setFilteredDoctors(data.doctor_info);
          setDoctor("");
          setCost("");
        } else {
          setFilteredDoctors([]);
          setDoctor("");
          setCost("");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setFilteredDoctors([]);
        setDoctor("");
        setCost("");
      }
    };

    fetchDoctors();
  }, [specialization]);

  // Set cost based on selected doctor
  useEffect(() => {
    if (doctor && filteredDoctors.length > 0) {
      const selectedDoctor = filteredDoctors.find((doc) => doc.id === (doctor));
      setCost(selectedDoctor ? selectedDoctor.payment : "");
    } else {
      setCost("");
    }
  }, [doctor, filteredDoctors]);

  const fetchAvailableSlots = async () => {
    if (!doctor || !date) return;
    try {
      const url = `http://127.0.0.1:8000/api/api/DocBook/?doctor_id=${doctor}&date=${date}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success && data.available_slots) {
        setAvailableSlots(data.available_slots);
        setCost("Rs "+data.consultation_fee)
      } else {
        setAvailableSlots(["no channeling on the day"]);
        setCost("");
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setAvailableSlots([]);
      setCost("");
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (specialization && doctor && date) {
      await fetchAvailableSlots();
      setShowPopup(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem('user_Id');
    try {
      const response = await fetch("http://127.0.0.1:8000/api/api/createDocAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor:doctor,
          patient: patientId,
          date:date,
          time:timeSlot,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowPopup(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert("Booking failed. Please try again.");
        console.log("Error:",result);
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-vh-100 px-4 py-5 d-flex flex-column align-items-center justify-content-start"
        style={{ background: "linear-gradient(135deg, #e8f5e9, #c8e6c9, #f5f5f5)" }}>
        
        {success && (
          <div className="alert alert-success text-center w-100 text-dark fw-bold shadow">
            ✅ Doctor Appointment Booked Successfully!
          </div>
        )}

        <div className="card shadow-lg p-4" style={{
          width: "100%", maxWidth: "700px", backgroundColor: "rgba(255, 255, 255, 0.95)", borderRadius: "1rem"
        }}>
          <h3 className="text-center text-success fw-bold mb-4">Book Doctor Appointment</h3>

          {!showPopup && (
            <form onSubmit={handleNext}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-success">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  list="specializations"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
                <datalist id="specializations">
                  {specializationList.map((spec, i) => (
                    <option key={i} value={spec} />
                  ))}
                </datalist>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-success">Doctor</label>
                <select
                  className="form-select"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                >
                  <option value="">-- Select a doctor --</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-success">Select Date</label>
                <select
                  className="form-select"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                >
                  <option value="">-- Select a date --</option>
                  {weekDates.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="text-center">
                <button className="btn btn-success px-5">Next</button>
              </div>
            </form>
          )}

          {showPopup && (
            <form onSubmit={handleSubmit}>
              <h5 className="text-center text-success mb-3">Select Time & Confirm Cost</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold text-success">Time Slot</label>
                <select
                  className="form-select"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                >
                  <option value="">-- Choose a time --</option>
                  {availableSlots.length > 0
                    ? availableSlots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))
                    : <option disabled>No available slots</option>
                  }
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-success">Consultation Fee</label>
                <input
                  type="text"
                  className="form-control"
                  value={cost}
                  disabled
                  style={{ backgroundColor: "#e8f5e9", color: "#1b5e20" }}
                />
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

export default DoctorAppointment;
