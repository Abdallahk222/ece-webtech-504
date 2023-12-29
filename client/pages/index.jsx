import React, { useState } from "react";
import SearchBar from "../components/searchBar";
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
    <div>
      <p style={{ marginTop: "30px" }}>
        <strong style={{ marginLeft: "300px" }}>
          What film ? envie de regarder un film ? tu te trouves au bon endroit!
        </strong>
      </p>
      <p>
        <strong style={{ marginLeft: "300px" }}>
          {" "}
          Après ton visionnage n'hésite surtout pas à faire une publication et à
          intéragir avec les autres en commentaires.
        </strong>
      </p>
      <strong style={{ marginLeft: "300px" }}>
        {" "}
        Tu peux aussi t'amuser à regarder en détail la beauté de notre site^^.
      </strong>
      <p>
        <strong style={{ marginLeft: "300px" }}> bon visionnage!</strong>
      </p>
      <SearchBar onSearch={searchMovies} />
      <div className="movies-container">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
