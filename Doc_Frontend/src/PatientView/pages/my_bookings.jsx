import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Table, Button } from 'react-bootstrap';
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem('user_Id');       // 👈 Get from localStorage
  const patientName = localStorage.getItem('name');         // 👈 Get from localStorage

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientId) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/api/appointments/${patientId}/`);
        const data = response.data;

        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        } else {
          console.error("Unexpected data format:", data);
          setAppointments([]);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleCancel = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/api/appointments/${id}/cancel/`);
      alert(`Cancel request sent for Appointment ID: ${id}`);
      setAppointments(prev => prev.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Failed to cancel appointment.');
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h4 className="mb-3" style={{ color: '#006633' }}>👩‍⚕ Patient Information</h4>
            <p><strong>Patient ID:</strong> {patientId}</p>
            <p><strong>Name:</strong> {patientName}</p> {/* 👈 show the name */}
          </Card.Body>
        </Card>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <h4 className="mb-3" style={{ color: '#006633' }}>📄 My Appointments</h4>
            <Table responsive bordered>
              <thead className="table-success text-center">
                <tr>
                  <th>Appointment ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Test / Doctor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>{appt.description}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(appt.id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <FootSection />
    </>
  );
}
