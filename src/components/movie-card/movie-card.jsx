import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movie, user, token, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // check if movie is already a favorite
  useEffect(() => {
    if (user && user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user, movie.id]);

  const handleFavoriteToggle = () => {
    const url = `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}/movies/${movie.id}`;
    const method = isFavorite ? 'DELETE' : 'PUT';

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        setIsFavorite(!isFavorite);
        onFavoriteChange(!isFavorite);
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
      <Button
        variant="primary"
        className="position-absolute top-0 end-0 m-2"
        onClick={handleFavoriteToggle}
        title={isFavorite ? 'Remove from my list' : 'Add to my list'}
        style={{
          width: '32px',
          height: '32px',
          flexShrink: '0',
          backgroundColor: '#fc4747  ',
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
  onFavoriteChange: PropTypes.func.isRequired,
};
