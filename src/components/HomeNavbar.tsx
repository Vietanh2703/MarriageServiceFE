import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaChevronDown, FaBell } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './HomeNavbar.css';

// TypeScript interfaces
interface UserInfo {
  email: string;
  userName: string;
  userId?: string;
  id?: string;
  [key: string]: unknown;
}

interface DecodedToken {
  email?: string;
  sub?: string;
  user_email?: string;
  username?: string;
  unique_name?: string;
  nameid?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
}

const HomeNavbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Extract user info from token
  const getUserInfoFromToken = useCallback((token: string): string | null => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);

      return decodedToken.email ||
             decodedToken.sub ||
             decodedToken.user_email ||
             decodedToken.username ||
             decodedToken.unique_name ||
             decodedToken.nameid ||
             decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
             decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
             null;
    } catch {
      return null;
    }
  }, []);

  // Fetch user data from API
  const fetchUserData = useCallback(async (email: string, accessToken: string): Promise<UserInfo | null> => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await axios.get(`https://localhost:7121/user/email/${encodedEmail}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.data.isSuccess && response.data.result) {
        return response.data.result;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Get user info from stored data or API
  const getUserInfo = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return;

    const email = getUserInfoFromToken(accessToken);

    if (!email) {
      // Try to get from stored userInfo as fallback
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const userInfo: UserInfo = JSON.parse(storedUserInfo);
          setUsername(userInfo.userName || userInfo.email || 'User');
        } catch {
          setUsername('User');
        }
      }
      return;
    }

    try {
      const userData = await fetchUserData(email, accessToken);

      if (userData) {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUsername(userData.userName || userData.email || email);
      } else {
        setUsername(email);
      }
    } catch {
      setUsername(email);
    }
  }, [getUserInfoFromToken, fetchUserData]);

  useEffect(() => {
    getUserInfo();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'userInfo') {
        getUserInfo();
      }
    };

    const handleUserInfoUpdate = () => getUserInfo();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userInfoUpdated', handleUserInfoUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userInfoUpdated', handleUserInfoUpdate);
    };
  }, [getUserInfo]);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleLogout = async () => {
    try {
      // Get userId from localStorage
      const userInfo = localStorage.getItem('userInfo');
      let userId = null;

      if (userInfo) {
        try {
          const parsedUserInfo: UserInfo = JSON.parse(userInfo);
          userId = parsedUserInfo.userId || parsedUserInfo.id;
        } catch {
          console.error('Failed to parse user info');
        }
      }

      // Call logout API if userId exists
      if (userId) {
        const response = await fetch(`https://localhost:7121/api/Auth/logout/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) {
          console.error('Logout API call failed:', response.status);
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear localStorage and redirect
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('refreshToken');
      setIsUserMenuOpen(false);
      navigate('/');
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="home-navbar">
      <div className="home-navbar-container">
        <div className="home-logo">
          <Link to="/home">
            <img src="/Cuoidi.png" alt="Cuoidi.vn Logo" className="home-logo-image" />
          </Link>
        </div>

        <ul className="home-nav-items">
          <li className="home-nav-item">
            <Link to="/chatbot">AI Tư Vấn</Link>
          </li>
          <li className="home-nav-item home-dropdown">
            <button onClick={toggleServicesDropdown} className="home-dropdown-toggle">
              Dịch Vụ <FaChevronDown />
            </button>
            {isServicesOpen && (
              <ul className="home-dropdown-menu">
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
          <li className="home-nav-item">
            <Link to="/about">Về Chúng Tôi</Link>
          </li>
          <li className="home-nav-item">
            <Link to="/notifications" className="home-nav-icon-link">
              <FaBell />
              <span>Thông Báo</span>
            </Link>
          </li>
          <li className="home-nav-item">
            <div className="home-user-menu">
              <button onClick={toggleUserMenu} className="home-user-menu-toggle">
                <FaUser /> {username} <FaChevronDown />
              </button>
              {isUserMenuOpen && (
                <div className="home-user-menu-dropdown">
                  <Link to="/profile" className="home-user-menu-item">
                    <FaUser /> Hồ Sơ
                  </Link>
                  <Link to="/my-bookings" className="home-user-menu-item">
                    📅 Đặt Chỗ Của Tôi
                  </Link>
                  <Link to="/settings" className="home-user-menu-item">
                    ⚙️ Cài Đặt
                  </Link>
                  <hr className="home-menu-divider" />
                  <button onClick={handleLogout} className="home-user-menu-item home-logout-btn">
                    🚪 Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavbar;
