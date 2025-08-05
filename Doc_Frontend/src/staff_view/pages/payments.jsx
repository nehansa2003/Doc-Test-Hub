import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Table, Form, Row, Col, Modal } from 'react-bootstrap';
import { BsCurrencyDollar, BsPrinter } from 'react-icons/bs';
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';

const PaymentsPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [enteredId, setEnteredId] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [received, setReceived] = useState(0);

  const handleFetch = async () => {
    try {
       const response = await axios.get(`http://127.0.0.1:8000/api/api/getPaymentDetails`, {
      params: {
        type: selectedType,
        id: enteredId
      }
    });
    setResults(response.data || []);
  } catch (error) {
    console.error('Error fetching payment data:', error);
    setResults([]);
    }
  };

  const handlePay = (payment) => {
    setCurrentPayment(payment);
    setReceived(0);
    setShowModal(true);
  };

  const handlePrint = async() => {
    
    try {
      const staffId = localStorage.getItem('user_Id');
      const dataToSend =
      selectedType === 'channel'
        ? {
            App_ID: currentPayment.id,
            Doc_payment: currentPayment.price,
            St_ID: staffId,
          }
        : {
            App_ID: currentPayment.id,
            test_payment: currentPayment.price,
            St_ID: staffId,
          };

    console.log('Sending payment data:', dataToSend);

    const url =
      selectedType === 'channel'
        ? `http://localhost:8000/api/api/save-docPayment`
        : `http://localhost:8000/api/api/save-testPayment`;

    const response = await axios.post(url, dataToSend);

    alert('🧾 Bill Printed');
    console.log(`✅ ${response.data.message}`);
    console.log(`📧 Email sent to ${currentPayment.email}`);
    setShowModal(false);       // <-- close modal
    window.location.reload(); 
  } catch (error) {
    console.error('❌ Error saving payment:', error.response?.data || error.message);
    alert('❌ Failed to save/print bill');
  };
}

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <h3 className="mb-3">💳 Payments</h3>
            <Row className="mb-3">
              <Col>
                <Button
                  variant={selectedType === 'channel' ? 'success' : 'outline-success'}
                  onClick={() => setSelectedType('channel')}
                >
                  Channel
                </Button>{' '}
                <Button
                  variant={selectedType === 'test' ? 'success' : 'outline-success'}
                  onClick={() => setSelectedType('test')}
                >
                  Test
                </Button>
              </Col>
            </Row>
            {selectedType && (
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Control
                    placeholder={selectedType === 'channel' ? 'Enter Channel ID' : 'Enter Test ID'}
                    value={enteredId}
                    onChange={(e) => setEnteredId(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button variant="dark" onClick={handleFetch}>
                    Load
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>

        {results.length > 0 && (
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Table responsive bordered hover>
                <thead className="bg-success text-white text-center">
                  <tr>
                    <th>Price</th>
                    <th>{selectedType === 'channel' ? 'Doctor' : 'Test'}</th>
                    <th>Patient</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const rows = [];
                    for (let i = 0; i < results.length; i++) {
                      const r = results[i];
                      rows.push(
                        <tr key={r.id}>
                          <td>Rs {r.price}</td>
                          <td>{selectedType === 'channel' ? r.doctor : r.test}</td>
                          <td>{r.patient}</td>
                          <td>
                            <Button variant="success" onClick={() => handlePay(r)}>
                              Pay
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                    return rows;
                  })()}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>💰 Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentPayment && (
              <>
                <p><strong>Price:</strong> Rs {currentPayment.price}</p>
                <Form.Group className="mb-3">
                  <Form.Label>Received Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={received}
                    onChange={(e) => setReceived(Number(e.target.value))}
                  />
                </Form.Group>
                <p><strong>Balance:</strong> Rs {received - currentPayment.price}</p>
                <Button variant="dark" onClick={handlePrint}>
                  <BsPrinter className="me-2" /> Print Bill
                </Button>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
      <FootSection />
    </>
  );
};

export default PaymentsPage;
