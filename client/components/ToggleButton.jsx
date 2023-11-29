import React, { useContext } from 'react';
import { ThemeContext } from './UserContext'; // ou créer un ThemeContext si nécessaire

const ToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext); // ou votre propre hook d'état si vous n'utilisez pas de contexte

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