import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user?.FavoriteMovies?.includes(movie.id)
  );

  // check if movie's ID exist in the user's list of fav movie. if yes, set to true. if not, set to false.
  useEffect(() => {
    setIsFavorite(user?.FavoriteMovies?.includes(movie.id) || false);
  }, [user, movie.id]);

  const handleFavoriteToggle = () => {
    const method = isFavorite ? 'DELETE' : 'PUT';
    const url = `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}/movies/${movie.id}`;

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((updateUser) => {
        setIsFavorite(!isFavorite);
        setUser(updateUser);
      })
      .catch((error) => console.error('Error updating favorite movie:', error));
  };

  return (
    <Card
      className="h-100"
      style={{
        width: '14rem',
        backgroundColor: '#161D2F',
      }}
    >
      <Card.Img variant="top" src={movie.image} />

      {/* Favorite button wrapper and tooltip */}
      <div className="favorite-button-wrapper position-absolute top-0 end-0 m-2">
        {/* Favorite button */}
        <Button
          variant="primary"
          className="favorite-btn"
          onClick={handleFavoriteToggle}
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#fc4747',
            opacity: '0.7',
            border: 'none',
            borderRadius: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isFavorite ? (
            <i
              className="bi bi-check-circle favorite-icon"
              style={{ color: '#ffffff' }}
            ></i>
          ) : (
            <i
              className="bi bi-plus-circle favorite-icon"
              style={{ color: '#ffffff' }}
            ></i>
          )}
        </Button>

        {/* Tooltip */}
        <div className="favorite-tooltip">
          {isFavorite ? 'Remove from my list' : 'Add to my list'}
        </div>
      </div>

      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.director ? movie.director.Name : 'Unknown Director'}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">See more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }),
  token: PropTypes.string.isRequired,
  handleReload: PropTypes.func,
};
