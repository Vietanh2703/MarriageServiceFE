import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingAttirePage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Bridal",
      image: "/images/services/attire/luxury-bridal.jpg",
      description: "Váy cưới cao cấp, thiết kế độc quyền",
      rating: 5,
      price: "Từ 25.000.000đ"
    },
    {
      id: 2,
      name: "Modern Suit Studio",
      image: "/images/services/attire/modern-suit.jpg",
      description: "Vest cưới cao cấp, may đo theo yêu cầu",
      rating: 5,
      price: "Từ 15.000.000đ"
    },
    {
      id: 3,
      name: "Traditional Wedding Dress",
      image: "/images/services/attire/traditional.jpg",
      description: "Áo dài cưới truyền thống và hiện đại",
      rating: 4,
      price: "Từ 10.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Trang Phục Cưới"
      description="Trang phục cưới độc đáo và sang trọng cho cô dâu chú rể"
      heroImage="/images/services/attire/hero-attire.jpg"
      partners={partners}
    />
  );
};

export default WeddingAttirePage;
