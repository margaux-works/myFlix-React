// src/components/profile-view/profile-view.jsx
import { UserData } from './user-data';
import { EditUserForm } from './edit-user-form';
import { FavoriteMovies } from './favorite-movie';
import { DeleteProfile } from './delete-profile';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export const ProfileView = ({ user, token, onUserUpdate }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    // Fetch favorite movies from the backend using the user data
    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies);
      })
      .catch((error) =>
        console.error('Error fetching favorite movies:', error)
      );
  }, [user, token]);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
    onUserUpdate(updatedUser);
  };

  return (
    <Row className="profile-view">
      <Col md={8}>
        <h2>My Profile</h2>
        <UserData user={userData} />
        <EditUserForm
          user={userData}
          token={token}
          onUserUpdate={handleUserUpdate}
        />
        <FavoriteMovies movies={favoriteMovies} token={token} />
        <DeleteProfile user={userData} token={token} />
      </Col>
    </Row>
  );
};
