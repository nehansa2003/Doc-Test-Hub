import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Logo _title';
import FootSection from '../components/footer';
import { Table, Container } from 'react-bootstrap';

function AnnouncementTable() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/api/announcements/') // Adjust URL if needed
      .then((response) => {
        if (Array.isArray(response.data)){
        setAnnouncements(response.data);
      }else{
        console.error('API response is not an array:', response.data);
        setAnnouncements([]);
      }
  })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="text-success mb-4">📋 Latest Announcements</h2>
        <Table bordered hover responsive>
          <thead style={{ backgroundColor: '#2e7d32', color: 'white' }}>
            <tr>
              <th style={{ width: '150px' }}>Date</th>
              <th>Announcement</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#f5f5f5' }}>
            {announcements.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.Date).toLocaleString('en-GB')}</td>
                <td>{item.Content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <FootSection />
    </>
  );
}

export default AnnouncementTable;
