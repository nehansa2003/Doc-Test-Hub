import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card, Container } from 'react-bootstrap';
import Header from '../../common_view/components/Logo _title';
import FootSection from '../../common_view/components/footer';
import axios from 'axios';

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_BASE = 'http://localhost:8000/api/api/announcements'; // Update this to your real backend URL

  // Fetch announcements from backend
  useEffect(() => {
    axios.get(`${API_BASE}/`)
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error('Failed to load announcements', err));
  }, []);

  const handleShow = () => {
    setCurrentText('');
    setEditingIndex(null);
    setEditingId(null);
    setShowModal(true);
  };

  const handleAddOrUpdate = () => {
    const StaffId = localStorage.getItem('user_Id');
    if (currentText.trim() === '') return;

    if (editingId !== null) {
      axios.put(`http://localhost:8000/api/api/announcements/${editingId}/update/`, { Content: currentText,St_ID: StaffId })
        .then(() => {
          const updated = [...announcements];
          updated[editingIndex].Content = currentText;
          setAnnouncements(updated);
        })
        .catch(err => console.error('Update failed', err));
        
    } else {
      axios.post(`http://localhost:8000/api/api/announcements/create/`, { St_ID: StaffId, Content: currentText })
        .then(res => {
          const newAnnouncement = { A_ID: res.data.id, Text: currentText };
          setAnnouncements([...announcements, newAnnouncement]);
        })
        .catch(err => {
        console.error('Create failed', err);
        if (err.response) {
            console.error('Server response:', err.response.data);  // Shows exact error from Django
  }
});}

    setShowModal(false);
    setCurrentText('');
    setEditingIndex(null);
    setEditingId(null);
  };

  const handleEdit = (index) => {
    setCurrentText(announcements[index].Content);
    setEditingIndex(index);
    setEditingId(announcements[index].A_ID);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const id = announcements[index].A_ID;
    axios.delete(`http://localhost:8000/api/api/announcements/${id}/delete/`)
      .then(() => {
        const updated = announcements.filter((_, i) => i !== index);
        setAnnouncements(updated);
      })
      .catch(err => console.error('Delete failed', err));
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="mb-3 text-success">📢 Announcements</h2>
        <Button
          onClick={handleShow}
          style={{ backgroundColor: '#2e7d32', border: 'none' }}
        >
          + Add Announcement
        </Button>

        <div className="mt-4">
          {announcements.length === 0 ? (
            <p className="text-muted">No announcements yet.</p>
          ) : (
            announcements.map((item, index) => (
              <Card
                key={item.A_ID}
                className="mb-3 shadow-sm"
                style={{ borderLeft: '5px solid #2e7d32', backgroundColor: '#f5f5f5' }}
              >
                <Card.Body>
                  <Card.Text>{item.Content}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      style={{
                        border: '1px solid #2e7d32',
                        color: '#2e7d32',
                        backgroundColor: 'transparent',
                      }}
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        border: '1px solid #c62828',
                        color: '#c62828',
                        backgroundColor: 'transparent',
                      }}
                      size="sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-success">
              {editingIndex !== null ? 'Edit Announcement' : 'New Announcement'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="text-success">Announcement</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  placeholder="Type your announcement here..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                backgroundColor: '#9e9e9e',
                border: 'none',
                color: 'white',
              }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: '#2e7d32',
                border: 'none',
                color: 'white',
              }}
              onClick={handleAddOrUpdate}
            >
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <FootSection />
    </>
  );
}
