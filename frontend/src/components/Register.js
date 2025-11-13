import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/register', {
        username,
        password,
        email,
      });
      toast.success('User registered! Please log in.');
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      toast.error('Error registering user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Register</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? <Spinner size="sm" /> : 'Register'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
