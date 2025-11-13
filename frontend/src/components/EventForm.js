import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function EventForm({ refreshEvents }) {
  const [name, setName] = useState('');
  const [tickets, setTickets] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8001/events', {
        name,
        tickets: parseInt(tickets),
      });
      toast.success('Event created!');
      setName('');
      setTickets('');
      refreshEvents();
    } catch (error) {
      toast.error('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg p-4 mb-4">
      <Card.Body>
        <Card.Title>Create Event</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Tickets Available"
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={loading}
            className="w-100"
          >
            {loading ? <Spinner size="sm" /> : 'Create Event'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EventForm;