import React, { useEffect, useState } from "react";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTY4NTA2YjNkMjU4M2I3MTZmNzNhMmQxYjJmMDlmMSIsIm5iZiI6MTc0MDUyOTA3Ni42ODEsInN1YiI6IjY3YmU1ZGI0ZTI2NDIyMzUyZGVmOWY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlHw-aTF2toBfqdZ3Vz4W6nTL88Whtph4g3V8sxzT9A'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Now Playing</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="release-date">Release: {movie.release_date}</p>
                <p className="rating">Rating: ⭐ {movie.vote_average}</p>
                <p className="overview">{movie.overview.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
