import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../HomeNavbar';
import Footer from '../Footer';
import './PartnerRegistrationPaymentResult.css';

const PartnerRegistrationPaymentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { success, orderData } = location.state || {};
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);

    // If no order data, redirect to home immediately
    if (!orderData) {
      navigate('/home');
      return;
    }

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    const interval = setInterval(() => {
      setCountdown((prev) => prev > 1 ? prev - 1 : prev);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [orderData, navigate]);

  if (!success || !orderData) {
    return null;
  }

  return (
      <div className="payment-result-page">
        <Navbar />

        <div className="result-container">
          {/* Success Message */}
          <div className="success-message">
            <FaCheckCircle className="success-icon" />
            <h1>Đăng ký thành công!</h1>
            <p>Cảm ơn bạn đã trở thành đối tác của Cuoidi.vn</p>
          </div>

          {/* Compact Notes */}
          <div className="notes-container">
            <div className="note-content">
              <p>⏰ Tài khoản đối tác sẽ được <strong>xác nhận trong vòng 24 giờ</strong></p>
              <p>📧 Email xác nhận sẽ được gửi đến: <strong>{orderData.registrationData.businessEmail}</strong></p>
              <p>📞 Liên hệ hỗ trợ: <strong>1900 1234</strong> | <strong>partners@cuoidi.vn</strong></p>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="action-section">
          <span className="countdown-text">
            Quay về trang chủ ({countdown}s)
          </span>
          </div>
        </div>

        <Footer />
      </div>
  );
};

export default PartnerRegistrationPaymentResult;