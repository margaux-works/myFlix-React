import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch('https://movies-app2024-74d588eb4f3d.herokuapp.com/movies')
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
  }, []);

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.genre.Name === selectedMovie.genre.Name &&
        movie.id !== selectedMovie.id
    );
    console.log('Selected Movie Genre:', selectedMovie.genre.Name);
    console.log('Similar Movie:', similarMovies);

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar movies</h2>
        <div>
          {similarMovies.length > 0 ? (
            similarMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            ))
          ) : (
            <p>No similar movie found.</p>
          )}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
