
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovie = async () => {
    if (!query.trim()) return;

    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=99eb9fd1&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError("Invalid movie name. Please try again.");
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError("Invalid movie name. Please try again.");
    }
  };

  return (
    <div id="main">
      {/* ✅ REQUIRED HEADING */}
      <h1 id="heading">Search Movie</h1>

      {/* Search Input */}
      <input
        id="search-input"
        type="text"
        placeholder="Search Movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button id="search-button" onClick={searchMovie}>
        Search
      </button>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Movie Results */}
      <div id="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : ""}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
