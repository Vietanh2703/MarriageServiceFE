import React from 'react';
import './AboutUsPage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const AboutUsPage: React.FC = () => {
  const { ref: historyRef, inView: historyVisible } = useInView({
    threshold: 0.25,
    triggerOnce: false
  });

  const { ref: teamRef, inView: teamVisible } = useInView({
    threshold: 0.25,
    triggerOnce: false
  });

  const { ref: valuesRef, inView: valuesVisible } = useInView({
    threshold: 0.25,
    triggerOnce: false
  });

  const { ref: statsRef, inView: statsVisible } = useInView({
    threshold: 0.25,
    triggerOnce: false
  });

  const { ref: bannerRef, inView: bannerVisible } = useInView({
    threshold: 0.25,
    triggerOnce: false
  });

  return (
    <div className="aboutus-page">
      <Navbar />

      <div className="aboutus-hero">
        <div className="aboutus-overlay">
          <h1 className="aboutus-title">Về Chúng Tôi</h1>
          <p className="aboutus-desc">
            Chào mừng bạn đến với Cuoidi.vn - Nền tảng dịch vụ cưới hỏi hiện đại và toàn diện hàng đầu Việt Nam. Chúng tôi kết hợp công nghệ AI tiên tiến và kinh nghiệm chuyên môn để mang đến trải nghiệm tổ chức đám cưới hoàn hảo.
          </p>
        </div>
      </div>

      <section ref={historyRef} className={`aboutus-history ${historyVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2>Câu Chuyện Của Chúng Tôi</h2>
          <div className="history-content">
            <div className="history-image">
              <img src="/wedding-couple.jpg" alt="Câu chuyện của chúng tôi" />
            </div>
            <div className="history-text">
              <h3>Khởi Nguồn</h3>
              <p>Cuoidi.vn được thành lập vào năm 2022 với khát vọng cách mạng hóa ngành dịch vụ cưới hỏi tại Việt Nam. Chúng tôi nhận thấy nhu cầu về một nền tảng tích hợp toàn diện giúp các cặp đôi dễ dàng lên kế hoạch cho ngày trọng đại của mình.</p>
              <h3>Phát Triển</h3>
              <p>Từ một ý tưởng đơn giản, chúng tôi đã phát triển thành một hệ sinh thái dịch vụ đa dạng, từ tư vấn AI thông minh đến kết nối với hàng nghìn nhà cung cấp dịch vụ chất lượng cao trên toàn quốc.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={teamRef} className={`aboutus-team ${teamVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2>Đội Ngũ Của Chúng Tôi</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/wedding-couple.svg" alt="CEO" />
              </div>
              <h3>Nguyễn Văn A</h3>
              <p className="title">CEO & Founder</p>
              <p className="desc">15 năm kinh nghiệm trong ngành tổ chức sự kiện và cưới hỏi</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/wedding-icon.svg" alt="CTO" />
              </div>
              <h3>Trần Thị B</h3>
              <p className="title">CTO</p>
              <p className="desc">Chuyên gia công nghệ AI với nhiều năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className={`aboutus-values ${valuesVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2>Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Tận Tâm</h3>
              <p>Chúng tôi đặt trọn tâm huyết vào từng chi tiết nhỏ nhất</p>
            </div>
            <div className="value-item">
              <div className="value-icon">✨</div>
              <h3>Sáng Tạo</h3>
              <p>Không ngừng đổi mới, tạo ra những trải nghiệm độc đáo</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌟</div>
              <h3>Chất Lượng</h3>
              <p>Cam kết chất lượng dịch vụ hàng đầu</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className={`aboutus-stats ${statsVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2>Thành Tựu Của Chúng Tôi</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>
                <CountUp
                  start={0}
                  end={10000}
                  duration={2.5}
                  separator=","
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                >
                  {({ countUpRef }) => (
                    <span ref={countUpRef} />
                  )}
                </CountUp>
              </h3>
              <p>Đám cưới thành công</p>
            </div>
            <div className="stat-item">
              <h3>
                <CountUp
                  start={0}
                  end={5000}
                  duration={2}
                  separator=","
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                >
                  {({ countUpRef }) => (
                    <span ref={countUpRef} />
                  )}
                </CountUp>
              </h3>
              <p>Đối tác tin cậy</p>
            </div>
            <div className="stat-item">
              <h3>
                <CountUp
                  start={0}
                  end={98}
                  duration={3}
                  suffix="%"
                  enableScrollSpy
                  scrollSpyOnce
                >
                  {({ countUpRef }) => (
                    <span ref={countUpRef} />
                  )}
                </CountUp>
              </h3>
              <p>Khách hàng hài lòng</p>
            </div>
            <div className="stat-item">
              <h3>
                <CountUp
                  start={0}
                  end={64}
                  duration={1.5}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                >
                  {({ countUpRef }) => (
                    <span ref={countUpRef} />
                  )}
                </CountUp>
              </h3>
              <p>Tỉnh thành phủ sóng</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={bannerRef} className={`contact-banner ${bannerVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="banner-content">
            <h2>Sẵn Sàng Cho Ngày Cưới Trong Mơ?</h2>
            <p>Để chúng tôi giúp bạn hiện thực hóa đám cưới trong mơ</p>
            <div className="banner-buttons">
              <a href="/ai-consultation" className="btn btn-primary">Tư Vấn Ngay</a>
              <a href="tel:+84123456789" className="btn btn-secondary">Gọi Ngay: 0123.456.789</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
