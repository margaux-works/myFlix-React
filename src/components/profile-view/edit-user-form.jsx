// src/components/profile-view/edit-user-form.jsx
import { useState } from 'react';

export const EditUserForm = ({ user, token, onUserUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: birthday,
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
    <form onSubmit={handleSubmit}>
      <h4>Edit Profile</h4>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};
