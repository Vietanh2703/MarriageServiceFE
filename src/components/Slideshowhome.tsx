import React, { useState, useEffect } from 'react';
import './Slideshowhome.css';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const slides = [
    {
        img: '/welcome.png',
        title: 'Chào mừng đến với Cuoidi.vn',
        desc: 'Nơi biến ước mơ thành hiện thực cho ngày trọng đại của bạn',
        cta: 'Bắt Đầu Ngay',
        link: '/login',
    },
    {
        img: '/decor.jpg',
        title: 'Không Gian Cưới Trong Mơ',
        desc: 'Đa dạng phong cách trang trí từ hiện đại đến truyền thống',
        cta: 'Tìm hiểu thêm',
        link: '/services/decoration',
    },
    {
        img: '/photo-service.jpg',
        title: 'Khoảnh Khắc Vĩnh Cửu',
        desc: 'Album cưới độc đáo với ekip chuyên nghiệp hàng đầu',
        cta: 'Tìm hiểu thêm',
        link: '/services/photography',
    },
    {
        img: '/vay-cuoi.jpg',
        title: 'Váy Cưới Cao Cấp',
        desc: 'Bộ sưu tập váy cưới đẳng cấp từ các nhà thiết kế nổi tiếng',
        cta: 'Tìm hiểu thêm',
        link: '/services/wedding-attire',
    }
];

const Slideshowhome: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Chuyển slide mỗi 5 giây

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="slideshowhome">
            <div className="slides-container">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.img})` }}
                    >
                        <div className="slide-overlay"></div>
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.desc}</p>
                            <Link to={slide.link} className="cta-button">
                                {slide.cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="slide-arrow prev" onClick={prevSlide}>
                <FaArrowLeft />
            </button>
            <button className="slide-arrow next" onClick={nextSlide}>
                <FaArrowRight />
            </button>
            <div className="slide-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slideshowhome;
