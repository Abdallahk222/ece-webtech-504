import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import Movie from '../components/movie';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    const apiKey = '8a6b7e658acf29c79c4f4079c3bbc4b9'; 
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div>
      <SearchBar onSearch={searchMovies} />
      <div className="movies-container">
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;