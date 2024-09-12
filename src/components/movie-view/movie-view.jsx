import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movies, getSimilarMovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = getSimilarMovies(movie);

  return (
    <div>
      <h1>{movie.title}</h1>
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
            <Col key={similarMovie.id} md={4} className="mb-4">
              <Link to={`/movies/${similarMovie.id}`}>
                <MovieCard movie={similarMovie} />
              </Link>
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
};
