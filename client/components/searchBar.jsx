import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className='flex justify-center mt-10 mb-10' >
      <input 
        type="text" 
        placeholder="Rechercher un film" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        className='p-2 rounded-l-lg text-black'
      />
      <button 
        type="submit" 
        className={"bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-r-lg shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-blue-700"}>Search</button>
    </form>
  );
};

export default SearchBar;