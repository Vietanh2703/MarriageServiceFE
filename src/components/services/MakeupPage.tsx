import React from 'react';
import BaseServicePage from './BaseServicePage';

const MakeupPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Bridal Beauty Studio",
      image: "/images/services/makeup/beauty-studio.jpg",
      description: "Trang điểm cô dâu chuyên nghiệp theo phong cách Hàn Quốc với kỹ thuật trang điểm hiện đại. Tôn lên vẻ đẹp tự nhiên và rạng rỡ cho cô dâu trong ngày trọng đại.",
      rating: 5,
      price: "Từ 8.000.000đ",
      features: [
        "Trang điểm theo phong cách Hàn Quốc hiện đại",
        "Sử dụng mỹ phẩm cao cấp nhập khẩu từ Hàn Quốc",
        "Đội ngũ chuyên gia trang điểm được đào tạo bài bản",
        "Dịch vụ làm tóc đi kèm với nhiều kiểu dáng",
        "Tư vấn phong cách phù hợp với khuôn mặt và trang phục"
      ],
      contact: "028.5555.5555",
      website: "https://bridalbeautystudio.vn"
    },
    {
      id: 2,
      name: "Glamour Artist",
      image: "/images/services/makeup/glamour.jpg",
      description: "Nghệ nhân trang điểm với hơn 10 năm kinh nghiệm, chuyên trang điểm cô dâu theo phong cách sang trọng, quyến rũ. Mang đến vẻ đẹp hoàn hảo cho ngày cưới của bạn.",
      rating: 5,
      price: "Từ 10.000.000đ",
      features: [
        "Trang điểm cá nhân hóa theo đặc điểm khuôn mặt",
        "Sử dụng mỹ phẩm cao cấp từ các thương hiệu nổi tiếng",
        "Kỹ thuật trang điểm bền màu, chống trôi",
        "Dịch vụ làm tóc và đính kết phụ kiện",
        "Hỗ trợ chỉnh sửa trong suốt quá trình chụp ảnh và tiệc cưới"
      ],
      contact: "028.5656.5656",
      website: "https://glamourartist.vn"
    },
    {
      id: 3,
      name: "Natural Bridal Makeup",
      image: "/images/services/makeup/natural.jpg",
      description: "Trang điểm tự nhiên, trong suốt cho cô dâu, tôn lên vẻ đẹp vốn có. Phong cách trang điểm nhẹ nhàng nhưng vẫn đủ nổi bật trong ngày cưới.",
      rating: 4,
      price: "Từ 6.000.000đ",
      features: [
        "Trang điểm theo phong cách tự nhiên, trong suốt",
        "Sử dụng mỹ phẩm organic, an toàn cho da nhạy cảm",
        "Kỹ thuật trang điểm HD, đẹp cả trong ảnh và ngoài đời",
        "Tư vấn chăm sóc da trước ngày cưới",
        "Dịch vụ làm tóc theo phong cách tự nhiên"
      ],
      contact: "028.5454.5454",
      website: "https://naturalbridalmakeup.vn"
    },
    {
      id: 4,
      name: "Celebrity Makeup Artist",
      image: "/images/services/makeup/celebrity.jpg",
      description: "Dịch vụ trang điểm cô dâu cao cấp bởi các chuyên gia trang điểm cho người nổi tiếng. Mang đến vẻ đẹp hoàn hảo như sao hạng A trong ngày trọng đại.",
      rating: 5,
      price: "Từ 15.000.000đ",
      features: [
        "Trang điểm bởi các chuyên gia hàng đầu trong ngành",
        "Sử dụng mỹ phẩm cao cấp từ các thương hiệu quốc tế",
        "Phong cách trang điểm đa dạng từ cổ điển đến hiện đại",
        "Dịch vụ làm tóc và tư vấn phong cách toàn diện",
        "Hỗ trợ trang điểm cho cả gia đình cô dâu chú rể"
      ],
      contact: "028.5353.5353",
      website: "https://celebritymakeupartist.vn"
    }
  ];

  const introduction = {
    title: "Tôn vinh vẻ đẹp tự nhiên của cô dâu",
    content: "Trang điểm cô dâu là nghệ thuật tôn vinh vẻ đẹp tự nhiên và tạo nên diện mạo hoàn hảo cho ngày trọng đại. Chúng tôi hiểu rằng mỗi cô dâu đều có nét đẹp và phong cách riêng, vì vậy dịch vụ trang điểm của chúng tôi luôn được cá nhân hóa để phù hợp với từng khách hàng. Từ phong cách trang điểm tự nhiên, trong suốt đến quyến rũ, sang trọng, từ kiểu tóc cổ điển đến hiện đại, đội ngũ chuyên gia trang điểm và làm tóc của chúng tôi sẽ tư vấn và thực hiện để mang đến vẻ đẹp hoàn hảo nhất cho bạn trong ngày cưới, giúp bạn tự tin tỏa sáng và lưu lại những khoảnh khắc đẹp nhất.",
    image: "/images/services/makeup/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ trang điểm của chúng tôi",
    items: [
      {
        title: "Chuyên gia trang điểm hàng đầu",
        description: "Đội ngũ chuyên gia trang điểm và làm tóc với nhiều năm kinh nghiệm, được đào tạo bài bản từ các trường lớp chuyên nghiệp trong và ngoài nước.",
        icon: "💄"
      },
      {
        title: "Mỹ phẩm cao cấp",
        description: "Sử dụng các sản phẩm mỹ phẩm cao cấp từ các thương hiệu nổi tiếng thế giới, an toàn cho da và có độ bền cao, giúp bạn luôn đẹp từ sáng sớm đến tối muộn.",
        icon: "✨"
      },
      {
        title: "Tư vấn phong cách",
        description: "Tư vấn phong cách trang điểm và kiểu tóc phù hợp với đặc điểm khuôn mặt, màu da và trang phục cưới, giúp bạn có diện mạo hài hòa và nổi bật.",
        icon: "👸"
      },
      {
        title: "Dịch vụ tận nơi",
        description: "Dịch vụ trang điểm tận nơi, linh hoạt theo lịch trình của bạn, giúp tiết kiệm thời gian và đảm bảo sự thuận tiện trong ngày cưới bận rộn.",
        icon: "🚗"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ trang điểm",
    items: [
      {
        title: "Đặt lịch và tư vấn",
        description: "Đặt lịch trước ít nhất 1-2 tháng để đảm bảo sự sẵn sàng. Buổi tư vấn và thử trang điểm miễn phí để xác định phong cách phù hợp nhất."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán số còn lại sau khi hoàn thành dịch vụ trong ngày cưới."
      },
      {
        title: "Chăm sóc da trước cưới",
        description: "Tư vấn chăm sóc da miễn phí trước ngày cưới. Khuyến nghị thực hiện các liệu trình chăm sóc da cơ bản ít nhất 1 tháng trước ngày cưới."
      },
      {
        title: "Dịch vụ bổ sung",
        description: "Dịch vụ trang điểm cho người thân (mẹ cô dâu, phù dâu) với giá ưu đãi. Dịch vụ chỉnh sửa trang điểm trong suốt quá trình chụp ảnh và tiệc cưới."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Trang Điểm Cô Dâu"
      description="Dịch vụ trang điểm chuyên nghiệp giúp tôn lên vẻ đẹp tự nhiên của cô dâu. Từ phong cách tự nhiên đến quyến rũ sang trọng, chúng tôi mang đến vẻ đẹp hoàn hảo cho ngày cưới đặc biệt của bạn."
      heroImage="/trang-diem.jpeg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default MakeupPage;
