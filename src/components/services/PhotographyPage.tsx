import React from 'react';
import BaseServicePage from './BaseServicePage';

const PhotographyPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Wedding Studio",
      image: "/images/services/photography/luxury-studio.jpg",
      description: "Chuyên chụp ảnh cưới cao cấp trong và ngoài nước với đội ngũ nhiếp ảnh gia chuyên nghiệp. Mang đến những bộ ảnh cưới nghệ thuật, sang trọng và đầy cảm xúc.",
      rating: 5,
      price: "Từ 30.000.000đ",
      features: [
        "Đội ngũ nhiếp ảnh gia với hơn 10 năm kinh nghiệm",
        "Trang thiết bị chụp ảnh hiện đại, cao cấp",
        "Địa điểm chụp đa dạng trong và ngoài nước",
        "Trang phục, phụ kiện đa dạng và cao cấp",
        "Hậu kỳ chuyên nghiệp, album thiết kế sang trọng"
      ],
      contact: "028.6868.6868",
      website: "https://luxuryweddingstudio.vn"
    },
    {
      id: 2,
      name: "Cinematic Films",
      image: "/images/services/photography/cinematic.jpg",
      description: "Quay phim phong cách điện ảnh, kể chuyện bằng hình ảnh. Biến câu chuyện tình yêu của bạn thành một bộ phim ngắn đầy cảm xúc và nghệ thuật.",
      rating: 5,
      price: "Từ 25.000.000đ",
      features: [
        "Quay phim bằng thiết bị chuyên nghiệp chuẩn điện ảnh",
        "Đạo diễn và quay phim với kinh nghiệm làm phim",
        "Kịch bản được xây dựng riêng cho từng cặp đôi",
        "Kỹ thuật dựng phim hiện đại với hiệu ứng đặc biệt",
        "Nhạc phim được sáng tác hoặc chọn lọc phù hợp"
      ],
      contact: "028.6969.6969",
      website: "https://cinematicfilms.vn"
    },
    {
      id: 3,
      name: "Moment Catchers",
      image: "/images/services/photography/moment.jpg",
      description: "Ghi lại những khoảnh khắc đẹp nhất trong ngày cưới với phong cách tự nhiên, chân thực. Lưu giữ từng cảm xúc, nụ cười và giọt nước mắt hạnh phúc.",
      rating: 4,
      price: "Từ 20.000.000đ",
      features: [
        "Chụp ảnh phóng sự cưới chuyên nghiệp",
        "Ghi lại khoảnh khắc tự nhiên, không pose dáng",
        "Đội ngũ nhiếp ảnh gia giàu kinh nghiệm",
        "Album thiết kế theo phong cách báo chí",
        "Bàn giao nhanh chóng trong vòng 7-10 ngày"
      ],
      contact: "028.6767.6767",
      website: "https://momentcatchers.vn"
    },
    {
      id: 4,
      name: "Destination Wedding Photography",
      image: "/images/services/photography/destination.jpg",
      description: "Dịch vụ chụp ảnh cưới tại các điểm đến nổi tiếng trong và ngoài nước. Mang đến những bộ ảnh độc đáo với phong cảnh tuyệt đẹp từ khắp nơi trên thế giới.",
      rating: 5,
      price: "Từ 50.000.000đ",
      features: [
        "Chụp ảnh tại các điểm đến nổi tiếng: Santorini, Bali, Paris...",
        "Hỗ trợ thủ tục visa, đặt vé máy bay, khách sạn",
        "Trang phục cao cấp phù hợp với từng địa điểm",
        "Ekip chuyên nghiệp, có kinh nghiệm quốc tế",
        "Album photobook cao cấp, in ấn tại Nhật Bản"
      ],
      contact: "028.6666.6666",
      website: "https://destinationwedding.vn"
    }
  ];

  const introduction = {
    title: "Lưu giữ khoảnh khắc đẹp nhất của tình yêu",
    content: "Ngày cưới là một trong những ngày đặc biệt nhất trong cuộc đời, và những khoảnh khắc quý giá trong ngày này xứng đáng được lưu giữ một cách nghệ thuật và chuyên nghiệp. Dịch vụ chụp ảnh và quay phim cưới của chúng tôi không chỉ đơn thuần là ghi lại hình ảnh, mà còn là nghệ thuật kể chuyện bằng hình ảnh, lưu giữ từng cảm xúc, nụ cười và giọt nước mắt hạnh phúc trong ngày trọng đại. Với đội ngũ nhiếp ảnh gia và quay phim chuyên nghiệp, trang thiết bị hiện đại cùng phong cách sáng tạo đa dạng, chúng tôi cam kết mang đến những bộ ảnh cưới và video cưới đẹp nhất, giúp bạn lưu giữ và tái hiện những kỷ niệm đáng nhớ của ngày cưới trong nhiều năm sau.",
    image: "/images/services/photography/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ của chúng tôi",
    items: [
      {
        title: "Đội ngũ chuyên nghiệp",
        description: "Đội ngũ nhiếp ảnh gia và quay phim với nhiều năm kinh nghiệm, được đào tạo bài bản và có con mắt nghệ thuật tinh tế, đảm bảo chất lượng hình ảnh hoàn hảo.",
        icon: "📸"
      },
      {
        title: "Trang thiết bị hiện đại",
        description: "Sử dụng máy ảnh, máy quay phim, ống kính và phụ kiện cao cấp nhất từ các thương hiệu hàng đầu, đảm bảo chất lượng hình ảnh sắc nét và chuyên nghiệp.",
        icon: "🎥"
      },
      {
        title: "Đa dạng phong cách",
        description: "Từ phong cách cổ điển, lãng mạn đến hiện đại, từ chụp ảnh tự nhiên đến điện ảnh, chúng tôi đáp ứng mọi sở thích và yêu cầu của bạn.",
        icon: "🎭"
      },
      {
        title: "Hậu kỳ chuyên nghiệp",
        description: "Đội ngũ biên tập và xử lý hình ảnh chuyên nghiệp, sử dụng các phần mềm hiện đại để tạo ra những sản phẩm hoàn hảo từ màu sắc đến bố cục.",
        icon: "💻"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ",
    items: [
      {
        title: "Đặt lịch và tư vấn",
        description: "Đặt lịch trước ít nhất 2-3 tháng để đảm bảo sự sẵn sàng. Buổi tư vấn miễn phí để hiểu rõ nhu cầu và mong muốn của bạn, từ đó xây dựng concept phù hợp."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán 50% trước ngày chụp ảnh/quay phim. Thanh toán số còn lại khi nhận sản phẩm hoàn thiện."
      },
      {
        title: "Thời gian giao sản phẩm",
        description: "Ảnh cưới: 15-30 ngày làm việc. Video cưới: 30-45 ngày làm việc. Ảnh phóng sự cưới: 7-10 ngày làm việc. Video phóng sự cưới: 15-20 ngày làm việc."
      },
      {
        title: "Bảo hành và lưu trữ",
        description: "Bảo hành album và sản phẩm in ấn trong 1 năm. Lưu trữ file gốc trong 2 năm, khách hàng có thể yêu cầu bản sao với chi phí phát sinh."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Chụp Ảnh & Quay Phim"
      description="Lưu giữ những khoảnh khắc đẹp nhất trong ngày trọng đại của bạn với dịch vụ chụp ảnh và quay phim chuyên nghiệp. Từ phong cách điện ảnh đến phóng sự cưới tự nhiên, chúng tôi mang đến những hình ảnh sống động và đầy cảm xúc."
      heroImage="/photo-service.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default PhotographyPage;
