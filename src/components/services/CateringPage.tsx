import React from 'react';
import BaseServicePage from './BaseServicePage';

const CateringPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Gourmet Wedding Kitchen",
      image: "/images/services/catering/gourmet.jpg",
      description: "Ẩm thực cao cấp kết hợp Á - Âu",
      rating: 5,
      price: "Từ 350.000đ/phần"
    },
    {
      id: 2,
      name: "Traditional Feast",
      image: "/images/services/catering/traditional.jpg",
      description: "Ẩm thực truyền thống Việt Nam",
      rating: 4,
      price: "Từ 250.000đ/phần"
    },
    {
      id: 3,
      name: "Royal Catering",
      image: "/images/services/catering/royal.jpg",
      description: "Dịch vụ ẩm thực cao cấp và trang trí bàn tiệc",
      rating: 5,
      price: "Từ 400.000đ/phần"
    }
  ];

  return (
    <BaseServicePage
      title="Dịch Vụ Ẩm Thực"
      description="Thực đơn đa dạng, phong phú với các món ăn độc đáo và hấp dẫn"
      heroImage="/images/services/catering/hero-catering.jpg"
      partners={partners}
    />
  );
};

export default CateringPage;
