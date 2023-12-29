import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Movie from "../components/movie";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    const apiKey = "8a6b7e658acf29c79c4f4079c3bbc4b9";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenue sur notre plateforme de films
      </h1>
      <p className="text-lg text-center mb-4">
        Tu es à la recherche d'un film ? Tu es au bon endroit !
      </p>
      <p className="text-lg text-center mb-8">
        Après ton visionnage, n'hésite pas à partager ton expérience et à
        interagir avec d'autres passionnés du cinéma.
      </p>
      <p className="text-lg text-center mb-8">
        Amuse-toi à explorer les films disponibles sur notre site !
      </p>
      <SearchBar onSearch={searchMovies} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
