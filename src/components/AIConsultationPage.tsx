import React, { useEffect, useState, useLayoutEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { DotLottiePlayer } from '@dotlottie/react-player';
import './AIConsultationPage.css';

const AIConsultationPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.body.classList.contains('dark-theme');
  });

  // Use useLayoutEffect to check dark mode before render
  useLayoutEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.body.classList.contains('dark-theme');
      setIsDarkMode(isDark);
    };

    // Check initial state
    checkDarkMode();

    // Create observer for body class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.body, { attributes: true });

    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of element is visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Remove observer after animation has been triggered
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="ai-consultation-page">
      <Navbar />
      
      <div className="ai-hero-section">
        <div className="container">
          <div className="ai-hero-content animate-on-scroll fade-in-up">
            <h1 className="animate-on-scroll slide-in-left animate-delay-1">Tư Vấn AI Cho Đám Cưới Trong Mơ</h1>
            <p className="animate-on-scroll fade-in-up animate-delay-2">
              Sử dụng công nghệ trí tuệ nhân tạo tiên tiến để lên kế hoạch cho ngày trọng đại của bạn.
              Tiết kiệm thời gian, giảm stress và tạo ra đám cưới hoàn hảo với sự hỗ trợ của AI.
            </p>
          </div>
          <DotLottiePlayer
            src={isDarkMode
              ? "https://lottie.host/79ed01b9-27c8-458b-82e8-7176b021d544/wg3zxWb9TF.lottie"
              : "https://lottie.host/f9b1866e-22cb-49bd-9cb9-e930c3e40598/lt7ug0D1H2.lottie"
            }
            autoplay
            loop
            className="ai-hero-animation animate-on-scroll slide-in-right animate-delay-3"
          />
        </div>
      </div>

      {/* Unique AI Features */}
      <section className="unique-feature-section">
        <div className="container">
          <div className="feature-content left">
            <div className="feature-text animate-on-scroll slide-in-left">
              <h2 className="animate-on-scroll fade-in-up">Tư Vấn Đa Chiều</h2>
              <p className="animate-on-scroll fade-in-up animate-delay-1">AI của chúng tôi không chỉ đơn thuần trả lời câu hỏi, mà còn phân tích và đề xuất các giải pháp tối ưu dựa trên ngân sách, sở thích và xu hướng hiện đại.</p>
              <ul className="feature-list stagger-animation animate-on-scroll">
                <li className="animate-delay-2">Phân tích chi tiết ngân sách</li>
                <li className="animate-delay-3">Đề xuất phong cách phù hợp</li>
                <li className="animate-delay-4">Tối ưu hóa chi phí</li>
              </ul>
            </div>
            <div className="feature-animation animate-on-scroll slide-in-right scale-in animate-delay-2">
              <DotLottiePlayer
                src="https://lottie.host/b7b258dd-6685-46d5-a71f-98d29c2318d7/LR7c8Rtvue.lottie"
                autoplay
                loop
              />
            </div>
          </div>
        </div>
      </section>

      <section className="unique-feature-section alternate">
        <div className="container">
          <div className="feature-content right">
            <div className="feature-animation animate-on-scroll slide-in-left scale-in">
              <DotLottiePlayer
                src="https://lottie.host/3a367d7e-cf33-4e45-8384-ce2eae1c3765/fX4T8Pwuaf.lottie"
                autoplay
                loop
              />
            </div>
            <div className="feature-text animate-on-scroll slide-in-right">
              <h2 className="animate-on-scroll fade-in-up">Trợ Lý Lên Kế Hoạch Thông Minh</h2>
              <p className="animate-on-scroll fade-in-up animate-delay-1">Chatbot AI tự động tạo timeline chi tiết và nhắc nhở các mốc quan trọng, giúp bạn không bỏ lỡ bất kỳ chi tiết nào trong quá trình chuẩn bị.</p>
              <ul className="feature-list stagger-animation animate-on-scroll">
                <li className="animate-delay-2">Timeline tự động điều chỉnh</li>
                <li className="animate-delay-3">Nhắc nhở thông minh</li>
                <li className="animate-delay-4">Quản lý công việc hiệu quả</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="unique-feature-section">
        <div className="container">
          <div className="feature-content left">
            <div className="feature-text animate-on-scroll slide-in-left">
              <h2 className="animate-on-scroll fade-in-up">Kết Nối Nhà Cung Cấp</h2>
              <p className="animate-on-scroll fade-in-up animate-delay-1">AI không chỉ gợi ý mà còn kết nối bạn với các nhà cung cấp dịch vụ uy tín, phù hợp với ngân sách và phong cách của bạn.</p>
              <ul className="feature-list stagger-animation animate-on-scroll">
                <li className="animate-delay-2">Đánh giá độc lập</li>
                <li className="animate-delay-3">So sánh giá thông minh</li>
                <li className="animate-delay-4">Đặt lịch tự động</li>
              </ul>
            </div>
            <div className="feature-animation animate-on-scroll slide-in-right scale-in animate-delay-2">
              <DotLottiePlayer
                src="https://lottie.host/e2e9f47c-e0b1-4cd9-8521-888d5bf664e4/rsWkyvE8su.lottie"
                autoplay
                loop
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-in-up">
            Tại Sao Chọn Chatbot AI Của Cuoidi.vn?
          </h2>
          <div className="benefits-grid">
            {[
              {
                icon: '🧠',
                title: 'AI Thông Minh',
                description: 'Được huấn luyện với dữ liệu từ hơn 10,000+ đám cưới thành công, hiểu rõ văn hóa Việt Nam.',
                delay: 1
              },
              {
                icon: '🎯',
                title: 'Tư Vấn Cá Nhân Hóa',
                description: 'Đề xuất được điều chỉnh theo sở thích, ngân sách và phong cách riêng của bạn.',
                delay: 2
              },
              {
                icon: '⚡',
                title: 'Phản Hồi Tức Thì',
                description: 'Trả lời ngay lập tức 24/7, tiết kiệm thời gian chờ đợi tư vấn viên.',
                delay: 3
              },
              {
                icon: '🔄',
                title: 'Tích Hợp Đa Dịch Vụ',
                description: 'Kết nối trực tiếp với các nhà cung cấp dịch vụ cưới uy tín trên nền tảng.',
                delay: 4
              },
              {
                icon: '🔒',
                title: 'Bảo Mật Thông Tin',
                description: 'Đảm bảo an toàn dữ liệu cá nhân với công nghệ mã hóa tiên tiến.',
                delay: 5
              },
              {
                icon: '📈',
                title: 'Luôn Cập Nhật',
                description: 'Thường xuyên học hỏi xu hướng cưới mới nhất để đưa ra gợi ý phù hợp.',
                delay: 6
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className={`benefit-item animate-on-scroll fade-in-up animate-delay-${benefit.delay}`}
              >
                <i className="benefit-icon">{benefit.icon}</i>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="pricing-comparison">
        <div className="container">
          <h2 className="animate-on-scroll fade-in-up">Bảng So Sánh Gói Dịch Vụ</h2>
          <div className="pricing-table animate-on-scroll fade-in-up">
            <div className="pricing-header animate-on-scroll fade-in-up">
              <div className="feature-column">Tính Năng</div>
              <div className="plan-column">Cơ Bản</div>
              <div className="plan-column">Nâng Cao</div>
              <div className="plan-column">Premium</div>
            </div>
            <div className="pricing-body stagger-animation">
              {[
                { feature: "Tư vấn qua chatbot", basic: true, advanced: true, premium: true },
                { feature: "Lập kế hoạch cơ bản", basic: true, advanced: true, premium: true },
                { feature: "Gợi ý phong cách", basic: false, advanced: true, premium: true },
                { feature: "Tư vấn ngân sách", basic: false, advanced: true, premium: true },
                { feature: "Hỗ trợ 24/7", basic: false, advanced: false, premium: true },
                { feature: "Tư vấn viên riêng", basic: false, advanced: false, premium: true },
              ].map((row, index) => (
                <div key={index} className="pricing-row">
                  <div className="feature-cell">{row.feature}</div>
                  <div className="plan-cell animate-on-scroll fade-in-up animate-delay-1">{row.basic ? "✓" : "×"}</div>
                  <div className="plan-cell animate-on-scroll fade-in-up animate-delay-2">{row.advanced ? "✓" : "×"}</div>
                  <div className="plan-cell animate-on-scroll fade-in-up animate-delay-3">{row.premium ? "✓" : "×"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Banner */}
      <section className="ad-banner">
        <div className="container">
          <div className="banner-content animate-on-scroll scale-in">
            <h2 className="animate-on-scroll fade-in-up">Bắt Đầu Lập Kế Hoạch Ngay Hôm Nay!</h2>
            <p className="animate-on-scroll fade-in-up animate-delay-1">Đăng ký ngay để nhận được sự hỗ trợ tốt nhất từ AI của chúng tôi.</p>
            <button className="cta-button animate-on-scroll fade-in-up animate-delay-2">Đăng Ký Ngay</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIConsultationPage;

