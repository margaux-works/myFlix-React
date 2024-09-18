import { UserData } from './user-data';
import { EditUserForm } from './edit-user-form';
import { FavoriteMovies } from './favorite-movie';
import { DeleteProfile } from './delete-profile';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export const ProfileView = ({ token, onUserUpdate }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUserData] = useState(storedUser);
  const [reload, setReload] = useState(false);

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

        const moviePromises = favoriteMovieIds.map(async (movieId) => {
          let reply = await fetch(
            `https://movies-app2024-74d588eb4f3d.herokuapp.com/${movieId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return reply.json();
        });

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
          console.log('set new list of movies', favoriteMoviesFromApi);
          setFavoriteMovies(favoriteMoviesFromApi);
        });
      })
      .catch((error) =>
        console.error('Error fetching favorite movies:', error)
      );
  }, [user, token, reload]);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
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
      />
      <DeleteProfile user={user} token={token} />
    </Row>
  );
};
