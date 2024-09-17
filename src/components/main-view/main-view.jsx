import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reload, setReload] = useState(false); // added

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
  }, [token, reload]); // reload added

  const handleFavoriteChange = (movieId, isFavorite) => {
    const method = isFavorite ? 'PUT' : 'DELETE';
    const url = `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');

        const updatedFavorites = isFavorite
          ? [...user.FavoriteMovies, movieId] // Add to favorites
          : user.FavoriteMovies.filter((id) => id !== movieId); // Remove from favorites

        // Update user with new favorites list
        const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        //reload added
        handleReload();
      })
      .catch((error) => console.error('Error updating favorite movie:', error));
  };

  // Define handleReload to trigger re-fetching movies
  const handleReload = () => {
    setReload(!reload); // Toggle the reload state
  };

  // Logic to filter similar movies
  const getSimilarMovies = (movie) => {
    return movies.filter(
      (similarMovie) =>
        similarMovie.genre.Name === movie.genre.Name &&
        similarMovie.id !== movie.id
    );
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }}
      />
      <Row className="justify-content-md-center custom-container">
        <Routes>
          /* Signup Route */
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col xs={12} md={6}>
                  <SignupView />
                </Col>
              )
            }
          />
          /* Login Route */
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col xs={12} md={10}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem('user', JSON.stringify(user));
                      localStorage.setItem('token', token);
                    }}
                  />
                </Col>
              )
            }
          />
          /* Profile Route */
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    token={token}
                    onUserUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                    }}
                  />
                </Col>
              )
            }
          />
          /* Default Route - Movie List */
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col xs={6} md={4} lg={3} className="mb-4" key={movie.id}>
                      <MovieCard
                        movie={movie}
                        token={token}
                        user={user}
                        handleReload={handleReload}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <MovieView
                    user={user}
                    token={token}
                    movies={movies}
                    getSimilarMovies={getSimilarMovies}
                  />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
