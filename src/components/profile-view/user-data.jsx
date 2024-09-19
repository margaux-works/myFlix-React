// src/components/profile-view/user-data.jsx
import React from 'react';

export const UserData = ({ user }) => {
  return (
    <div className="user-data">
      <h4>Personal Information</h4>
      <p>
        <strong>Username:</strong> {user.Username}
      </p>
      <p>
        <strong>Email:</strong> {user.Email}
      </p>
      <p>
        <strong>Birthday:</strong>{' '}
        {new Date(user.Birthday).toLocaleDateString()}
      </p>
    </div>
  );
};
