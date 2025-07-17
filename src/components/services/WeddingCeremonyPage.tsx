import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingCeremonyPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Trung tâm tiệc cưới Diamond Palace",
      image: "/images/services/ceremony/diamond-palace.jpg",
      description: "Không gian sang trọng với sảnh tiệc hiện đại, dịch vụ chuyên nghiệp và đẳng cấp. Tạo nên những kỷ niệm đáng nhớ cho ngày trọng đại của bạn.",
      rating: 5,
      price: "Từ 150.000.000đ",
      features: [
        "Sảnh tiệc sang trọng với sức chứa lên đến 1000 khách",
        "Đội ngũ nhân viên phục vụ chuyên nghiệp",
        "Trang trí theo chủ đề tùy chọn",
        "Hệ thống âm thanh, ánh sáng hiện đại",
        "Dịch vụ ẩm thực đa dạng với các món Á - Âu"
      ],
      contact: "028.7108.8888",
      website: "https://diamondpalace.vn"
    },
    {
      id: 2,
      name: "White Palace Convention",
      image: "/images/services/ceremony/white-palace.jpg",
      description: "Trung tâm hội nghị và tiệc cưới đẳng cấp quốc tế với kiến trúc châu Âu sang trọng. Không gian lý tưởng cho một đám cưới hoàn hảo.",
      rating: 5,
      price: "Từ 200.000.000đ",
      features: [
        "Không gian tiệc cưới theo phong cách châu Âu",
        "Hệ thống 5 sảnh tiệc lớn với sức chứa đa dạng",
        "Dịch vụ trang trí cao cấp",
        "Đội ngũ đầu bếp 5 sao",
        "Bãi đỗ xe rộng rãi và dịch vụ valet parking"
      ],
      contact: "028.3997.2222",
      website: "https://whitepalace.com.vn"
    },
    {
      id: 3,
      name: "Garden Palace",
      image: "/images/services/ceremony/garden-palace.jpg",
      description: "Tiệc cưới ngoài trời với không gian xanh tuyệt đẹp, mang đến cảm giác gần gũi thiên nhiên và lãng mạn cho ngày trọng đại của bạn.",
      rating: 4,
      price: "Từ 100.000.000đ",
      features: [
        "Không gian sân vườn rộng lớn với cảnh quan thiên nhiên",
        "Trang trí theo phong cách rustic hoặc bohemian",
        "Dịch vụ chụp ảnh cưới tại khuôn viên",
        "Lựa chọn thực đơn đa dạng",
        "Khu vực riêng tư cho gia đình"
      ],
      contact: "028.6680.6868",
      website: "https://gardenpalace.vn"
    },
    {
      id: 4,
      name: "Royal Palace Wedding Center",
      image: "/images/services/ceremony/royal-palace.jpg",
      description: "Trung tâm tiệc cưới hoàng gia với không gian lộng lẫy và dịch vụ hoàn hảo. Nơi biến giấc mơ cổ tích thành hiện thực.",
      rating: 5,
      price: "Từ 180.000.000đ",
      features: [
        "Kiến trúc hoàng gia sang trọng",
        "Dịch vụ trang trí theo chủ đề cá nhân hóa",
        "Đội ngũ tư vấn chuyên nghiệp",
        "Thực đơn đa dạng với các món đặc sắc",
        "Dịch vụ trọn gói từ A-Z"
      ],
      contact: "028.3838.6868",
      website: "https://royalpalace.vn"
    }
  ];

  const introduction = {
    title: "Tổ chức lễ cưới hoàn hảo",
    content: "Lễ cưới là một trong những khoảnh khắc quan trọng nhất trong cuộc đời mỗi người. Chúng tôi hiểu rằng mỗi cặp đôi đều mong muốn có một lễ cưới độc đáo và ý nghĩa, phản ánh cá tính và tình yêu của họ. Từ những buổi lễ truyền thống đến những bữa tiệc hiện đại, từ không gian trong nhà sang trọng đến khu vườn ngoài trời lãng mạn, chúng tôi cung cấp đa dạng các hình thức tổ chức lễ cưới để đáp ứng mọi mong muốn của bạn. Đội ngũ chuyên gia của chúng tôi sẽ đồng hành cùng bạn trong từng bước, từ lên ý tưởng, lập kế hoạch đến thực hiện, đảm bảo ngày trọng đại của bạn diễn ra suôn sẻ và đáng nhớ.",
    image: "/images/services/ceremony/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ của chúng tôi",
    items: [
      {
        title: "Đa dạng lựa chọn",
        description: "Chúng tôi cung cấp nhiều hình thức tổ chức lễ cưới khác nhau, từ truyền thống đến hiện đại, từ trong nhà đến ngoài trời, giúp bạn dễ dàng tìm được phong cách phù hợp.",
        icon: "🏛️"
      },
      {
        title: "Đội ngũ chuyên nghiệp",
        description: "Với đội ngũ tổ chức sự kiện giàu kinh nghiệm, chúng tôi đảm bảo mọi chi tiết trong ngày cưới của bạn đều được chăm chút tỉ mỉ và diễn ra suôn sẻ.",
        icon: "👥"
      },
      {
        title: "Dịch vụ trọn gói",
        description: "Từ địa điểm, trang trí, ẩm thực đến âm thanh, ánh sáng, chúng tôi cung cấp dịch vụ trọn gói giúp bạn tiết kiệm thời gian và công sức.",
        icon: "📦"
      },
      {
        title: "Tùy chỉnh theo yêu cầu",
        description: "Chúng tôi hiểu rằng mỗi cặp đôi đều có những mong muốn riêng. Vì vậy, dịch vụ của chúng tôi luôn có thể tùy chỉnh để đáp ứng nhu cầu cụ thể của bạn.",
        icon: "🎨"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ",
    items: [
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán 50% giá trị hợp đồng trước ngày cưới 30 ngày. Thanh toán số còn lại sau khi kết thúc sự kiện."
      },
      {
        title: "Hủy và hoàn tiền",
        description: "Hủy trước 90 ngày: hoàn 100% tiền cọc. Hủy trước 60 ngày: hoàn 50% tiền cọc. Hủy trước 30 ngày: không hoàn tiền cọc."
      },
      {
        title: "Thay đổi dịch vụ",
        description: "Thay đổi dịch vụ có thể được thực hiện trước ngày cưới 45 ngày mà không mất phí. Sau thời gian này, mọi thay đổi sẽ phụ thuộc vào tình trạng sẵn có và có thể phát sinh phí."
      },
      {
        title: "Bảo hiểm sự kiện",
        description: "Chúng tôi cung cấp gói bảo hiểm sự kiện tùy chọn để bảo vệ bạn trước những tình huống không lường trước như thời tiết xấu, bệnh tật, hoặc các vấn đề khác."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Hình Thức Lễ Cưới"
      description="Khám phá đa dạng các hình thức tổ chức tiệc cưới từ truyền thống đến hiện đại, trong nhà hoặc ngoài trời. Chúng tôi mang đến những lựa chọn hoàn hảo cho ngày trọng đại của bạn."
      heroImage="/hinh-thuc-cuoi.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default WeddingCeremonyPage;
