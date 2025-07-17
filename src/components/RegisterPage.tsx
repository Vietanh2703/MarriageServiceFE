import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';
import './RegisterPage.css';
import { useTheme } from '../context/ThemeContext';
import { apiRequest, API_CONFIG } from '../utils/apiConfig';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false
  });
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setNotification({
        message: 'Mật khẩu xác nhận không khớp',
        type: 'error',
        isVisible: true
      });
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setNotification({
        message: 'Mật khẩu phải có ít nhất 6 ký tự',
        type: 'error',
        isVisible: true
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      if (response.ok) {
        setNotification({
          message: 'Đăng ký thành công! Mã OTP đã được gửi đến email của bạn',
          type: 'success',
          isVisible: true
        });

        // Navigate to OTP page after a short delay
        setTimeout(() => {
          navigate('/otp-verification', {
            state: { email: formData.email }
          });
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification({
          message: errorData.message || 'Đăng ký thất bại. Vui lòng thử lại',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      setNotification({
        message: 'Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại',
        type: 'error',
        isVisible: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`register-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <div className="register-container">
        <div className="register-form-container">
          <h1>Đăng Ký Tài Khoản</h1>
          <p className="register-subtitle">Tạo tài khoản để trải nghiệm dịch vụ của Cuoidi.vn</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Tạo mật khẩu mới"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                Tôi đồng ý với <Link to="/terms">Điều khoản sử dụng</Link> và <Link to="/privacy">Chính sách bảo mật</Link>
              </label>
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={!formData.agreeTerms || loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>

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
                Đăng ký với Google
              </button>
              <button type="button" className="social-button facebook-button">
                <img src="/icons8-facebook-144.svg" alt="Facebook" />
                Đăng ký với Facebook
              </button>
            </div>
          </form>

          <div className="register-footer">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </div>
        </div>

        <div className="register-image">
          <div className="register-image-content">
            <h2>Tham gia cùng Cuoidi.vn</h2>
            <p>Nền tảng kết nối dịch vụ cưới hỏi hàng đầu Việt Nam</p>
            <ul className="register-benefits">
              <li>Tiếp cận hàng trăm nhà cung cấp dịch vụ chất lượng</li>
              <li>Tư vấn AI giúp lên kế hoạch cưới hoàn hảo</li>
              <li>Tiết kiệm thời gian và chi phí tổ chức cưới</li>
            </ul>
          </div>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      <Footer />
    </div>
  );
};

export default RegisterPage;
