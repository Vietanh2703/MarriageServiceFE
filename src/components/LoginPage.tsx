import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './LoginPage.css';
import Footer from "./Footer";
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className={`login-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      <div className="login-container">
        <div className="login-form-container">
          <h1>Đăng Nhập</h1>
          <p className="login-subtitle">Đăng nhập để truy cập tài khoản của bạn</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
            </div>

            <button type="submit" className="login-button">Đăng Nhập</button>

            {/* Divider with "hoặc" text */}
            <div className="social-divider">
              <div className="divider-line"></div>
              <span className="divider-text">hoặc</span>
              <div className="divider-line"></div>
            </div>

            {/* Social login buttons */}
            <div className="social-login-buttons">
              <button type="button" className="social-button google-button">
                <img src="/icons8-google-240.svg" alt="Google" />
                Đăng nhập với Google
              </button>
              <button type="button" className="social-button facebook-button">
                <img src="/icons8-facebook-144.svg" alt="Facebook" />
                Đăng nhập với Facebook
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
          </div>
        </div>

        <div className="login-image">
          <div className="login-image-content">
            <h2>Chào mừng đến với Cuoidi.vn</h2>
            <p>Nền tảng kết nối dịch vụ cưới hỏi hàng đầu Việt Nam</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

