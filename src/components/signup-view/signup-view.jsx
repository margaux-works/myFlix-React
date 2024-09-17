import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  console.log('SignupView rendered');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting signup form with data:', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    });
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://movies-app2024-74d588eb4f3d.herokuapp.com/users/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="signup-form">
      <h2>Register</h2>
      <Form.Group controlId="formUsername">
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
          placeholder="Username"
          aria-label="Username"
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-2">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Password"
          aria-label="Password"
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mt-2">
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          aria-label="Email"
        />
      </Form.Group>
      <Form.Group controlId="formBirthday" className="mt-2">
        <Form.Group controlId="formBirthday" className="mt-2">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            className="birthday-field"
          />
        </Form.Group>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="mt-3 mb-4 form-button"
        aria-label="Register"
      >
        Register
      </Button>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="signup-link">
          Login
        </Link>
      </p>
    </Form>
  );
};
