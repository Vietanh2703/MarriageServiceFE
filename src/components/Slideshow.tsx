import React, { useState, useEffect } from 'react';
import './Slideshow.css';

type SlideshowProps = object;

const Slideshow: React.FC<SlideshowProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Dịch Vụ Âm Nhạc Đẳng Cấp",
      description: "Tạo không khí lãng mạn với âm nhạc sống từ các nghệ sĩ hàng đầu",
      icon: "♫",
      bgColor: "#ffebee",
      accentColor: "#ef9a9a"
    },
    {
      title: "Trang Trí Tiệc Cưới Sang Trọng",
      description: "Biến không gian cưới thành thiên đường với dịch vụ trang trí đẳng cấp",
      icon: "✿",
      bgColor: "#e3f2fd",
      accentColor: "#90caf9"
    },
    {
      title: "Ẩm Thực Đa Dạng",
      description: "Thực đơn phong phú từ các đầu bếp hàng đầu cho tiệc cưới của bạn",
      icon: "🍽️",
      bgColor: "#e8f5e9",
      accentColor: "#a5d6a7"
    },
    {
      title: "Trang Phục Cưới Tinh Tế",
      description: "Váy cưới, áo dài, vest sang trọng và đẳng cấp cho cặp đôi và quan khách",
      icon: "👗",
      bgColor: "#fff8e1",
      accentColor: "#ffe082"
    },
    {
      title: "Dịch Vụ Chụp Ảnh Chuyên Nghiệp",
      description: "Lưu giữ khoảnh khắc đẹp nhất trong ngày trọng đại của bạn",
      icon: "📷",
      bgColor: "#f3e5f5",
      accentColor: "#ce93d8"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
      <div className="slideshow">
        <div
            className="slides-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
              <div key={index} className="slide" style={{ backgroundColor: slide.bgColor }}>
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <a href="#" className="slide-btn">Tìm hiểu thêm</a>
                </div>
                <div className="slide-image">
                  <div className="placeholder-image" style={{ backgroundColor: slide.accentColor }}>
                    <span className="slide-icon">{slide.icon}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <button className="slide-nav prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slide-nav next" onClick={nextSlide}>
          &#10095;
        </button>

        <div className="slide-indicators">
          {slides.map((_, index) => (
              <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
              />
          ))}
        </div>
      </div>
  );
};

export default Slideshow;