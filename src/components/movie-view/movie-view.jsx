import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

const isMovieFavorite = (user, movieId) => {
  return user.FavoriteMovies.includes(movieId);
};

export const MovieView = ({
  user,
  token,
  movies,
  getSimilarMovies,
  handleFavoriteChange,
  handleReload,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user?.FavoriteMovies?.includes(movieId) || false);
  }, [user, movieId]);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = getSimilarMovies(movie);

  const toggleFavorite = () => {
    handleFavoriteChange(movieId, !isFavorite);
    setIsFavorite(!isFavorite);

    handleReload();
  };

  return (
    <div style={{ maxWidth: '550px' }}>
      <h1>{movie.title}</h1>

      <Button
        variant={isFavorite ? 'danger' : 'success'} // Red for remove, green for add
        onClick={toggleFavorite}
        className="mb-3"
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>

      <div>
        <img src={movie.image} className="fluid" />
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Actors: </span>
        <ul>
          {movie.actors.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
      </div>
      <Link to="/">
        <Button variant="primary">Back</Button>
      </Link>
      <hr />
      <h2>Similar Movies</h2>
      <Row>
        {similarMovies.length > 0 ? (
          similarMovies.map((similarMovie) => (
            <Col key={similarMovie.id} sm={6} md={6} lg={5} className="mb-4">
              <MovieCard
                movie={similarMovie}
                user={user}
                token={token}
                handleReload={() => {}}
              />
            </Col>
          ))
        ) : (
          <p>No similar movies found.</p>
        )}
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  getSimilarMovies: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  handleFavoriteChange: PropTypes.func.isRequired,
};
