import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie.director);
  console.log(movie.genre);
  return (
    <div>
      <h1>
        <span>{movie.title}</span>
      </h1>
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
      <Button onClick={onBackClick} variant="primary">
        Back
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
