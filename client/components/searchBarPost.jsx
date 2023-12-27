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
      placeholder="Rechercher par titre..."
      value={searchTerm}
      onChange={handleSearch}
      className="p-2 border rounded search-bar-post" 
    />
  );
}

export default SearchBarPost;
