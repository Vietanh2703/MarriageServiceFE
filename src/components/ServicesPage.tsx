import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AuthPromptModal from './AuthPromptModal';
import './ServicesPage.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Tư vấn hình thức Lễ Cưới",
    description: "Dịch vụ tư vấn chuyên nghiệp giúp bạn lên kế hoạch cho ngày cưới hoàn hảo.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 2,
    title: "Trang trí Tiệc cưới",
    description: "Dịch vụ trang trí tiệc cưới độc đáo, sang trọng theo chủ đề bạn mong muốn.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 3,
    title: "Chụp ảnh & Quay phim",
    description: "Ghi lại những khoảnh khắc đẹp nhất trong ngày cưới của bạn.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 4,
    title: "Xe cưới",
    description: "Dịch vụ xe cưới cao cấp, đa dạng mẫu mã để lựa chọn.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 5,
    title: "Váy cưới & Trang phục",
    description: "Cho thuê và tư vấn váy cưới, vest chú rể theo xu hướng mới nhất.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 6,
    title: "Dịch vụ Ẩm thực",
    description: "Thực đơn phong phú với các món ăn đặc sắc, phục vụ theo phong cách chuyên nghiệp.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 7,
    title: "Trang điểm Cô dâu",
    description: "Dịch vụ trang điểm chuyên nghiệp, tôn lên vẻ đẹp tự nhiên trong ngày cưới.",
    image: "/wedding-couple.jpg"
  },
  {
    id: 8,
    title: "Thiết kế Thiệp cưới",
    description: "Thiết kế thiệp cưới độc đáo, phong cách riêng theo yêu cầu của bạn.",
    image: "/wedding-couple.jpg"
  }
];

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`services-container ${isDarkMode ? 'dark-theme' : ''}`}>
      <Navbar />
      <section className="services-page-hero">
        <h1 className="services-page-title">Dịch Vụ Đối Tác</h1>
        <p className="services-page-subtitle">
          Khám phá các dịch vụ cưới chất lượng cao từ các đối tác uy tín hàng đầu của chúng tôi
        </p>
        <div className="services-page-hero-buttons">
          <button
            className="hero-button"
            onClick={() => setIsInfoModalOpen(true)}
          >
            Đăng kí & Trải nghiệm ngay
          </button>
        </div>
      </section>

      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Tìm kiếm dịch vụ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="services-grid" className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-header">
            <h2 className="benefits-title">Lợi Ích Khi Chọn Chúng Tôi</h2>
            <p className="benefits-subtitle">
              Khám phá những giá trị độc đáo mà chúng tôi mang lại cho ngày cưới của bạn
            </p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3 className="benefit-title">Đối Tác Uy Tín</h3>
              <p className="benefit-description">
                Tất cả đối tác đều được thẩm định kỹ lưỡng về chất lượng và uy tín
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Giá Cả Hợp Lý</h3>
              <p className="benefit-description">
                Cam kết mức giá tốt nhất với chất lượng dịch vụ cao cấp
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3 className="benefit-title">Dịch Vụ Đa Dạng</h3>
              <p className="benefit-description">
                Đáp ứng mọi nhu cầu với đa dạng lựa chọn và phong cách
              </p>
            </div>
          </div>
        </div>
      </section>

      <AuthPromptModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ServicesPage;

