import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage during state initialization
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ||
        (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Apply theme on an initial load without animation
    if (isDarkMode) {
      document.body.classList.add('dark-theme');

      // Set initial styles without animation
      gsap.set('.theme-switch', {
        backgroundColor: isDarkMode ? '#34495e' : '#f1c40f'
      });
      gsap.set('.sun-icon', {
        opacity: isDarkMode ? 0 : 1,
        scale: isDarkMode ? 0.7 : 1
      });
      gsap.set('.moon-icon', {
        opacity: isDarkMode ? 1 : 0,
        scale: isDarkMode ? 1 : 0.7
      });
    } else {
      document.body.classList.remove('dark-theme');

      // Set initial styles without animation
      gsap.set('.theme-switch', { backgroundColor: '#f1c40f' });
      gsap.set('.sun-icon', { opacity: 1, scale: 1 });
      gsap.set('.moon-icon', { opacity: 0, scale: 0.7 });
    }
  }, []);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);

    // Save preference
    localStorage.setItem('theme', newDarkModeState ? 'dark' : 'light');

    // Animate the background
    gsap.to('.theme-switch', {
      backgroundColor: newDarkModeState ? '#34495e' : '#f1c40f',
      duration: 0.4,
    });

    // Animate the icons
    if (newDarkModeState) {
      // To dark mode
      gsap.to('.sun-icon', {
        opacity: 0,
        scale: 0.7,
        duration: 0.2,
      });
      gsap.to('.moon-icon', {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1
      });
    } else {
      // To light mode
      gsap.to('.moon-icon', {
        opacity: 0,
        scale: 0.7,
        duration: 0.2,
      });
      gsap.to('.sun-icon', {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1
      });
    }
    document.body.classList.toggle('dark-theme', newDarkModeState);
    // Change the theme
    gsap.to('body', {
      backgroundColor: newDarkModeState ? '#2c3e50' : '#ffffff',
      color: newDarkModeState ? '#ffffff' : '#333333',
      duration: 0.5,
    });

    // Update navbar colors
    gsap.to('.navbar', {
      backgroundColor: newDarkModeState ? 'rgba(52, 73, 94, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      duration: 0.5,
    });

    // Toggle class for other styling
    document.body.classList.toggle('dark-theme', newDarkModeState);
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">
              <img src="/Cuoidi.png" alt="Cuoidi.vn Logo" className="logo-image" />
            </Link>
          </div>

          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/ai-consultation">AI Tư Vấn</Link>
            </li>
            <li className="nav-item dropdown">
              <button onClick={toggleServicesDropdown} className="dropdown-toggle">
                Dịch Vụ
              </button>
              {isServicesOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/services/music">Âm Nhạc</Link></li>
                    <li><Link to="/services/decoration">Trang Trí</Link></li>
                    <li><Link to="/services/catering">Nấu Ăn</Link></li>
                    <li><Link to="/services/clothing">Trang Phục</Link></li>
                  </ul>
              )}
            </li>
            <li className="nav-item">
              <Link to="/about">Về Chúng Tôi</Link>
            </li>
            <li className="nav-item">
              <div
                  className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`}
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
              >
                <div className="sun-icon" style={{ opacity: isDarkMode ? 0 : 1 }}>
                  <FaSun />
                </div>
                <div className="moon-icon" style={{ opacity: isDarkMode ? 1 : 0 }}>
                  <FaMoon />
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/partner-registration" className="btn btn-partner">Trở Thành Đối Tác</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-login">Đăng Nhập</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
