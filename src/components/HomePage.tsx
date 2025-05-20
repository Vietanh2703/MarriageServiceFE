import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';
import Slideshow from './Slideshow';
import Footer from './Footer';
import './HomePage.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: featureRef, inView: featureVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <div className="home-page">
      <Navbar />

      {/* Slideshow Section */}
      <Slideshow />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Tạo Nên Ngày Cưới Trong Mơ Của Bạn</h1>
            <p>
              Cuoidi.vn kết nối bạn với những đối tác cung cấp dịch vụ cưới hỏi chất lượng cao,
              giúp bạn tổ chức đám cưới hoàn hảo mà không cần lo lắng.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">Khám Phá Dịch Vụ</Link>
              <Link to="/ai-consultation" className="btn btn-secondary">AI Tư Vấn</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Dịch Vụ Của Chúng Tôi</h2>
            <p>Đa dạng dịch vụ chất lượng cao cho ngày cưới hoàn hảo của bạn</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon music-icon"></div>
              <h3>Âm Nhạc</h3>
              <p>Đa dạng lựa chọn từ ban nhạc sống đến DJ chuyên nghiệp cho đám cưới của bạn. Chúng tôi cung cấp các dịch vụ âm nhạc cao cấp với các nghệ sĩ tài năng và thiết bị âm thanh hiện đại.</p>
              <ul className="service-features">
                <li>Ban nhạc sống chuyên nghiệp</li>
                <li>DJ và MC có kinh nghiệm</li>
                <li>Hệ thống âm thanh hiện đại</li>
                <li>Đa dạng thể loại nhạc</li>
              </ul>
              <Link to="/services/music" className="service-link">Tìm hiểu thêm</Link>
            </div>

            <div className="service-card">
              <div className="service-icon decoration-icon"></div>
              <h3>Trang Trí</h3>
              <p>Biến không gian cưới thành thiên đường với dịch vụ trang trí đẳng cấp. Đội ngũ thiết kế của chúng tôi sẽ biến ý tưởng của bạn thành hiện thực với những chi tiết tinh tế.</p>
              <ul className="service-features">
                <li>Trang trí hoa tươi cao cấp</li>
                <li>Thiết kế backdrop sáng tạo</li>
                <li>Bàn ghế và vải phủ sang trọng</li>
                <li>Đèn trang trí không gian</li>
              </ul>
              <Link to="/services/decoration" className="service-link">Tìm hiểu thêm</Link>
            </div>

            <div className="service-card">
              <div className="service-icon catering-icon"></div>
              <h3>Ẩm Thực</h3>
              <p>Thực đơn đa dạng, phong phú từ các đầu bếp hàng đầu cho tiệc cưới của bạn. Chúng tôi cung cấp các món ăn ngon miệng với cách trình bày đẹp mắt, đảm bảo làm hài lòng mọi thực khách.</p>
              <ul className="service-features">
                <li>Thực đơn Á - Âu đa dạng</li>
                <li>Đầu bếp 5 sao với kinh nghiệm</li>
                <li>Bánh cưới thiết kế riêng</li>
                <li>Dịch vụ bar và đồ uống</li>
              </ul>
              <Link to="/services/catering" className="service-link">Tìm hiểu thêm</Link>
            </div>

            <div className="service-card">
              <div className="service-icon clothing-icon"></div>
              <h3>Trang Phục</h3>
              <p>Váy cưới, áo dài, vest sang trọng và đẳng cấp cho cặp đôi và quan khách. Bộ sưu tập của chúng tôi bao gồm các thiết kế độc đáo từ các nhà thiết kế nổi tiếng.</p>
              <ul className="service-features">
                <li>Váy cưới cao cấp nhiều phong cách</li>
                <li>Áo dài cưới truyền thống và hiện đại</li>
                <li>Vest chú rể thiết kế riêng</li>
                <li>Dịch vụ may đo và chỉnh sửa</li>
              </ul>
              <Link to="/services/clothing" className="service-link">Tìm hiểu thêm</Link>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section - New Design */}
      <section ref={featureRef} className="why-choose-us-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Điểm Khác Biệt</span>
            <h2 className="section-title">Tại Sao Chọn Cuoidi.vn?</h2>
            <div className="header-decor"></div>
          </div>

          <div className="features-grid">
            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="0">
              <div className="feature-icon">
                <i className="icon-ai">🤖</i>
              </div>
              <h3>Tư Vấn AI Thông Minh</h3>
              <p>Ứng dụng công nghệ AI tiên tiến, giúp bạn lên kế hoạch đám cưới chi tiết và tìm kiếm dịch vụ phù hợp nhất</p>
            </div>

            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="1">
              <div className="feature-icon">
                <i className="icon-partners">💎</i>
              </div>
              <h3>Đối Tác Uy Tín</h3>
              <p>Hệ thống đối tác được thẩm định kỹ lưỡng, đảm bảo chất lượng dịch vụ tốt nhất cho ngày trọng đại</p>
            </div>

            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="2">
              <div className="feature-icon">
                <i className="icon-customize">⚡</i>
              </div>
              <h3>Tùy Chỉnh Linh Hoạt</h3>
              <p>Tự do điều chỉnh gói dịch vụ theo ngân sách và sở thích, tạo nên đám cưới độc đáo của riêng bạn</p>
            </div>

            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="3">
              <div className="feature-icon">
                <i className="icon-support">🎯</i>
              </div>
              <h3>Hỗ Trợ 24/7</h3>
              <p>Đội ngũ chuyên viên tư vấn nhiệt tình, sẵn sàng hỗ trợ bạn mọi lúc mọi nơi</p>
            </div>

            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="4">
              <div className="feature-icon">
                <i className="icon-price">💰</i>
              </div>
              <h3>Giá Cả Minh Bạch</h3>
              <p>Cam kết không phát sinh chi phí, bảo vệ quyền lợi khách hàng với chính sách rõ ràng</p>
            </div>

            <div className={`feature-card ${featureVisible ? 'visible' : ''}`} data-delay="5">
              <div className="feature-icon">
                <i className="icon-experience">🌟</i>
              </div>
              <h3>Trải Nghiệm Hoàn Hảo</h3>
              <p>98% khách hàng hài lòng với dịch vụ, cùng hàng nghìn đám cưới thành công trên toàn quốc</p>
            </div>
          </div>

          <div className={`features-cta ${featureVisible ? 'visible' : ''}`}>
            <Link to="/register" className="cta-button">
              <span className="button-text">Bắt Đầu Ngay</span>
              <span className="button-icon">→</span>
            </Link>
          </div>
        </div>

        <div className="background-decor"></div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <p>Những phản hồi từ các cặp đôi đã sử dụng dịch vụ của chúng tôi</p>
          </div>

          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-carousel">
              {/* Lặp các feedback liên tục */}
              {[...Array(2)].map((_, loopIndex) => (
                  <div className="testimonial-slide-group" key={loopIndex}>
                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#dcedc8" }}>
                        <span>NVL</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Ngô Văn L & Trần Thị M</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Thực đơn tiệc cưới do Cuoidi.vn cung cấp rất ngon và đa dạng."</p>
                        <div className="testimonial-date">Tháng 8/2023</div>
                      </div>
                    </div>

                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#e1f5fe" }}>
                        <span>PTK</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Phạm Thị K & Lê Văn H</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Dịch vụ trang trí tiệc cưới thật tuyệt vời!"</p>
                        <div className="testimonial-date">Tháng 9/2023</div>
                      </div>
                    </div>

                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#f3e5f5" }}>
                        <span>NTH</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Nguyễn Thị H & Trần Văn P</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Âm nhạc sống tại tiệc cưới thật sự tuyệt vời."</p>
                        <div className="testimonial-date">Tháng 10/2023</div>
                      </div>
                    </div>

                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#fff3e0" }}>
                        <span>LVM</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Lê Văn M & Nguyễn Thị T</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Dịch vụ chụp ảnh và quay phim rất chuyên nghiệp."</p>
                        <div className="testimonial-date">Tháng 11/2023</div>
                      </div>
                    </div>

                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#e8f5e9" }}>
                        <span>HTN</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Hoàng Thị N & Phạm Văn K</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Trang phục cưới được tư vấn rất phù hợp và đẹp."</p>
                        <div className="testimonial-date">Tháng 12/2023</div>
                      </div>
                    </div>

                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#fce4ec" }}>
                        <span>TVH</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Trần Văn H & Lê Thị M</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Địa điểm tổ chức cưới rất sang trọng và đẹp mắt."</p>
                        <div className="testimonial-date">Tháng 1/2024</div>
                      </div>
                    </div>

                    {/* New Feedback 1 */}
                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#ede7f6" }}>
                        <span>QHĐ</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Quang H & Diễm L</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"AI tư vấn giúp chúng tôi lựa chọn dịch vụ rất phù hợp."</p>
                        <div className="testimonial-date">Tháng 2/2024</div>
                      </div>
                    </div>

                    {/* New Feedback 2 */}
                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#e0f2f1" }}>
                        <span>BDT</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Bình D & Trinh N</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Website dễ dùng, giúp chúng tôi tiết kiệm thời gian chuẩn bị."</p>
                        <div className="testimonial-date">Tháng 3/2024</div>
                      </div>
                    </div>

                    {/* New Feedback 3 */}
                    <div className="testimonial-card">
                      <div className="testimonial-avatar" style={{ backgroundColor: "#fff8e1" }}>
                        <span>MLT</span>
                      </div>
                      <div className="testimonial-content">
                        <h4>Minh L & Thảo V</h4>
                        <div className="testimonial-rating">
                          <div className="stars">★★★★★</div>
                          <span className="rating-text">5.0</span>
                        </div>
                        <p>"Dịch vụ khách hàng rất tận tình và chu đáo!"</p>
                        <div className="testimonial-date">Tháng 4/2024</div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Bắt Đầu Lên Kế Hoạch Cho Đám Cưới Của Bạn Ngay Hôm Nay</h2>
            <p>Đăng ký miễn phí và khám phá các dịch vụ cưới hỏi chất lượng cao</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">Đăng Ký Ngay</Link>
              <Link to="/services" className="btn btn-secondary">Xem Dịch Vụ</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

