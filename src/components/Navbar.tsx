import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const accessToken = localStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
    };

    // Check on component mount
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in other tabs)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage changes in same tab
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to={isLoggedIn ? "/home" : "/"}>
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
                    <li><Link to="/services/ceremony">Hình thức lễ cưới</Link></li>
                    <li><Link to="/services/decoration">Trang Trí tiệc cưới</Link></li>
                    <li><Link to="/services/photography">Chụp ảnh & quay phim</Link></li>
                    <li><Link to="/services/wedding-cars">Xe cưới</Link></li>
                    <li><Link to="/services/wedding-attire">Trang Phục</Link></li>
                    <li><Link to="/services/catering">Nấu Ăn</Link></li>
                    <li><Link to="/services/makeup">Trang điểm</Link></li>
                    <li><Link to="/services/invitation-design">Thiết kế thiệp cưới</Link></li>
                  </ul>
              )}
            </li>
            <li className="nav-item">
              <Link to="/about">Về Chúng Tôi</Link>
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
