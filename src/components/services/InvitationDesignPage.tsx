import React from 'react';
import BaseServicePage from './BaseServicePage';

const InvitationDesignPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Creative Wedding Cards",
      image: "/images/services/invitation/creative-cards.jpg",
      description: "Thiết kế thiệp cưới độc đáo, sáng tạo",
      rating: 5,
      price: "Từ 15.000đ/thiệp"
    },
    {
      id: 2,
      name: "Digital Invitation Studio",
      image: "/images/services/invitation/digital.jpg",
      description: "Thiệp cưới điện tử và video invitation",
      rating: 4,
      price: "Từ 2.000.000đ"
    },
    {
      id: 3,
      name: "Luxury Paper Art",
      image: "/images/services/invitation/luxury.jpg",
      description: "Thiệp cưới cao cấp với chất liệu đặc biệt",
      rating: 5,
      price: "Từ 35.000đ/thiệp"
    }
  ];

  return (
    <BaseServicePage
      title="Thiết Kế Thiệp Cưới"
      description="Thiệp cưới độc đáo và ấn tượng, thể hiện cá tính riêng của bạn"
      heroImage="/images/services/invitation/hero-invitation.jpg"
      partners={partners}
    />
  );
};

export default InvitationDesignPage;
