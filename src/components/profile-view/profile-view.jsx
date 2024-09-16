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
    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const favoriteMovieIds = data.FavoriteMovies;

        // Fetch full movie details for each favorite movie ID
        const moviePromises = favoriteMovieIds.map((movieId) =>
          fetch(
            `https://movies-app2024-74d588eb4f3d.herokuapp.com/${movieId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ).then((res) => res.json())
        );

        Promise.all(moviePromises).then((movies) => {
          const favoriteMoviesFromApi = movies
            .filter((movie) => movie !== null)
            .map((movie) => ({
              id: movie._id,
              title: movie.Title,
              image: movie.ImagePath,
              director: movie.Director,
              genre: movie.Genre,
              description: movie.Description,
            }));
          setFavoriteMovies(favoriteMoviesFromApi);
        });
      })
      .catch((error) =>
        console.error('Error fetching favorite movies:', error)
      );
  }, [user, token]);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
    onUserUpdate(updatedUser);
  };

  const handleRemoveFavorite = (movieId) => {
    setFavoriteMovies(favoriteMovies.filter((movie) => movie.id !== movieId));
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
        <FavoriteMovies
          movies={favoriteMovies}
          token={token}
          user={userData}
          onRemoveFavorite={handleRemoveFavorite}
        />
        <DeleteProfile user={userData} token={token} />
      </Col>
    </Row>
  );
};
