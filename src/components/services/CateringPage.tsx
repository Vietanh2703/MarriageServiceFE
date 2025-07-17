import React from 'react';
import BaseServicePage from './BaseServicePage';

const CateringPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Gourmet Wedding Kitchen",
      image: "/images/services/catering/gourmet.jpg",
      description: "Ẩm thực cao cấp kết hợp Á - Âu với những món ăn tinh tế và sang trọng. Đội ngũ đầu bếp chuyên nghiệp sẽ mang đến trải nghiệm ẩm thực đẳng cấp cho ngày cưới của bạn.",
      rating: 5,
      price: "Từ 350.000đ/phần",
      features: [
        "Thực đơn fusion kết hợp tinh hoa ẩm thực Á - Âu",
        "Đầu bếp với kinh nghiệm từ các nhà hàng 5 sao",
        "Tùy chỉnh thực đơn theo yêu cầu của khách hàng",
        "Trình bày món ăn nghệ thuật, sang trọng",
        "Dịch vụ nếm thử miễn phí trước ngày cưới"
      ],
      contact: "028.2222.2222",
      website: "https://gourmetweddingkitchen.vn"
    },
    {
      id: 2,
      name: "Traditional Feast",
      image: "/images/services/catering/traditional.jpg",
      description: "Ẩm thực truyền thống Việt Nam với những món ăn đặc trưng được chế biến từ nguyên liệu tươi ngon. Mang đến hương vị quê hương đích thực trong ngày vui của bạn.",
      rating: 4,
      price: "Từ 250.000đ/phần",
      features: [
        "Thực đơn đặc trưng các vùng miền Việt Nam",
        "Nguyên liệu tươi sạch từ các vùng đặc sản",
        "Món ăn được chế biến theo công thức gia truyền",
        "Trang trí bàn tiệc theo phong cách truyền thống",
        "Dịch vụ đồng giá cho các món khai vị, tráng miệng"
      ],
      contact: "028.2121.2121",
      website: "https://traditionalfeast.vn"
    },
    {
      id: 3,
      name: "Royal Catering",
      image: "/images/services/catering/royal.jpg",
      description: "Dịch vụ ẩm thực cao cấp và trang trí bàn tiệc theo phong cách hoàng gia. Mang đến trải nghiệm ẩm thực xa hoa và đẳng cấp cho ngày trọng đại của bạn.",
      rating: 5,
      price: "Từ 400.000đ/phần",
      features: [
        "Thực đơn cao cấp với các món đặc biệt",
        "Trang trí bàn tiệc sang trọng với bộ đồ ăn cao cấp",
        "Đội ngũ phục vụ chuyên nghiệp, lịch sự",
        "Rượu vang và champagne đi kèm theo gói",
        "Bánh cưới nghệ thuật nhiều tầng"
      ],
      contact: "028.2020.2020",
      website: "https://royalcatering.vn"
    },
    {
      id: 4,
      name: "Healthy Wedding Menu",
      image: "/images/services/catering/healthy.jpg",
      description: "Thực đơn cưới lành mạnh, cân bằng dinh dưỡng nhưng vẫn đảm bảo hương vị tuyệt vời. Lựa chọn hoàn hảo cho các cặp đôi yêu thích lối sống khỏe mạnh.",
      rating: 4,
      price: "Từ 300.000đ/phần",
      features: [
        "Thực đơn cân bằng dinh dưỡng, ít dầu mỡ",
        "Nguyên liệu organic từ các trang trại được chứng nhận",
        "Tùy chọn cho thực khách ăn chay, ăn kiêng",
        "Món tráng miệng từ trái cây tươi và nguyên liệu tự nhiên",
        "Đồ uống detox và nước ép trái cây tự nhiên"
      ],
      contact: "028.2323.2323",
      website: "https://healthyweddingmenu.vn"
    }
  ];

  const introduction = {
    title: "Trải nghiệm ẩm thực đẳng cấp cho ngày cưới",
    content: "Ẩm thực là một trong những yếu tố quan trọng góp phần tạo nên sự thành công của một đám cưới. Không chỉ đơn thuần là bữa tiệc, ẩm thực cưới còn là cách để thể hiện sự hiếu khách, phong cách và văn hóa của gia đình. Chúng tôi cung cấp đa dạng các lựa chọn ẩm thực từ truyền thống Việt Nam đến fusion Á - Âu, từ buffet hiện đại đến thực đơn cổ điển, đáp ứng mọi sở thích và yêu cầu. Mỗi món ăn đều được chế biến từ những nguyên liệu tươi ngon nhất, bởi đội ngũ đầu bếp tài năng và giàu kinh nghiệm, đảm bảo mang đến trải nghiệm ẩm thực hoàn hảo cho bạn và khách mời trong ngày trọng đại.",
    image: "/images/services/catering/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ ẩm thực của chúng tôi",
    items: [
      {
        title: "Đa dạng thực đơn",
        description: "Cung cấp đa dạng thực đơn từ Á đến Âu, từ truyền thống đến hiện đại, từ buffet đến set menu, đáp ứng mọi sở thích và ngân sách của khách hàng.",
        icon: "🍽️"
      },
      {
        title: "Nguyên liệu tươi ngon",
        description: "Sử dụng nguyên liệu tươi ngon, chất lượng cao, được tuyển chọn kỹ lưỡng từ các nhà cung cấp uy tín, đảm bảo an toàn vệ sinh thực phẩm.",
        icon: "🥗"
      },
      {
        title: "Đầu bếp chuyên nghiệp",
        description: "Đội ngũ đầu bếp tài năng với nhiều năm kinh nghiệm trong ngành ẩm thực, được đào tạo bài bản từ các trường ẩm thực nổi tiếng trong và ngoài nước.",
        icon: "👨‍🍳"
      },
      {
        title: "Dịch vụ trọn gói",
        description: "Cung cấp dịch vụ ẩm thực trọn gói bao gồm thực đơn, đồ uống, bánh cưới, trang trí bàn tiệc và đội ngũ phục vụ chuyên nghiệp, lịch sự.",
        icon: "📦"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ ẩm thực",
    items: [
      {
        title: "Đặt lịch và nếm thử",
        description: "Đặt lịch dịch vụ ẩm thực trước ít nhất 2-3 tháng. Dịch vụ nếm thử miễn phí cho 2 người (áp dụng cho đơn hàng từ 100 khách trở lên)."
      },
      {
        title: "Tùy chỉnh thực đơn",
        description: "Thực đơn có thể được tùy chỉnh theo yêu cầu của khách hàng. Hỗ trợ thực đơn đặc biệt cho khách mời có nhu cầu ăn chay, kiêng đường, kiêng gluten, v.v."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán 50% giá trị hợp đồng trước ngày cưới 15 ngày. Thanh toán số còn lại sau khi kết thúc tiệc."
      },
      {
        title: "Thay đổi số lượng",
        description: "Thay đổi số lượng khách có thể được thực hiện trước ngày cưới 7 ngày. Tăng số lượng: tính phí theo đơn giá thực tế. Giảm số lượng: hoàn tiền 70% đơn giá cho phần giảm (nếu thông báo trước 7 ngày)."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Dịch Vụ Ẩm Thực"
      description="Thực đơn đa dạng, phong phú với các món ăn độc đáo và hấp dẫn. Từ ẩm thực truyền thống đến fusion hiện đại, chúng tôi mang đến trải nghiệm ẩm thực hoàn hảo cho ngày cưới của bạn, đảm bảo để lại ấn tượng khó quên cho tất cả khách mời."
      heroImage="/nau-an.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default CateringPage;
