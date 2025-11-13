import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/users/${username}`);
      if (response.data.username) {
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email, // store email
        });
        toast.success('Login successful!');
      } else {
        toast.error('User not found');
      }
    } catch (error) {
      toast.error('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Login</Card.Title>
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
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? <Spinner size="sm" /> : 'Login'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
