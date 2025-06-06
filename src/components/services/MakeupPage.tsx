import React from 'react';
import BaseServicePage from './BaseServicePage';

const MakeupPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Bridal Beauty Studio",
      image: "/images/services/makeup/beauty-studio.jpg",
      description: "Trang điểm cô dâu chuyên nghiệp, phong cách Hàn Quốc",
      rating: 5,
      price: "Từ 8.000.000đ"
    },
    {
      id: 2,
      name: "Glamour Artist",
      image: "/images/services/makeup/glamour.jpg",
      description: "Nghệ nhân trang điểm với hơn 10 năm kinh nghiệm",
      rating: 5,
      price: "Từ 10.000.000đ"
    },
    {
      id: 3,
      name: "Natural Bridal Makeup",
      image: "/images/services/makeup/natural.jpg",
      description: "Trang điểm tự nhiên, trong suốt cho cô dâu",
      rating: 4,
      price: "Từ 6.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Trang Điểm Cô Dâu"
      description="Dịch vụ trang điểm chuyên nghiệp giúp tôn lên vẻ đẹp tự nhiên của cô dâu"
      heroImage="/images/services/makeup/hero-makeup.jpg"
      partners={partners}
    />
  );
};

export default MakeupPage;
