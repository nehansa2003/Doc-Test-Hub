import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';
import { Card, Container, Table, Spinner } from 'react-bootstrap';

export default function DoctorSlotsPage() {
  const [doctor, setDoctor] = useState(null);
  const [slotData, setSlotData] = useState({});
  const [loading, setLoading] = useState(true);
  const [docId,setUserId]=useState(null); // This could be dynamic in future

useEffect(() => {
    const userType = localStorage.getItem('user_type',);
    const storedUserId = localStorage.getItem('Doctor_Id');
    console.log('user_type:', userType);
    console.log('Stored Doctor_Id:', storedUserId);

    if (userType === 'Doctor') {
      const storedUserId = localStorage.getItem('user_Id',);
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        console.warn('Doctor ID not found in localStorage.');
        setLoading(false); 
      }
    } else {
      console.warn('Logged-in user is not a doctor.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Doctor_ID:',docId)
    if (!docId || docId === 'undefined' || docId === 'null'){
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:8000/api/api/doctors/${docId}/slots/`)
      .then(response => {
        setDoctor({
          id: response.data.doctor_id,
          name: response.data.doctor,
          specialization: response.data.specialization,
        });
        setSlotData(response.data.availability);
      })
      .catch(error => {
        console.error('Error loading doctor slots:', error);
      })
      .finally(() => setLoading(false));
  }, [docId]);

  // Style for status background
  const getCellStyle = (status) => ({
    backgroundColor: status === 'Booked' ? '#006633' : '#d3d3d3',
    color: status === 'Booked' ? '#ffffff' : '#000000',
    fontWeight: '500',
    textAlign: 'center',
  });

  return (
    <>
      <Header />
      <Container className="mt-4">
        {/* Doctor Info */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h4 className="mb-3" style={{ color: '#006633' }}>👨‍⚕ Doctor Information</h4>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : doctor ? (
              <>
                <p><strong>Doctor ID:</strong> {doctor.id}</p>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
              </>
            ) : (
              <p className="text-danger">Failed to load doctor data.</p>
            )}
          </Card.Body>
        </Card>

        {/* Availability Table */}
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h4 className="mb-3" style={{ color: '#006633' }}>📅 Slot Availability</h4>
            {loading ? (
              <Spinner animation="border" />
            ) : Object.keys(slotData).length > 0 ? (
              <Table responsive bordered>
                <thead className="table-success text-center">
                  <tr>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(slotData).map(([date, slots]) =>
                    slots.map((slot, index) => (
                      <tr key={date + index}>
                        {index === 0 && (
                          <td rowSpan={slots.length} className="text-center align-middle">
                            {date}
                          </td>
                        )}
                        <td style={getCellStyle(slot.status)}>{slot.time}</td>
                        <td style={getCellStyle(slot.status)}>{slot.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            ) : (
              <p>No slot availability data found.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <FootSection />
    </>
  );
}
