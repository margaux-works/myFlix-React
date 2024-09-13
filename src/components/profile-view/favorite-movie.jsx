// src/components/profile-view/favorite-movies.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export const FavoriteMovies = ({ movies, token }) => {
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
      })
      .catch((error) => console.error('Error removing favorite:', error));
  };

  return (
    <div>
      <h4>Your Favorite Movies</h4>
      {movies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.Title}
              <Button onClick={() => removeFavorite(movie.id)}>Remove</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
