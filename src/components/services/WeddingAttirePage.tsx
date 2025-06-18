import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingAttirePage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Bridal",
      image: "/images/services/attire/luxury-bridal.jpg",
      description: "Váy cưới cao cấp với thiết kế độc quyền từ các nhà thiết kế hàng đầu. Chất liệu nhập khẩu và kỹ thuật may đo tinh xảo tạo nên những chiếc váy cưới đẳng cấp.",
      rating: 5,
      price: "Từ 25.000.000đ",
      features: [
        "Thiết kế độc quyền từ các nhà thiết kế nổi tiếng",
        "Chất liệu cao cấp nhập khẩu từ Pháp, Ý",
        "Đội ngũ thợ may với hơn 15 năm kinh nghiệm",
        "Dịch vụ tư vấn và chỉnh sửa theo số đo",
        "Phụ kiện đi kèm: khăn voan, găng tay, trang sức"
      ],
      contact: "028.3939.3939",
      website: "https://luxurybridal.vn"
    },
    {
      id: 2,
      name: "Modern Suit Studio",
      image: "/images/services/attire/modern-suit.jpg",
      description: "Vest cưới cao cấp, may đo theo yêu cầu với phong cách hiện đại, thanh lịch. Sử dụng chất liệu cao cấp và kỹ thuật cắt may tinh tế từ các thợ may hàng đầu.",
      rating: 5,
      price: "Từ 15.000.000đ",
      features: [
        "Vest cưới may đo theo số đo chính xác",
        "Đa dạng chất liệu từ len Úc, vải Ý, lụa cao cấp",
        "Tư vấn kiểu dáng phù hợp với vóc dáng",
        "Thời gian hoàn thiện nhanh chóng (7-10 ngày)",
        "Bảo hành và chỉnh sửa miễn phí trong 1 năm"
      ],
      contact: "028.3838.3838",
      website: "https://modernsuitstudio.vn"
    },
    {
      id: 3,
      name: "Traditional Wedding Dress",
      image: "/images/services/attire/traditional.jpg",
      description: "Áo dài cưới truyền thống và hiện đại, kết hợp nét đẹp văn hóa với xu hướng thời trang. Thiết kế tinh tế và thêu tay công phu tạo nên những tác phẩm nghệ thuật.",
      rating: 4,
      price: "Từ 10.000.000đ",
      features: [
        "Áo dài cưới với họa tiết thêu tay truyền thống",
        "Kết hợp giữa phong cách cổ điển và hiện đại",
        "Chất liệu lụa, gấm, nhung cao cấp",
        "Tư vấn màu sắc phù hợp với ngày lành tháng tốt",
        "Dịch vụ chụp ảnh áo dài trọn gói"
      ],
      contact: "028.3737.3737",
      website: "https://traditionalweddingdress.vn"
    },
    {
      id: 4,
      name: "Couture Wedding Collection",
      image: "/images/services/attire/couture.jpg",
      description: "Bộ sưu tập váy cưới cao cấp từ các thương hiệu quốc tế nổi tiếng. Mang đến cho cô dâu những lựa chọn đẳng cấp và độc đáo trong ngày trọng đại.",
      rating: 5,
      price: "Từ 50.000.000đ",
      features: [
        "Bộ sưu tập từ các thương hiệu nổi tiếng thế giới",
        "Dịch vụ tư vấn cá nhân với stylist chuyên nghiệp",
        "Showroom sang trọng với không gian riêng tư",
        "Dịch vụ may đo và chỉnh sửa hoàn hảo",
        "Gói chụp ảnh với nhiếp ảnh gia hàng đầu"
      ],
      contact: "028.3636.3636",
      website: "https://couturewedding.vn"
    }
  ];

  const introduction = {
    title: "Trang phục cưới đẳng cấp và độc đáo",
    content: "Trang phục cưới là một trong những yếu tố quan trọng nhất, góp phần tạo nên vẻ đẹp hoàn hảo cho cô dâu và chú rể trong ngày trọng đại. Chúng tôi cung cấp đa dạng các lựa chọn trang phục cưới từ váy cưới cao cấp, vest lịch lãm đến áo dài truyền thống, đáp ứng mọi phong cách và sở thích. Mỗi thiết kế đều được chăm chút tỉ mỉ từ khâu chọn chất liệu, thiết kế đến may đo, đảm bảo tôn lên vẻ đẹp tự nhiên và sự tự tin cho bạn trong ngày cưới. Đội ngũ nhà thiết kế và thợ may chuyên nghiệp của chúng tôi sẽ tư vấn và đồng hành cùng bạn để tạo nên bộ trang phục cưới hoàn hảo nhất.",
    image: "/images/services/attire/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn trang phục cưới của chúng tôi",
    items: [
      {
        title: "Thiết kế độc quyền",
        description: "Mỗi bộ trang phục cưới đều là thiết kế độc quyền hoặc được tùy chỉnh theo yêu cầu riêng của bạn, đảm bảo sự độc đáo và phù hợp với phong cách cá nhân.",
        icon: "✨"
      },
      {
        title: "Chất liệu cao cấp",
        description: "Chúng tôi chỉ sử dụng những chất liệu cao cấp nhập khẩu từ các nước có truyền thống dệt may như Pháp, Ý, Nhật Bản, đảm bảo sự sang trọng và thoải mái khi mặc.",
        icon: "🧵"
      },
      {
        title: "Đội ngũ chuyên nghiệp",
        description: "Đội ngũ nhà thiết kế và thợ may với nhiều năm kinh nghiệm sẽ tư vấn và thực hiện từng chi tiết trên trang phục của bạn một cách tỉ mỉ và hoàn hảo.",
        icon: "👨‍🎨"
      },
      {
        title: "Dịch vụ toàn diện",
        description: "Ngoài trang phục chính, chúng tôi còn cung cấp đầy đủ các phụ kiện đi kèm như khăn voan, găng tay, nơ, cà vạt, giày... tạo nên một tổng thể hài hòa và đồng bộ.",
        icon: "👰"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ trang phục cưới",
    items: [
      {
        title: "Đặt lịch và thử đồ",
        description: "Đặt lịch thử đồ trước ít nhất 3-6 tháng trước ngày cưới. Mỗi khách hàng được thử đồ tối đa 3 lần để đảm bảo sự vừa vặn hoàn hảo."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán 50% khi hoàn thành việc chọn mẫu và đo số đo. Thanh toán số còn lại khi nhận trang phục."
      },
      {
        title: "Thuê và mua",
        description: "Khách hàng có thể lựa chọn thuê hoặc mua trang phục cưới. Đối với dịch vụ thuê, thời gian thuê tiêu chuẩn là 3 ngày và cần đặt cọc thêm để đảm bảo tình trạng trang phục."
      },
      {
        title: "Bảo quản và hoàn trả",
        description: "Khách hàng cần tuân thủ hướng dẫn bảo quản trang phục. Trong trường hợp trang phục bị hư hỏng khi thuê, khách hàng sẽ phải chịu phí sửa chữa hoặc đền bù theo mức độ hư hỏng."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Trang Phục Cưới"
      description="Trang phục cưới độc đáo và sang trọng cho cô dâu chú rể. Từ váy cưới cao cấp, vest lịch lãm đến áo dài truyền thống, chúng tôi mang đến những lựa chọn hoàn hảo để tôn vinh vẻ đẹp của bạn trong ngày trọng đại."
      heroImage="/vay-cuoi.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default WeddingAttirePage;
