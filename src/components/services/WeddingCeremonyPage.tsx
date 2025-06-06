import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingCeremonyPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Trung tâm tiệc cưới Diamond Palace",
      image: "/images/services/ceremony/diamond-palace.jpg",
      description: "Không gian sang trọng với sảnh tiệc hiện đại, dịch vụ chuyên nghiệp",
      rating: 5,
      price: "Từ 150.000.000đ"
    },
    {
      id: 2,
      name: "White Palace Convention",
      image: "/images/services/ceremony/white-palace.jpg",
      description: "Trung tâm hội nghị và tiệc cưới đẳng cấp quốc tế",
      rating: 5,
      price: "Từ 200.000.000đ"
    },
    {
      id: 3,
      name: "Garden Palace",
      image: "/images/services/ceremony/garden-palace.jpg",
      description: "Tiệc cưới ngoài trời với không gian xanh tuyệt đẹp",
      rating: 4,
      price: "Từ 100.000.000đ"
    }
  ];

  return (
    <BaseServicePage
      title="Hình Thức Lễ Cưới"
      description="Khám phá đa dạng các hình thức tổ chức tiệc cưới từ truyền thống đến hiện đại, trong nhà hoặc ngoài trời"
      heroImage="/images/services/ceremony/hero-ceremony.jpg"
      partners={partners}
    />
  );
};

export default WeddingCeremonyPage;
