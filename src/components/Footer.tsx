import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTiktok, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { BsMessenger } from 'react-icons/bs';
import './Footer.css';

const Footer: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Kiểm tra localStorage trước
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Sau đó kiểm tra cài đặt hệ thống
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen for theme changes in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    } else {
      document.body.classList.toggle('dark-theme', window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Update body class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('dark-theme', isDarkMode);
    
    // Dispatch theme change event
    const event = new CustomEvent('themeChange', { detail: { theme } });
    window.dispatchEvent(event);
  }, [isDarkMode]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setIsDarkMode(e.newValue === 'dark');
      }
    };

    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkMode(e.detail.theme === 'dark');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('themeChange', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
      <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="footer-container">
          <div className="footer-column">
            <div className="footer-logo">
              <Link to="/">Cuoidi.vn</Link>
            </div>
            <p className="footer-description">
              Dịch vụ kết nối đối tác cung cấp dịch vụ cưới hỏi chuyên nghiệp hàng đầu Việt Nam.
            </p>
            <ul className="footer-contact">
              <li><FaEnvelope className="contact-icon" /><a href="mailto:contact@cuoidi.vn">contact@cuoidi.vn</a></li>
              <li><FaMapMarkerAlt className="contact-icon" />123 Đường ABC, Quận 1, TP.HCM</li>
              <li><FaPhone className="contact-icon" />0987 654 321</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Dịch Vụ</h5>
            <ul className="footer-links">
              <li><Link to="/services/wedding-planning">Tổ Chức Đám Cưới</Link></li>
              <li><Link to="/services/photography">Chụp Ảnh & Quay Phim</Link></li>
              <li><Link to="/services/venue">Địa Điểm Tổ Chức</Link></li>
              <li><Link to="/services/catering">Dịch Vụ Ẩm Thực</Link></li>
              <li><Link to="/services/decoration">Trang Trí Tiệc Cưới</Link></li>
              <li><Link to="/services/entertainment">Giải Trí Cho Khách</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Chính Sách & Pháp Lý</h5>
            <ul className="footer-links">
              <li><Link to="/policies/terms">Điều Khoản Sử Dụng</Link></li>
              <li><Link to="/policies/privacy">Chính Sách Bảo Mật</Link></li>
              <li><Link to="/policies/payment">Thanh Toán & Hoàn Tiền</Link></li>
              <li><Link to="/policies/cancellation">Chính Sách Hủy Đơn</Link></li>
              <li><Link to="/policies/warranty">Bảo Hành Dịch Vụ</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Về Chúng Tôi</h5>
            <ul className="footer-links">
              <li><Link to="/about/story">Câu Chuyện Thương Hiệu</Link></li>
              <li><Link to="/about/team">Đội Ngũ</Link></li>
              <li><Link to="/about/mission">Sứ Mệnh & Tầm Nhìn</Link></li>
              <li><Link to="/about/partners">Đối Tác</Link></li>
              <li><Link to="/about/careers">Cơ Hội Việc Làm</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Kết Nối Với Chúng Tôi</h5>
            <p>Theo dõi chúng tôi trên mạng xã hội để nhận thông tin mới nhất về xu hướng cưới hỏi.</p>
            <div className="social-links">
              <a href="https://facebook.com/cuoidi" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://m.me/cuoidi" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
                <BsMessenger />
              </a>
              <a href="https://tiktok.com/@cuoidi" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="https://instagram.com/cuoidi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Cuoidi.vn. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
  );
};

export default Footer;
