import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingCarsPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Car Service",
      image: "/images/services/cars/luxury-cars.jpg",
      description: "Dàn xe cao cấp Mercedes, BMW, Rolls-Royce",
      rating: 5,
      price: "Từ 15.000.000đ"
    },
    {
      id: 2,
      name: "Classic Wedding Cars",
      image: "/images/services/cars/classic-cars.jpg",
      description: "Xe cổ điển sang trọng cho ngày cưới",
      rating: 4,
      price: "Từ 20.000.000đ"
    },
    {
      id: 3,
      name: "VIP Car Rental",
      image: "/images/services/cars/vip-cars.jpg",
      description: "Dịch vụ cho thuê xe cưới trọn gói",
      rating: 5,
      price: "Từ 12.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Xe Cưới"
      description="Lựa chọn phương tiện di chuyển sang trọng và đẳng cấp cho ngày trọng đại"
      heroImage="/images/services/cars/hero-cars.jpg"
      partners={partners}
    />
  );
};

export default WeddingCarsPage;
