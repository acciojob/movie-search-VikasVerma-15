
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovie = (e) => {
    e.preventDefault(); // IMPORTANT for form

    if (!query.trim()) return;

    setError("");
    setMovies([]);

    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Invalid movie name. Please try again.");
        } else {
          setMovies(data.Search);
        }
      })
      .catch(() => {
        setError("Invalid movie name. Please try again.");
      });
  };

  return (
    <div id="main">
      {/* REQUIRED HEADING */}
      <h1 id="heading">Search Movie</h1>

      {/* ✅ FORM IS REQUIRED */}
      <form onSubmit={searchMovie}>
        <input
          id="search-input"
          type="text"
          placeholder="Search Movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button id="search-button" type="submit">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* ✅ RESULTS MUST BE IN ul > li */}
      <ul id="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : ""}
              alt={movie.Title}
            />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
