import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      description:
        "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves.",
      genre: 'Action',
      director: 'Christopher Nolan',
      image:
        'https://posters.movieposterdb.com/10_06/2010/1375666/l_1375666_07030c72.jpg',
    },
    {
      id: 2,
      title: 'Vertigo',
      description:
        'A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.',
      genre: 'Thriller',
      director: 'Alfred Hitchcock',
      image:
        'https://posters.movieposterdb.com/12_11/1958/52357/l_52357_739d6822.jpg',
    },
    {
      id: 3,
      title: 'The Shawshank Redemption',
      description:
        'A man imprisoned for a crime he did not commit forms an unlikely friendship with a fellow inmate and finds hope in the darkest of places.',
      genre: 'Drama',
      director: 'Frank Darabont',
      image:
        'https://posters.movieposterdb.com/05_03/1994/0111161/l_8494_0111161_3bb8e662.jpg',
    },
    {
      id: 4,
      title: 'Barbie',
      description:
        'Barbie suffers a crisis that leads her to question her world and her existence.',
      genre: 'Comedy',
      director: 'Greta Grewig',
      image:
        'https://posters.movieposterdb.com/23_06/2023/1517268/l_barbie-movie-poster_780f2c78.jpg',
    },
    {
      id: 5,
      title: 'Monster',
      description:
        'Based on the life of Aileen Wuornos, a Daytona Beach prostitute who became a serial killer.',
      genre: 'Crime',
      director: 'Patty Jenkins',
      image:
        'https://posters.movieposterdb.com/06_02/2003/0340855/l_93320_0340855_954d0419.jpg',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
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
