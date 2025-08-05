import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BsDownload } from 'react-icons/bs';
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

export default function PaymentResultReport() {
  const [doctorPayments, setDoctorPayments] = useState([]);
  const [testPayments, setTestPayments] = useState([]);
  const [testResults, setTestResults] = useState([]);

  // Fetch data from backend APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docPayRes, testPayRes, resultRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/api/doctor-payments/'),
          fetch('http://127.0.0.1:8000/api/api/test-payments/'),
          fetch('http://127.0.0.1:8000/api/api/test-results/'),
        ]);

        const [doctorData, testData, resultData] = await Promise.all([
          docPayRes.json(),
          testPayRes.json(),
          resultRes.json(),
        ]);

        setDoctorPayments(doctorData);
        setTestPayments(testData);
        setTestResults(resultData);
      } catch (err) {
        console.error('Failed to fetch payment/result data:', err);
      }
    };

    fetchData();
  }, []);

  // Generate PDF Reports
  const generateDoctorPaymentsPDF = () => {
    const doc = new jsPDF('landscape');
    doc.setFontSize(14).text('Doctor Payments Report – 2025', 14, 15);
    doc.setFontSize(11).text('(Completed Doctor Payments)', 14, 22);

    autoTable(doc, {
      startY: 28,
      head: [['Appointment ID', 'Payment Amount', 'Date & Time', 'Processed By']],
      body: doctorPayments.map(p => [
       p.App_ID,      
         `Rs ${Number(p.Doc_payment).toFixed(2)}`,
         `${new Date(p.date_time).toLocaleString('en-GB')}`,
       p.St_ID,    
      ]),
      styles: { fontSize: 9, cellPadding: 2, valign: 'top' },
      headStyles: { fillColor: [0, 102, 51], textColor: 255, halign: 'center' },
      theme: 'grid',
    });

    doc.save('doctor_payments_report.pdf');
  };

  const generateTestPaymentsPDF = () => {
    const doc = new jsPDF('landscape');
    doc.setFontSize(14).text('Test Payments Report – 2025', 14, 15);
    doc.setFontSize(11).text('(Completed Test Payments)', 14, 22);

    autoTable(doc, {
      startY: 28,
      head: [['Appointment ID', 'Payment Amount', 'Date & Time', 'Processed By']],
      body: testPayments.map(p => [
        p.App_ID,
        `Rs ${Number(p.test_payment).toFixed(2)}`,
        `${new Date(p.date_time).toLocaleString('en-GB')}`,
        p.St_ID,
      ]),
      styles: { fontSize: 9, cellPadding: 2, valign: 'top' },
      headStyles: { fillColor: [0, 102, 51], textColor: 255, halign: 'center' },
      theme: 'grid',
    });

    doc.save('test_payments_report.pdf');
  };

  const generateTestResultsPDF = () => {
    const doc = new jsPDF('landscape');
    doc.setFontSize(14).text('Test Results Report – 2025', 14, 15);
    doc.setFontSize(11).text('(Completed Test Results)', 14, 22);

    autoTable(doc, {
      startY: 28,
      head: [['Appointment ID', 'Result File', 'Date & Time', 'Processed By']],
      body: testResults.map(r => [
        r.App_ID,
        r.Result_file.split('/').pop(),
        `${new Date(r.date_time).toLocaleString('en-GB')}`,
        r.St_ID,
      ]),
      styles: { fontSize: 9, cellPadding: 2, valign: 'top' },
      headStyles: { fillColor: [0, 102, 51], textColor: 255, halign: 'center' },
      theme: 'grid',
    });

    doc.save('test_results_report.pdf');
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        {/* Doctor Payments */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-0">👨‍⚕ Doctor Payments</h4>
                <p className="text-muted mb-0">List of completed doctor payments</p>
              </div>
              <Button onClick={generateDoctorPaymentsPDF} style={{ backgroundColor: '#006633', border: 'none' }}>
                <BsDownload className="me-2" />
                Download PDF
              </Button>
            </div>
            <Table responsive bordered hover striped className="mb-0">
              <thead className="table-success">
                <tr>
                  <th>Appointment ID</th>
                  <th>Payment Amount</th>
                  <th>Date & Time</th>
                  <th>Processed By(Staff_ID)</th>
                </tr>
              </thead>
              <tbody>
                {doctorPayments.map((p) => (
                  <tr key={p.App_ID}>
                    <td>{p.App_ID}</td>
                    <td>Rs {Number(p.Doc_payment).toFixed(2)}</td>
                    <td>{new Date(p.date_time).toLocaleString('en-GB')}</td>
                    <td>{p.St_ID}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Test Payments */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-0">🧪 Test Payments</h4>
                <p className="text-muted mb-0">List of completed test payments</p>
              </div>
              <Button onClick={generateTestPaymentsPDF} style={{ backgroundColor: '#006633', border: 'none' }}>
                <BsDownload className="me-2" />
                Download PDF
              </Button>
            </div>
            <Table responsive bordered hover striped className="mb-0">
              <thead className="table-success">
                <tr>
                  <th>Appointment ID</th>
                  <th>Payment Amount</th>
                  <th>Date & Time</th>
                  <th>Processed By(Staff_ID)</th>
                </tr>
              </thead>
              <tbody>
                {testPayments.map((p) => (
                  <tr key={p.App_ID}>
                    <td>{p.App_ID}</td>
                    <td>Rs {Number(p.test_payment).toFixed(2)}</td>
                    <td>{new Date(p.date_time).toLocaleString('en-GB')}</td>
                    <td>{p.St_ID}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Test Results */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-0">📄 Test Results</h4>
                <p className="text-muted mb-0">List of completed test results</p>
              </div>
              <Button onClick={generateTestResultsPDF} style={{ backgroundColor: '#006633', border: 'none' }}>
                <BsDownload className="me-2" />
                Download PDF
              </Button>
            </div>
            <Table responsive bordered hover striped className="mb-0">
              <thead className="table-success">
                <tr>
                  <th>Appointment ID</th>
                  <th>Result File</th>
                  <th>Date & Time</th>
                  <th>Processed By(Staff_ID)</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((p) => (
                  <tr key={p.App_ID}>
                    <td>{p.App_ID}</td>
                    <td>{p.Result_file.split('/').pop()}</td>
                    <td>{new Date(p.date_time).toLocaleString('en-GB')}</td>
                    <td>{p.St_ID}</td>
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
