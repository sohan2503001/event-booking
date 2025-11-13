import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Event Booking System</Navbar.Brand>
          <Nav className="ms-auto">
            {user && (
              <Button variant="outline-light" onClick={() => setUser(null)}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {!user ? (
          <div className="auth-container">
            <Register setUser={setUser} />
            <Login setUser={setUser} />
          </div>
        ) : (
          <div className="main-content">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {user.username}!
            </h2>
            <EventForm refreshEvents={() => document.dispatchEvent(new Event('refreshEvents'))} />
            <EventList userId={user.id} userEmail={user.email} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
