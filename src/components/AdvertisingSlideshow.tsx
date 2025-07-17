import React, { useState, useEffect, useRef } from 'react';
import './AdvertisingSlideshow.css';

type AdvertisingSlideshowProps = object;

const AdvertisingSlideshow: React.FC<AdvertisingSlideshowProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Váy Cưới Cao Cấp - Giảm 30%",
      description: "Bộ sưu tập váy cưới mới nhất đã về! Đặt lịch thử đồ ngay hôm nay để nhận ưu đãi đặc biệt.",
      image: "/vay-cuoi.jpg",
      bgColor: "#fff8e1",
    },
    {
      title: "Dịch Vụ Trang Điểm Chuyên Nghiệp",
      description: "Tỏa sáng trong ngày trọng đại với dịch vụ trang điểm từ các chuyên gia hàng đầu.",
      image: "/trang-diem.jpeg",
      bgColor: "#e3f2fd",
    },
    {
      title: "Ẩm Thực Đẳng Cấp - Ưu Đãi 20%",
      description: "Thực đơn tiệc cưới đa dạng từ Á đến Âu, phục vụ tận tình cho ngày vui của bạn.",
      image: "/nau-an.jpg",
      bgColor: "#e8f5e9",
    },
    {
      title: "Dịch Vụ Xe Cưới Sang Trọng",
      description: "Đa dạng mẫu xe từ cổ điển đến hiện đại, trang trí theo yêu cầu riêng của bạn.",
      image: "/xe-cuoi.jpg",
      bgColor: "#f3e5f5",
    },
    {
      title: "Thiệp Cưới Độc Đáo - Mẫu Mới 2025",
      description: "Bộ sưu tập thiệp cưới với thiết kế tinh tế, in ấn chất lượng cao. Đặt ngay hôm nay!",
      image: "/thiep-cuoi.jpg",
      bgColor: "#ffebee",
    },
    {
      title: "Chụp Ảnh Cưới Chuyên Nghiệp",
      description: "Lưu giữ khoảnh khắc đẹp nhất trong ngày trọng đại với đội ngũ nhiếp ảnh gia hàng đầu.",
      image: "/photo-service.jpg",
      bgColor: "#e0f7fa",
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // Continuous sliding without stopping
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slidesContainerRef.current) {
      const slideWidth = slidesContainerRef.current.clientWidth;
      slidesContainerRef.current.style.transition = `transform 0.5s ease-in-out`;
      slidesContainerRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  }, [currentSlide]);

  return (
    <div className="advertising-slideshow">
      <div
        className="ad-slides-container"
        ref={slidesContainerRef}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="ad-slide" style={{ backgroundColor: slide.bgColor }}>
            <div className="ad-slide-content">
              <div className="ad-label">Quảng Cáo</div>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href="#" className="ad-slide-btn">Xem ngay</a>
            </div>
            <div className="ad-slide-image">
              <img src={slide.image} alt={slide.title} className="ad-image" />
            </div>
          </div>
        ))}
      </div>

      <button className="ad-slide-nav prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="ad-slide-nav next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="ad-slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`ad-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Added spacer div for additional bottom padding */}
      <div className="ad-slide-bottom-spacer"></div>
    </div>
  );
}

export default AdvertisingSlideshow;
