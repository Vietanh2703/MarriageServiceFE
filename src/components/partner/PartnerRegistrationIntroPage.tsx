import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Navbar from '../HomeNavbar';
import Footer from '../Footer';
import './PartnerRegistrationIntroPage.css';

const PartnerRegistrationIntroPage: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: pricingRef, inView: pricingVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const { ref: whatIsRef, inView: whatIsVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <div className={`partner-registration-intro-page`}>
      <Navbar />

      {/* Hero Section */}
      <section className="partner-hero-section">
        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Trở Thành Đối Tác Của Cuoidi.vn
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Mở rộng kinh doanh và tiếp cận hàng nghìn cặp đôi đang tìm kiếm dịch vụ cưới hỏi chất lượng cao
            </motion.p>
            <motion.div 
              className="partner-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <Link to="/partner-registration/register" className="btn btn-partner-primary">Đăng Ký Ngay</Link>
              <a href="#pricing" className="btn btn-partner-secondary">Xem Gói Dịch Vụ</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="pricing" className="partner-intro-pricing-section" ref={pricingRef}>
        <div className="partner-intro-container">
          <div className="partner-intro-section-header">
            <span className="partner-intro-section-subtitle">Gói Đối Tác</span>
            <h2 className="partner-intro-section-title">Chọn Gói Phù Hợp Với Doanh Nghiệp</h2>
            <p className="partner-intro-section-description">
              Khám phá các gói dịch vụ được thiết kế riêng để giúp doanh nghiệp của bạn phát triển và tiếp cận khách hàng hiệu quả
            </p>
          </div>

          <div className={`partner-intro-pricing-grid ${pricingVisible ? 'partner-intro-visible' : ''}`}>
            {/* Basic Plan */}
            <div className="partner-intro-pricing-card partner-intro-basic">
              <div className="partner-intro-card-header">
                <h3 className="partner-intro-plan-name">Khởi Đầu</h3>
                <div className="partner-intro-price-display">
                  <span className="partner-intro-price-amount">1.990.000đ / năm</span>
                </div>
                <p className="partner-intro-plan-desc">Dành cho doanh nghiệp mới bắt đầu</p>
              </div>

              <div className="partner-intro-features-list">
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hồ sơ doanh nghiệp</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>5 hình ảnh sản phẩm</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hiển thị trong danh mục</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hỗ trợ email (48h)</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Báo cáo cơ bản</span>
                </div>
              </div>

              <div className="partner-intro-card-action">
                <Link to="/partner-registration/register?plan=basic" className="partner-intro-btn partner-intro-btn-basic">
                  Đăng kí ngay
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="partner-intro-pricing-card partner-intro-premium partner-intro-featured">
              <div className="partner-intro-popular-badge">
                <span>🔥 Phổ biến</span>
              </div>
              <div className="partner-intro-card-header">
                <h3 className="partner-intro-plan-name">Chuyên Nghiệp</h3>
                <div className="partner-intro-price-display">
                  <span className="partner-intro-price-amount">3.990.000đ / năm</span>
                </div>
                <p className="partner-intro-plan-desc">Tối ưu cho doanh nghiệp mở rộng</p>
              </div>

              <div className="partner-intro-features-list">
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Tất cả tính năng gói Khởi Đầu</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>25 hình ảnh sản phẩm</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hiển thị ưu tiên</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hỗ trợ ưu tiên (24h)</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Đặt lịch trực tuyến</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Đánh giá khách hàng</span>
                </div>
              </div>

              <div className="partner-intro-card-action">
                <Link to="/partner-registration/register?plan=premium" className="partner-intro-btn partner-intro-btn-premium">
                  Đăng kí ngay
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="partner-intro-pricing-card partner-intro-enterprise">
              <div className="partner-intro-card-header">
                <h3 className="partner-intro-plan-name">Doanh Nghiệp</h3>
                <div className="partner-intro-price-display">
                  <span className="partner-intro-price-amount">7.990.000đ / năm</span>
                </div>
                <p className="partner-intro-plan-desc">Giải pháp cho doanh nghiệp lớn</p>
              </div>

              <div className="partner-intro-features-list">
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Tất cả tính năng gói Chuyên Nghiệp</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Không giới hạn hình ảnh</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Vị trí hiển thị cao nhất</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Quản lý tài khoản riêng</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>API tùy chỉnh</span>
                </div>
                <div className="partner-intro-feature-item">
                  <span className="partner-intro-check-icon">✓</span>
                  <span>Hỗ trợ 24/7 VIP</span>
                </div>
              </div>

              <div className="partner-intro-card-action">
                <Link to="/partner-registration/register?plan=enterprise" className="partner-intro-btn partner-intro-btn-enterprise">
                  Đăng kí ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Partner Registration Section */}
      <section className="what-is-section" ref={whatIsRef}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Giới Thiệu</span>
            <h2 className="section-title">Đăng Ký Đối Tác Là Gì?</h2>
            <p>Hiểu rõ về chương trình đối tác của Cuoidi.vn và cách thức hoạt động</p>
          </div>

          <div className={`what-is-content ${whatIsVisible ? 'visible' : ''}`}>
            <div className="what-is-image">
              <img src="/partner-explanation.jpg" alt="Partner Program Explanation" />
            </div>
            <div className="what-is-text">
              <h3>Nền tảng kết nối dịch vụ cưới hỏi hàng đầu</h3>
              <p>
                Chương trình đối tác của Cuoidi.vn là cơ hội để các nhà cung cấp dịch vụ cưới hỏi kết nối với hàng nghìn cặp đôi đang lên kế hoạch cho ngày trọng đại của họ.
              </p>
              <p>
                Khi trở thành đối tác, doanh nghiệp của bạn sẽ được hiển thị trên nền tảng của chúng tôi, tiếp cận đúng đối tượng khách hàng tiềm năng, và nhận được các công cụ để quản lý dịch vụ và đơn đặt hàng một cách hiệu quả.
              </p>
              <h3>Quy trình đăng ký đơn giản</h3>
              <ol>
                <li>Đăng ký tài khoản đối tác và chọn gói dịch vụ phù hợp</li>
                <li>Hoàn thiện hồ sơ doanh nghiệp với thông tin và hình ảnh chất lượng</li>
                <li>Đội ngũ của chúng tôi xác minh thông tin của bạn</li>
                <li>Hồ sơ của bạn được đăng tải và bắt đầu nhận đơn đặt hàng</li>
              </ol>
              <div className="what-is-cta">
                <Link to="/partner-registration/register" className="btn btn-partner-primary">Bắt Đầu Ngay</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partner-cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Sẵn Sàng Phát Triển Kinh Doanh Của Bạn?</h2>
            <p>Đăng ký trở thành đối tác của Cuoidi.vn ngay hôm nay và mở rộng cơ hội kinh doanh</p>
            <div className="cta-buttons">
              <Link to="/partner-registration/register" className="btn btn-primary">Đăng Ký Ngay</Link>
              <a href="#" className="btn btn-secondary">Liên Hệ Tư Vấn</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnerRegistrationIntroPage;
