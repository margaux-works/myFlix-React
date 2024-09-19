import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    if (!token || !storedUser?.Username) {
      return;
    }

    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${storedUser?.Username}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      });
  }, [token, storedUser?.Username]);

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
          ? [...user.FavoriteMovies, movieId]
          : user.FavoriteMovies.filter((id) => id !== movieId);

        const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        handleReload();
      })
      .catch((error) => console.error('Error updating favorite movie:', error));
  };

  const handleReload = () => {
    fetch(
      `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((error) =>
        console.error('Error fetching updated user data:', error)
      );
  };

  const getSimilarMovies = (movie) => {
    return movies.filter(
      (similarMovie) =>
        similarMovie.genre.Name === movie.genre.Name &&
        similarMovie.id !== movie.id
    );
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenre === '' || movie.genre.Name === selectedGenre)
    );
  });

  const genres = [...new Set(movies.map((movie) => movie.genre.Name))];

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
                    user={user}
                    movies={movies}
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
                  <Row className="justify-content-center mb-5">
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search a movie"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                      >
                        <option value="">All genres</option>
                        {genres.map((genre, index) => (
                          <option key={index} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col xs={6} md={4} lg={3} className="mb-4" key={movie.id}>
                        <MovieCard
                          movie={movie}
                          token={token}
                          user={user}
                          setUser={(updatedUser) => {
                            setUser(updatedUser);
                            localStorage.setItem(
                              'user',
                              JSON.stringify(updatedUser)
                            );
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
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
                    handleFavoriteChange={handleFavoriteChange}
                    handleReload={handleReload}
                    onUserUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                    }}
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
