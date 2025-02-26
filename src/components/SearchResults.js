import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) return;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTY4NTA2YjNkMjU4M2I3MTZmNzNhMmQxYjJmMDlmMSIsIm5iZiI6MTc0MDUyOTA3Ni42ODEsInN1YiI6IjY3YmU1ZGI0ZTI2NDIyMzUyZGVmOWY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlHw-aTF2toBfqdZ3Vz4W6nTL88Whtph4g3V8sxzT9A'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setNoResults(data.results.length === 0);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading results...</p>
      ) : noResults ? (
        <p>No movies found for "{query}".</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="release-date">Release: {movie.release_date || "N/A"}</p>
                <p className="rating">Rating: ⭐ {movie.vote_average || "N/A"}</p>
                <p className="overview">{movie.overview ? `${movie.overview.substring(0, 100)}...` : "No overview available."}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
