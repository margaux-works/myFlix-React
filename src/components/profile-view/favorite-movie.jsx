import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, token, user, handleReload }) => {
  return (
    <div>
      <h4>Your Favorite Movies</h4>
      {movies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col md={6} key={movie.id} className="mb-4">
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                handleReload={() => handleReload()}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
