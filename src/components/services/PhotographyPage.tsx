import React from 'react';
import BaseServicePage from './BaseServicePage';

const PhotographyPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Wedding Studio",
      image: "/images/services/photography/luxury-studio.jpg",
      description: "Chuyên chụp ảnh cưới cao cấp trong và ngoài nước",
      rating: 5,
      price: "Từ 30.000.000đ"
    },
    {
      id: 2,
      name: "Cinematic Films",
      image: "/images/services/photography/cinematic.jpg",
      description: "Quay phim phong cách điện ảnh, kể chuyện bằng hình ảnh",
      rating: 5,
      price: "Từ 25.000.000đ"
    },
    {
      id: 3,
      name: "Moment Catchers",
      image: "/images/services/photography/moment.jpg",
      description: "Ghi lại những khoảnh khắc đẹp nhất trong ngày cưới",
      rating: 4,
      price: "Từ 20.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Chụp Ảnh & Quay Phim"
      description="Lưu giữ những khoảnh khắc đẹp nhất trong ngày trọng đại của bạn"
      heroImage="/images/services/photography/hero-photo.jpg"
      partners={partners}
    />
  );
};

export default PhotographyPage;
