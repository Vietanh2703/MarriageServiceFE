import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();

    // Animate the toggle button
    gsap.to(".theme-toggle", {
      rotate: 360,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  };

  return (
    <button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
