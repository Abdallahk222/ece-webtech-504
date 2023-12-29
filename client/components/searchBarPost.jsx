import React, { useState } from 'react';

function SearchBarPost({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Rechercher des commentaires par titre"
      value={searchTerm}
      onChange={handleSearch}
      className="p-2 border rounded search-bar-post w-1/5" 
    />
  );
}

export default SearchBarPost;
