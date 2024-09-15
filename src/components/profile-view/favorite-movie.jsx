import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, token, user, onRemoveFavorite }) => {
  const removeFavorite = (movieId) => {
    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert('Movie removed from favorites');
        onRemoveFavorite(movieId);
      })
      .catch((error) => console.error('Error removing favorite:', error));
  };

  return (
    <div>
      <h4>Your Favorite Movies</h4>
      {movies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col md={4} key={movie.id} className="mb-4">
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                isFavorite={true}
                onFavoriteChange={() => onRemoveFavorite(movie.id)}
              />
              <Button
                variant="danger"
                onClick={() => removeFavorite(movie.id)}
                className="mt-2"
              >
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
