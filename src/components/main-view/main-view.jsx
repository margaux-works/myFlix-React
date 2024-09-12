import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Logo } from '../logo';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://movies-app2024-74d588eb4f3d.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          director: movie.Director,
          genre: movie.Genre,
          description: movie.Description,
          actors: movie.Actors || [],
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [token]);

  if (!user) {
    return (
      <Row
        className="justify-content-md-center custom-container"
        style={{
          backgroundColor: '#161D2F',
          borderRadius: '20px',
        }}
      >
        <Col md={12} className="text-center my-3">
          <Logo position="center" />
          <h1 className="mt-4">MyFlix DB</h1>
        </Col>
        <Col md={8}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
        </Col>
        <Col md={12} className="text-center my-3">
          <span>or</span>
        </Col>
        <Col md={8}>
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.genre.Name === selectedMovie.genre.Name &&
        movie.id !== selectedMovie.id
    );
    console.log('Selected Movie Genre:', selectedMovie.genre.Name);
    console.log('Similar Movie:', similarMovies);

    return (
      <div className="movie-view-container">
        <Logo position="left" />

        <Row className="justify-content-md-center">
          <Col md={8}>
            <div>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
              <hr />
              <h2>Similar movies</h2>
              <div>
                <Row>
                  {similarMovies.length > 0 ? (
                    similarMovies.map((movie) => (
                      <Col key={movie.id} md={4} className="mb-4">
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      </Col>
                    ))
                  ) : (
                    <p>No similar movie found.</p>
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <Row className="justify-content-md-center">
      <Col md={12}>
        <Logo position="left" /> {/* Logo at the top left */}
      </Col>
      {movies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </Col>
      ))}

      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </Row>
  );
};

export default MainView;
