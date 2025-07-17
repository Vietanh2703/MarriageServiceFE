import React, { useState, useEffect } from 'react';
import './VoucherCard.css';

interface VoucherCardProps {
  code: string;
  discount: string;
  expireDate: string;
  description: string;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ code, discount, expireDate, description }) => {
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(expireDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [expireDate]);

  const handleClaim = () => {
    // TODO: Implement voucher claim logic
    alert('Đã lưu voucher: ' + code);
  };

  return (
    <div className={`voucher-card ${isExpired ? 'expired' : ''}`}>
      <div className="voucher-content">
        <div className="voucher-discount">{discount}</div>
        <div className="voucher-code">{code}</div>
        <div className="voucher-description">{description}</div>
        {!isExpired ? (
          <>
            <div className="voucher-countdown">
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.days}</span>
                <span className="countdown-label">Ngày</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.hours}</span>
                <span className="countdown-label">Giờ</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.minutes}</span>
                <span className="countdown-label">Phút</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.seconds}</span>
                <span className="countdown-label">Giây</span>
              </div>
            </div>
            <button className="claim-button" onClick={handleClaim}>
              Nhận ngay
            </button>
          </>
        ) : (
          <div className="expired-message">Voucher đã hết hạn</div>
        )}
      </div>
    </div>
  );
};

export default VoucherCard;
