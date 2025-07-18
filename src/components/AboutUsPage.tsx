import React from 'react';
import './AboutUsPage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const AboutUsPage: React.FC = () => {

  const { ref: historyRef, inView: historyVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: teamRef, inView: teamVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: valuesRef, inView: valuesVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: statsRef, inView: statsVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: bannerRef, inView: bannerVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const animateValue = (end: number, suffix: string = '') => {
    return (
      <CountUp
        end={end}
        duration={3}
        separator=","
        suffix={suffix}
        enableScrollSpy
        scrollSpyOnce
        delay={0.5}
        start={0}
        decimals={0}
        useEasing={true}
      >
        {({ countUpRef }) => (
          <motion.span
            ref={countUpRef}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          />
        )}
      </CountUp>
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className={`aboutus-page`}>
      <Navbar />

      <motion.div
        className="aboutus-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="aboutus-hero-background"></div>
        <div className="aboutus-hero-pattern"></div>
        <motion.div
          className="aboutus-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="aboutus-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >Kiến Tạo<span className="highlight"> Khoảnh Khắc </span>Hạnh Phúc
          </motion.h1>
          <motion.p
            className="aboutus-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Chúng tôi không đơn thuần là đơn vị tổ chức sự kiện, mà còn là người đồng hành
            đáng tin cậy trong hành trình tình yêu của bạn. Với đội ngũ chuyên nghiệp
            cùng công nghệ hiện đại, chúng tôi cam kết mang đến trải nghiệm đặc biệt
            và độc đáo cho ngày trọng đại của bạn.
          </motion.p>
        </motion.div>
        <div className="hero-shape-1"></div>
        <div className="hero-shape-2"></div>
      </motion.div>

      <motion.section
        ref={historyRef}
        className="aboutus-history"
        variants={fadeInUp}
        initial="hidden"
        animate={historyVisible ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="section-header">
            <span className="section-badge">Hành Trình</span>
            <h2>Phát Triển & Thành Tựu</h2>
          </motion.div>
          <div className="history-content">
            <motion.div
              className="history-image"
              variants={fadeInUp}
            >
              <img src="/wedding-couple.jpg" alt="Câu chuyện của chúng tôi" />
              <div className="image-shape-1"></div>
              <div className="image-shape-2"></div>
            </motion.div>
            <motion.div
              className="history-text"
              variants={staggerContainer}
              initial="hidden"
              animate={historyVisible ? "visible" : "hidden"}
            >
              <motion.div variants={fadeInUp} className="history-item">
                <div className="history-year">01/2025</div>
                <h3>Khởi Nguồn</h3>
                <p>Thành lập với sứ mệnh mang đến giải pháp toàn diện cho ngày cưới</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="history-item">
                <div className="history-year">05/2025</div>
                <h3>Phát Triển</h3>
                <p>Mở rộng hệ thống, tích hợp công nghệ AI vào tư vấn dịch vụ</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="history-item">
                <div className="history-year">2099</div>
                <h3>Bứt Phá</h3>
                <p>Top 1 nền tảng dịch vụ cưới hỏi được tin dùng tại Việt Nam</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={teamRef}
        className="aboutus-team"
        variants={fadeInUp}
        initial="hidden"
        animate={teamVisible ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="section-header">
            <span className="section-badge">Đội Ngũ</span>
            <h2>Những Người Sáng Lập</h2>
          </motion.div>
          <motion.div
            className="team-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={teamVisible ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="team-member">
              <div className="member-avatar">
                <img src="/wedding-couple.svg" alt="CEO" />
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h3>Nguyễn Văn A</h3>
                <p className="title">CEO & Founder</p>
                <p className="desc">15 năm kinh nghiệm trong ngành tổ chức sự kiện và cưới hỏi</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="team-member">
              <div className="member-avatar">
                <img src="/wedding-icon.svg" alt="CTO" />
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h3>Trần Thị B</h3>
                <p className="title">CTO</p>
                <p className="desc">Chuyên gia công nghệ AI với nhiều năm kinh nghiệm</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="team-member">
              <div className="member-avatar">
                <img src="/wedding-icon.svg" alt="COO" />
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h3>Lê Văn C</h3>
                <p className="title">COO</p>
                <p className="desc">Hơn 10 năm kinh nghiệm quản lý vận hành doanh nghiệp</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={valuesRef}
        className="aboutus-values"
        variants={fadeInUp}
        initial="hidden"
        animate={valuesVisible ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="section-header">
            <span className="section-badge">Giá Trị Cốt Lõi</span>
            <h2>Cam Kết Của Chúng Tôi</h2>
          </motion.div>
          <motion.div
            className="values-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={valuesVisible ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="value-item">
              <div className="value-icon">💝</div>
              <h3>Tận Tâm</h3>
              <p>Chúng tôi luôn đặt trọn tâm huyết vào từng chi tiết nhỏ nhất</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="value-item">
              <div className="value-icon">✨</div>
              <h3>Sáng Tạo</h3>
              <p>Không ngừng đổi mới, mang đến trải nghiệm độc đáo</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="value-item">
              <div className="value-icon">🎯</div>
              <h3>Chuyên Nghiệp</h3>
              <p>Đảm bảo chất lượng dịch vụ hàng đầu</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={statsRef}
        className="aboutus-stats"
        variants={fadeInUp}
        initial="hidden"
        animate={statsVisible ? "visible" : "hidden"}
      >
        <div className="container">
          <motion.div className="section-header">
            <span className="section-badge">Con Số</span>
            <h2>Thành Tựu Nổi Bật</h2>
          </motion.div>
          <motion.div
            className="stats-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={statsVisible ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="stat-item">
              <h3>
                {animateValue(5000, "+")}
              </h3>
              <p>Cặp đôi tin tưởng</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-item">
              <h3>
                {animateValue(200, "+")}
              </h3>
              <p>Đối tác uy tín</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-item">
              <h3>
                {animateValue(95, "%")}
              </h3>
              <p>Khách hàng hài lòng</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-item">
              <h3>
                {animateValue(32, "+")}
              </h3>
              <p>Tỉnh thành phục vụ</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={bannerRef}
        className="contact-banner"
        variants={fadeInUp}
        initial="hidden"
        animate={bannerVisible ? "visible" : "hidden"}
      >
        <div className="banner-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="container">
          <motion.div
            className="banner-content"
            variants={staggerContainer}
            initial="hidden"
            animate={bannerVisible ? "visible" : "hidden"}
          >
            <motion.h2
              variants={fadeInUp}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Sẵn Sàng Cho Ngày Cưới Trong Mơ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình hạnh phúc
            </motion.p>
            <motion.div
              className="banner-buttons"
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.a
                href="/ai-consultation"
                className="btn btn-light"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tư Vấn Miễn Phí
              </motion.a>
              <motion.a
                href="/contact"
                className="btn btn-outline-light"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Liên Hệ Ngay
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

