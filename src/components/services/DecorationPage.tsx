import React from 'react';
import BaseServicePage from './BaseServicePage';

const DecorationPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Wedding Decor Studio",
      image: "/images/services/decoration/decor-studio.jpg",
      description: "Thiết kế và trang trí tiệc cưới theo phong cách hiện đại, sang trọng. Chúng tôi biến không gian cưới của bạn thành tác phẩm nghệ thuật với sự kết hợp hoàn hảo giữa ánh sáng, hoa và các chi tiết trang trí.",
      rating: 5,
      price: "Từ 50.000.000đ",
      features: [
        "Thiết kế không gian theo concept riêng cho từng cặp đôi",
        "Sử dụng hoa tươi cao cấp và vật liệu nhập khẩu",
        "Hệ thống ánh sáng hiện đại tạo không gian lung linh",
        "Đội ngũ thiết kế với kinh nghiệm quốc tế",
        "Dịch vụ trang trí trọn gói từ lễ đến tiệc"
      ],
      contact: "028.3333.3333",
      website: "https://weddingdecorstudio.vn"
    },
    {
      id: 2,
      name: "Rustic Wedding Decoration",
      image: "/images/services/decoration/rustic-decor.jpg",
      description: "Chuyên trang trí tiệc cưới phong cách rustic độc đáo, mang đến không gian ấm cúng, gần gũi thiên nhiên nhưng vẫn sang trọng và tinh tế. Lựa chọn hoàn hảo cho các cặp đôi yêu thích phong cách mộc mạc.",
      rating: 4,
      price: "Từ 35.000.000đ",
      features: [
        "Trang trí theo phong cách rustic với vật liệu tự nhiên",
        "Sử dụng gỗ, hoa khô, dây đèn và các chi tiết vintage",
        "Thiết kế backdrop, bàn gallery và khu vực tiệc",
        "Tư vấn phối màu và concept phù hợp",
        "Dịch vụ trang trí xe hoa đồng bộ với không gian tiệc"
      ],
      contact: "028.3232.3232",
      website: "https://rusticweddingdecoration.vn"
    },
    {
      id: 3,
      name: "Luxury Flower Design",
      image: "/images/services/decoration/flower-design.jpg",
      description: "Trang trí hoa tươi cao cấp cho tiệc cưới với những loài hoa nhập khẩu độc đáo. Chúng tôi tạo nên những tác phẩm nghệ thuật từ hoa, mang đến không gian cưới sang trọng và đầy lãng mạn.",
      rating: 5,
      price: "Từ 45.000.000đ",
      features: [
        "Sử dụng hoa tươi nhập khẩu từ Hà Lan, Ecuador",
        "Thiết kế hoa độc quyền cho từng đám cưới",
        "Đội ngũ nghệ nhân cắm hoa chuyên nghiệp",
        "Trang trí hoa cho lễ đường, bàn tiệc, backdrop",
        "Dịch vụ hoa cầm tay cô dâu và phụ dâu"
      ],
      contact: "028.3131.3131",
      website: "https://luxuryflowerdesign.vn"
    },
    {
      id: 4,
      name: "Minimalist Wedding Design",
      image: "/images/services/decoration/minimalist.jpg",
      description: "Trang trí tiệc cưới theo phong cách tối giản, hiện đại với những đường nét tinh tế và màu sắc hài hòa. Phong cách dành cho những cặp đôi yêu thích sự đơn giản nhưng vẫn đẳng cấp.",
      rating: 5,
      price: "Từ 40.000.000đ",
      features: [
        "Thiết kế không gian theo phong cách tối giản, hiện đại",
        "Sử dụng bảng màu trung tính với điểm nhấn tinh tế",
        "Chú trọng vào đường nét và hình khối trong trang trí",
        "Ánh sáng được thiết kế tinh tế tạo không gian sang trọng",
        "Kết hợp các vật liệu cao cấp: kim loại, kính, đá cẩm thạch"
      ],
      contact: "028.3030.3030",
      website: "https://minimalistweddingdesign.vn"
    }
  ];

  const introduction = {
    title: "Nghệ thuật trang trí không gian cưới",
    content: "Trang trí tiệc cưới là nghệ thuật biến không gian thông thường thành thiên đường lãng mạn và đầy cảm xúc cho ngày trọng đại của bạn. Mỗi chi tiết trang trí, từ hoa tươi, ánh sáng đến bàn ghế, backdrop đều được chăm chút tỉ mỉ để tạo nên một tổng thể hài hòa, phản ánh phong cách và câu chuyện tình yêu của cặp đôi. Chúng tôi cung cấp đa dạng các phong cách trang trí từ hiện đại sang trọng, cổ điển lãng mạn đến rustic mộc mạc, minimalist tinh tế, đáp ứng mọi sở thích và yêu cầu. Đội ngũ thiết kế và trang trí của chúng tôi sẽ làm việc chặt chẽ với bạn từ khâu lên ý tưởng, thiết kế đến thực hiện, đảm bảo mọi chi tiết đều hoàn hảo để tạo nên không gian cưới trong mơ.",
    image: "/images/services/decoration/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ trang trí của chúng tôi",
    items: [
      {
        title: "Thiết kế độc đáo",
        description: "Mỗi concept trang trí đều được thiết kế riêng cho từng cặp đôi, dựa trên sở thích, phong cách và câu chuyện tình yêu, đảm bảo sự độc đáo và cá nhân hóa.",
        icon: "🎨"
      },
      {
        title: "Vật liệu cao cấp",
        description: "Sử dụng hoa tươi cao cấp, vật liệu nhập khẩu và các chi tiết trang trí chất lượng cao để đảm bảo không gian cưới sang trọng, tinh tế và bền đẹp suốt sự kiện.",
        icon: "🌹"
      },
      {
        title: "Đội ngũ chuyên nghiệp",
        description: "Đội ngũ thiết kế và trang trí với nhiều năm kinh nghiệm, được đào tạo bài bản về nghệ thuật trang trí không gian và cắm hoa, đảm bảo chất lượng công việc.",
        icon: "👨‍🎨"
      },
      {
        title: "Dịch vụ trọn gói",
        description: "Cung cấp dịch vụ trang trí trọn gói từ lễ đường đến tiệc cưới, từ backdrop, bàn gallery đến bàn tiệc, hoa cầm tay, giúp bạn tiết kiệm thời gian và công sức.",
        icon: "📦"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ trang trí",
    items: [
      {
        title: "Đặt lịch và tư vấn",
        description: "Đặt lịch trang trí trước ít nhất 3-6 tháng để đảm bảo sự sẵn sàng. Buổi tư vấn miễn phí để hiểu rõ nhu cầu và mong muốn của bạn, từ đó xây dựng concept phù hợp."
      },
      {
        title: "Khảo sát địa điểm",
        description: "Khảo sát địa điểm miễn phí để đánh giá không gian và lên phương án trang trí phù hợp. Đối với địa điểm ngoài thành phố, có thể phát sinh phí di chuyển."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 30% giá trị hợp đồng khi ký kết. Thanh toán 50% khi hoàn thiện thiết kế và chốt phương án. Thanh toán số còn lại trước ngày trang trí 7 ngày."
      },
      {
        title: "Thay đổi và hủy bỏ",
        description: "Thay đổi concept trang trí có thể được thực hiện trước ngày cưới 45 ngày mà không mất phí. Hủy hợp đồng trước 90 ngày: hoàn 70% tiền cọc. Hủy trước 60 ngày: hoàn 30% tiền cọc. Hủy trong vòng 60 ngày: không hoàn tiền cọc."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Trang Trí Tiệc Cưới"
      description="Biến không gian cưới của bạn thành thiên đường với các dịch vụ trang trí đẳng cấp. Từ phong cách hiện đại sang trọng đến rustic mộc mạc, chúng tôi mang đến những giải pháp trang trí hoàn hảo để tạo nên không gian cưới trong mơ của bạn."
      heroImage="/decor.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default DecorationPage;
