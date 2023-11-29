import React, { useContext } from 'react';
import { ThemeContext } from './UserContext'; 

const ToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext); 

  return (
    <button
      className="..."
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? 'Mode Lumineux' : 'Mode Sombre'}
    </button>
  );
};

export default ToggleButton;