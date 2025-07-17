import React from 'react';
import BaseServicePage from './BaseServicePage';

const WeddingCarsPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Luxury Car Service",
      image: "/images/services/cars/luxury-cars.jpg",
      description: "Dàn xe cao cấp Mercedes, BMW, Rolls-Royce với dịch vụ chuyên nghiệp. Mang đến trải nghiệm di chuyển sang trọng và đẳng cấp cho ngày cưới của bạn.",
      rating: 5,
      price: "Từ 15.000.000đ",
      features: [
        "Đa dạng mẫu xe sang trọng từ Mercedes, BMW đến Rolls-Royce",
        "Tài xế chuyên nghiệp, lịch sự, trang phục đồng phục",
        "Trang trí xe theo chủ đề yêu cầu",
        "Dịch vụ đón tiễn linh hoạt theo lịch trình",
        "Bảo hiểm đầy đủ và xe dự phòng"
      ],
      contact: "090.888.9999",
      website: "https://luxurycarservice.vn"
    },
    {
      id: 2,
      name: "Classic Wedding Cars",
      image: "/images/services/cars/classic-cars.jpg",
      description: "Xe cổ điển sang trọng cho ngày cưới, mang đến nét độc đáo và cổ điển cho những bức ảnh cưới. Trải nghiệm không gian hoài cổ đầy lãng mạn.",
      rating: 4,
      price: "Từ 20.000.000đ",
      features: [
        "Bộ sưu tập xe cổ điển từ những năm 1950-1970",
        "Xe được bảo quản và phục chế hoàn hảo",
        "Dịch vụ chụp ảnh cùng xe",
        "Trang trí hoa tươi theo yêu cầu",
        "Tài xế trang phục phong cách retro"
      ],
      contact: "090.777.8888",
      website: "https://classicweddingcars.vn"
    },
    {
      id: 3,
      name: "VIP Car Rental",
      image: "/images/services/cars/vip-cars.jpg",
      description: "Dịch vụ cho thuê xe cưới trọn gói với đa dạng lựa chọn từ xe sang đến siêu xe. Đáp ứng mọi nhu cầu di chuyển trong ngày cưới của bạn.",
      rating: 5,
      price: "Từ 12.000.000đ",
      features: [
        "Đa dạng dòng xe từ hạng sang đến siêu xe",
        "Dịch vụ đưa đón cô dâu chú rể và gia đình hai bên",
        "Xe được trang trí theo phong cách yêu cầu",
        "Lịch trình linh hoạt theo giờ hoặc theo ngày",
        "Hỗ trợ chụp ảnh, quay phim cùng xe"
      ],
      contact: "090.666.7777",
      website: "https://vipcarrental.vn"
    },
    {
      id: 4,
      name: "Supercar Wedding",
      image: "/images/services/cars/supercar.jpg",
      description: "Dịch vụ siêu xe đẳng cấp cho ngày cưới đặc biệt. Lamborghini, Ferrari, Porsche - tạo điểm nhấn khó quên cho sự kiện trọng đại của bạn.",
      rating: 5,
      price: "Từ 30.000.000đ",
      features: [
        "Bộ sưu tập siêu xe đẳng cấp thế giới",
        "Tài xế chuyên nghiệp với kinh nghiệm lái siêu xe",
        "Dịch vụ chụp ảnh chuyên nghiệp kèm theo",
        "Bảo hiểm cao cấp cho toàn bộ hành trình",
        "Hỗ trợ lên kế hoạch lộ trình di chuyển"
      ],
      contact: "090.999.8888",
      website: "https://supercarwedding.vn"
    }
  ];

  const introduction = {
    title: "Dịch vụ xe cưới đẳng cấp",
    content: "Xe cưới không chỉ là phương tiện di chuyển mà còn là biểu tượng cho sự sang trọng và đẳng cấp trong ngày trọng đại của bạn. Chúng tôi cung cấp đa dạng các loại xe cưới từ xe sang trọng hiện đại như Mercedes, BMW đến những chiếc xe cổ điển lãng mạn và thậm chí là siêu xe đẳng cấp. Mỗi chiếc xe đều được trang trí tinh tế theo chủ đề cưới và đi kèm với dịch vụ tài xế chuyên nghiệp, đảm bảo mang đến trải nghiệm di chuyển hoàn hảo cho cô dâu, chú rể và gia đình trong ngày cưới.",
    image: "/images/services/cars/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi thuê xe cưới của chúng tôi",
    items: [
      {
        title: "Đa dạng lựa chọn",
        description: "Từ xe sang trọng hiện đại, xe cổ điển lãng mạn đến siêu xe đẳng cấp, chúng tôi có đầy đủ các loại xe để đáp ứng mọi phong cách và ngân sách của bạn.",
        icon: "🚗"
      },
      {
        title: "Trang trí theo chủ đề",
        description: "Mỗi chiếc xe đều được trang trí tinh tế theo chủ đề cưới của bạn, từ hoa tươi, ruy băng đến các chi tiết trang trí khác, tạo nên một tổng thể hài hòa và ấn tượng.",
        icon: "🎀"
      },
      {
        title: "Tài xế chuyên nghiệp",
        description: "Đội ngũ tài xế của chúng tôi không chỉ có kinh nghiệm lái xe mà còn được đào tạo về phong cách phục vụ chuyên nghiệp, lịch sự và thân thiện.",
        icon: "👨‍✈️"
      },
      {
        title: "Dịch vụ trọn gói",
        description: "Chúng tôi cung cấp dịch vụ trọn gói bao gồm xe, tài xế, trang trí, bảo hiểm và hỗ trợ 24/7, giúp bạn an tâm tận hưởng ngày cưới mà không phải lo lắng về việc di chuyển.",
        icon: "📦"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ xe cưới",
    items: [
      {
        title: "Đặt xe và thanh toán",
        description: "Đặt xe trước ít nhất 30 ngày để đảm bảo có xe như ý. Đặt cọc 50% giá trị hợp đồng khi ký kết. Thanh toán số còn lại trước ngày cưới 7 ngày."
      },
      {
        title: "Hủy và thay đổi",
        description: "Hủy trước 30 ngày: hoàn 70% tiền cọc. Hủy trước 15 ngày: hoàn 30% tiền cọc. Hủy trong vòng 15 ngày: không hoàn tiền cọc. Thay đổi loại xe tùy thuộc vào tình trạng sẵn có."
      },
      {
        title: "Thời gian sử dụng",
        description: "Gói cơ bản bao gồm 4 giờ sử dụng xe. Thời gian phụ trội sẽ được tính thêm phí theo giờ. Thời gian chờ đợi quá 30 phút so với lịch trình sẽ được tính phí chờ."
      },
      {
        title: "Bảo hiểm và an toàn",
        description: "Tất cả các xe đều có bảo hiểm đầy đủ. Trong trường hợp xe gặp sự cố, chúng tôi sẽ cung cấp xe thay thế tương đương hoặc hoàn tiền theo tỷ lệ thời gian sử dụng."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Xe Cưới"
      description="Lựa chọn phương tiện di chuyển sang trọng và đẳng cấp cho ngày trọng đại. Từ xe sang trọng hiện đại đến xe cổ điển lãng mạn, chúng tôi mang đến trải nghiệm di chuyển hoàn hảo cho ngày cưới của bạn."
      heroImage="/xe-cuoi.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default WeddingCarsPage;
