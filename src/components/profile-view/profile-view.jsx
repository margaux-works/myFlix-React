import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { UserData } from './user-data';
import { EditUserForm } from './edit-user-form';
import { FavoriteMovies } from './favorite-movie';
import { DeleteProfile } from './delete-profile';

export const ProfileView = ({ movies, user, token, onUserUpdate }) => {
  const [reload, setReload] = useState(false);

  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

  const handleUserUpdate = (updatedUser) => {
    onUserUpdate(updatedUser);
  };

  return (
    <Row className="profile-view">
      <h2>My Profile</h2>
      <Col md={6}>
        <UserData user={user} />
      </Col>
      <Col md={6}>
        <EditUserForm
          user={user}
          token={token}
          onUserUpdate={handleUserUpdate}
        />
      </Col>
      <FavoriteMovies
        movies={favoriteMovies}
        token={token}
        user={user}
        handleReload={() => {
          setReload(!reload);
        }}
        setUser={onUserUpdate}
      />
      <DeleteProfile user={user} token={token} />
    </Row>
  );
};
