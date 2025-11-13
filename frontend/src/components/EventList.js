import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function EventList({ userId, userEmail }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const handleRefresh = () => fetchEvents();
    document.addEventListener('refreshEvents', handleRefresh);
    return () => document.removeEventListener('refreshEvents', handleRefresh);
  }, []);

  const handleBook = async (eventId) => {
    try {
      await axios.post('http://localhost:8001/book', {
        event_id: eventId,
        user_id: userId,
        user_email: userEmail,
      });
      toast.success('Booking confirmed!');
      setEvents(events.map(event =>
        event.id === eventId ? { ...event, tickets: event.tickets - 1 } : event
      ));
    } catch (error) {
      toast.error('Error booking event');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Available Events</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(event => (
            <Card key={event.id} className="shadow hover:shadow-lg transition">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.tickets} tickets left</Card.Text>
                <Button
                  variant={event.tickets === 0 ? 'secondary' : 'primary'}
                  onClick={() => handleBook(event.id)}
                  disabled={event.tickets === 0}
                >
                  Book
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events available</p>
      )}
    </div>
  );
}

export default EventList;
