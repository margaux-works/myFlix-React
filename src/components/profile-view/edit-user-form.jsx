// src/components/profile-view/edit-user-form.jsx
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

export const EditUserForm = ({ user, token, onUserUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState('');

  // Format the birthday when the component mounts
  useEffect(() => {
    if (user.Birthday) {
      const formattedBirthday = moment(user.Birthday).format('YYYY-MM-DD'); // Date format for input type="date"
      setBirthday(formattedBirthday);
    }
  }, [user.Birthday]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: moment(birthday, 'YYYY-MM-DD').toISOString(), // Convert back to ISO format
      Password: password ? password : undefined,
    };

    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        onUserUpdate(data);
        alert('Profile updated successfully!');
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Edit Profile</h4>
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
      <Button
        type="submit"
        variant="primary"
        className="mt-3 mb-4 form-button"
        aria-label="Register"
      >
        Update Profile
      </Button>
    </Form>
  );
};
