import React, { useState } from 'react';

const Movie = ({ movie }) => {
  const [details, setDetails] = useState(null);

  const fetchMovieDetails = async () => {
    /**
     * The API key used for accessing movie data.
     * @type {string}
     */
    const apiKey = '8a6b7e658acf29c79c4f4079c3bbc4b9';
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching movie details: ', error);
    }
  };

  return (
    <div className="movie" onClick={fetchMovieDetails}>
      <img 
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
        alt={movie.title} 
      />
      <h3 className="movie-title font-bold">{movie.title}</h3>
      {details && (
        <div className="movie-details">
          <p><span className="font-bold">Casting:</span> {details.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
          <p><span className="font-bold">Directeur:</span> {
            details.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ')
          }</p>
        </div>
      )}
    </div>
  );
};

export default Movie;
