import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';
import { useTheme } from '../context/ThemeContext';
import { apiRequest, API_CONFIG } from '../utils/apiConfig';
import './OTPVerificationPage.css';

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = location.state?.email || '';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setNotification({
        message: 'Vui lòng nhập đầy đủ mã OTP 6 số',
        type: 'error',
        isVisible: true
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          otp: otpCode
        }),
      });

      if (response.ok) {
        setNotification({
          message: 'Xác thực thành công! Đang chuyển đến trang đăng nhập...',
          type: 'success',
          isVisible: true
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification({
          message: errorData.message || 'Mã OTP không chính xác',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      setNotification({
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        type: 'error',
        isVisible: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP, {
        method: 'POST',
        body: JSON.stringify(email),
      });

      if (response.ok) {
        setNotification({
          message: 'Mã OTP mới đã được gửi đến email của bạn',
          type: 'success',
          isVisible: true
        });
        setResendTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
      } else {
        setNotification({
          message: 'Không thể gửi lại mã OTP. Vui lòng thử lại',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      setNotification({
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        type: 'error',
        isVisible: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`otp-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <div className="otp-container">
        <div className="otp-form-container">
          <h1>Xác Thực OTP</h1>
          <p className="otp-subtitle">
            Mã xác thực đã được gửi đến email: <strong>{email}</strong>
          </p>

          <form className="otp-form" onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  autoComplete="off"
                />
              ))}
            </div>

            <button
              type="submit"
              className="verify-button"
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? 'Đang xác thực...' : 'Xác Thực'}
            </button>

            <div className="resend-section">
              <p>Không nhận được mã?</p>
              <button
                type="button"
                className={`resend-button ${!canResend ? 'disabled' : ''}`}
                onClick={handleResendOTP}
                disabled={!canResend || loading}
              >
                {canResend ? 'Gửi lại mã' : `Gửi lại sau ${resendTimer}s`}
              </button>
            </div>
          </form>

          <div className="otp-footer">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate('/register')}
            >
              Quay lại đăng ký
            </button>
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

export default OTPVerificationPage;
