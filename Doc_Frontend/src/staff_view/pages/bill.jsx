//this page not active because web application currently not send emails or print bills 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';
import { useParams } from 'react-router-dom'; // to read paymentId from URL

function PaymentBill() {
  const { paymentId } = useParams(); // from URL like /bill/23
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    axios.get(`/api/payments/bill/${paymentId}/`)
      .then((response) => setBillData(response.data))
      .catch((error) => console.error('Error loading bill data:', error));
  }, [paymentId]);

  const handlePrint = () => window.print();
  const handleEmail = () => alert('Receipt has been emailed to the patient.');

  if (!billData) return <p className="text-center mt-5">Loading bill...</p>;

  return (
    <>
      <Header />
      <Container className="my-5" style={{ maxWidth: '700px', fontFamily: 'Segoe UI' }}>
        <Card border="success" className="shadow-sm">
          <Card.Header className="bg-success text-white text-center">
            <h3>{billData.hospitalName}</h3>
            <small>Payment Receipt</small>
          </Card.Header>

          <Card.Body>
            <Row className="mb-3">
              <Col><strong>Date & Time:</strong> {billData.dateTime}</Col>
              <Col><strong>Appointment ID:</strong> {billData.appointmentId}</Col>
            </Row>

            <Row className="mb-3">
              <Col><strong>Type:</strong> {billData.type}</Col>
              <Col>
                <strong>{billData.type === 'Channeling' ? 'Doctor' : 'Test'}:</strong> {billData.doctorOrTest}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col><strong>Patient:</strong> {billData.patientName} ({billData.patientId})</Col>
            </Row>

            <hr />
            <Row className="mb-2">
              <Col><strong>Cost:</strong> Rs. {billData.cost.toFixed(2)}</Col>
            </Row>
            <Row className="mb-2">
              <Col><strong>Received:</strong> Rs. {billData.received.toFixed(2)}</Col>
            </Row>
            <Row className="mb-3">
              <Col className="bg-success bg-opacity-10 p-2 rounded">
                <strong className="text-success">Balance:</strong> Rs. {billData.balance.toFixed(2)}
              </Col>
            </Row>

            <div className="text-center mt-4">
              <p className="text-success fw-semibold">Thank you for choosing GreenLeaf Hospital 💚</p>
            </div>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between">
            <Button variant="outline-success" onClick={handlePrint}>Print Bill</Button>
            <Button variant="success" onClick={handleEmail}>Email Receipt</Button>
          </Card.Footer>
        </Card>
      </Container>
      <FootSection />
    </>
  );
}

export default PaymentBill;
