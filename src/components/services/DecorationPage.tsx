import React from 'react';
import BaseServicePage from './BaseServicePage';

const DecorationPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Wedding Decor Studio",
      image: "/images/services/decoration/decor-studio.jpg",
      description: "Thiết kế và trang trí tiệc cưới theo phong cách hiện đại, sang trọng",
      rating: 5,
      price: "Từ 50.000.000đ"
    },
    {
      id: 2,
      name: "Rustic Wedding Decoration",
      image: "/images/services/decoration/rustic-decor.jpg",
      description: "Chuyên trang trí tiệc cưới phong cách rustic độc đáo",
      rating: 4,
      price: "Từ 35.000.000đ"
    },
    {
      id: 3,
      name: "Luxury Flower Design",
      image: "/images/services/decoration/flower-design.jpg",
      description: "Trang trí hoa tươi cao cấp cho tiệc cưới",
      rating: 5,
      price: "Từ 45.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Trang Trí Tiệc Cưới"
      description="Biến không gian cưới của bạn thành thiên đường với các dịch vụ trang trí đẳng cấp"
      heroImage="/images/services/decoration/hero-decoration.jpg"
      partners={partners}
    />
  );
};

export default DecorationPage;
