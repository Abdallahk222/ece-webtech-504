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
        className= 'text-black'
      />
      <button type="submit" className="ml-10 block bg-[#42AFDB] text-[white] py-2 px-2 hover:bg-[#37C235]">Search</button>
    </form>
  );
};

export default SearchBar;