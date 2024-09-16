import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://movies-app2024-74d588eb4f3d.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>
      <Form.Group controlId="formUsername">
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-4">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4 form-button">
        Login to your account
      </Button>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </p>
    </Form>
  );
};
