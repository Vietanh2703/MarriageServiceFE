import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';
import { gsap } from 'gsap';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    
    // Apply theme to body for global styling
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    document.body.classList.toggle('light-theme', savedTheme !== 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    
    // Update state immediately
    setIsDarkMode(!isDarkMode);
    
    // Store theme in localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update body classes
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    document.body.classList.toggle('light-theme', newTheme === 'light');
    
    // Add a small timeout to ensure localStorage is updated before event dispatch
    setTimeout(() => {
      // Create and dispatch a custom event with the theme information
      const themeEvent = new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      });
      
      // Dispatch immediately
      window.dispatchEvent(themeEvent);
      
      console.log('Theme toggled to:', newTheme);
    }, 0);
    
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
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
