import React from 'react';
import BaseServicePage from './BaseServicePage';

const InvitationDesignPage: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: "Creative Wedding Cards",
      image: "/images/services/invitation/creative-cards.jpg",
      description: "Thiết kế thiệp cưới độc đáo, sáng tạo với nhiều phong cách khác nhau. Mỗi thiệp cưới là một tác phẩm nghệ thuật thể hiện cá tính và câu chuyện tình yêu của bạn.",
      rating: 5,
      price: "Từ 15.000đ/thiệp",
      features: [
        "Thiết kế độc quyền theo yêu cầu của khách hàng",
        "Đa dạng phong cách từ hiện đại đến cổ điển",
        "In ấn chất lượng cao với công nghệ hiện đại",
        "Tư vấn về nội dung và phong cách thiệp cưới",
        "Giao hàng nhanh chóng, đúng tiến độ"
      ],
      contact: "028.4444.4444",
      website: "https://creativeweddingcards.vn"
    },
    {
      id: 2,
      name: "Digital Invitation Studio",
      image: "/images/services/invitation/digital.jpg",
      description: "Thiệp cưới điện tử và video invitation hiện đại, tiết kiệm và thân thiện với môi trường. Giải pháp hoàn hảo cho các cặp đôi yêu công nghệ và bảo vệ môi trường.",
      rating: 4,
      price: "Từ 2.000.000đ",
      features: [
        "Thiệp cưới điện tử tương tác với nhiều hiệu ứng",
        "Video invitation kể câu chuyện tình yêu của bạn",
        "Website đám cưới cá nhân hóa",
        "Hệ thống RSVP online thuận tiện",
        "Hỗ trợ kỹ thuật 24/7 cho khách mời"
      ],
      contact: "028.4343.4343",
      website: "https://digitalinvitation.vn"
    },
    {
      id: 3,
      name: "Luxury Paper Art",
      image: "/images/services/invitation/luxury.jpg",
      description: "Thiệp cưới cao cấp với chất liệu đặc biệt và kỹ thuật thủ công tinh xảo. Mỗi thiệp là một tác phẩm nghệ thuật giấy độc đáo, sang trọng và đẳng cấp.",
      rating: 5,
      price: "Từ 35.000đ/thiệp",
      features: [
        "Sử dụng giấy nhập khẩu cao cấp từ Ý, Nhật",
        "Kỹ thuật cắt laser tinh xảo",
        "Trang trí bằng các chi tiết thủ công: ruy băng, ren, đính đá",
        "Thiết kế cá nhân hóa theo chủ đề đám cưới",
        "Bao thư và tem đồng bộ với thiệp"
      ],
      contact: "028.4242.4242",
      website: "https://luxurypaperart.vn"
    },
    {
      id: 4,
      name: "Eco-Friendly Invitations",
      image: "/images/services/invitation/eco-friendly.jpg",
      description: "Thiệp cưới thân thiện với môi trường, sử dụng giấy tái chế và mực in thực vật. Lựa chọn hoàn hảo cho các cặp đôi yêu thiên nhiên và có ý thức bảo vệ môi trường.",
      rating: 4,
      price: "Từ 20.000đ/thiệp",
      features: [
        "Sử dụng 100% giấy tái chế hoặc giấy từ nguồn bền vững",
        "Mực in thực vật an toàn với môi trường",
        "Thiết kế tối giản, hiện đại và gần gũi thiên nhiên",
        "Tùy chọn thiệp có thể trồng được (có hạt giống)",
        "Đóng gói tối giản, không sử dụng nhựa"
      ],
      contact: "028.4141.4141",
      website: "https://ecofriendlyinvitations.vn"
    }
  ];

  const introduction = {
    title: "Thiệp cưới - Ấn tượng đầu tiên của ngày trọng đại",
    content: "Thiệp cưới không chỉ là lời mời đơn thuần mà còn là ấn tượng đầu tiên về đám cưới của bạn đối với khách mời. Mỗi tấm thiệp là sự kết hợp giữa nghệ thuật thiết kế, chất liệu tinh tế và thông điệp ý nghĩa, phản ánh phong cách và câu chuyện tình yêu của cặp đôi. Chúng tôi cung cấp đa dạng các lựa chọn thiệp cưới từ thiệp truyền thống in ấn tinh xảo đến thiệp điện tử hiện đại, từ thiệp đơn giản, tối giản đến thiệp cầu kỳ với các chi tiết thủ công. Đội ngũ thiết kế của chúng tôi sẽ làm việc chặt chẽ với bạn để tạo ra những tấm thiệp cưới độc đáo, phù hợp với chủ đề đám cưới và để lại ấn tượng khó quên cho người nhận.",
    image: "/images/services/invitation/introduction.jpg"
  };

  const benefits = {
    title: "Lợi ích khi chọn dịch vụ thiết kế thiệp cưới của chúng tôi",
    items: [
      {
        title: "Thiết kế độc quyền",
        description: "Mỗi thiệp cưới đều là thiết kế độc quyền, được tạo ra riêng cho bạn, thể hiện cá tính và phong cách riêng của cặp đôi, không trùng lặp với bất kỳ thiệp cưới nào khác.",
        icon: "🎨"
      },
      {
        title: "Đa dạng lựa chọn",
        description: "Từ thiệp cưới truyền thống, thiệp cưới hiện đại đến thiệp cưới điện tử, từ thiệp đơn giản đến thiệp cầu kỳ với các chi tiết thủ công, chúng tôi đáp ứng mọi sở thích và ngân sách.",
        icon: "📋"
      },
      {
        title: "Chất lượng cao cấp",
        description: "Sử dụng chất liệu giấy cao cấp, công nghệ in ấn hiện đại và kỹ thuật hoàn thiện tinh xảo để tạo ra những tấm thiệp cưới chất lượng cao, bền đẹp theo thời gian.",
        icon: "✨"
      },
      {
        title: "Dịch vụ trọn gói",
        description: "Từ tư vấn thiết kế, soạn thảo nội dung đến in ấn, hoàn thiện và giao hàng, chúng tôi cung cấp dịch vụ trọn gói, giúp bạn tiết kiệm thời gian và công sức.",
        icon: "📦"
      }
    ]
  };

  const policies = {
    title: "Chính sách dịch vụ thiết kế thiệp cưới",
    items: [
      {
        title: "Thời gian đặt hàng",
        description: "Đặt thiệp cưới trước ít nhất 2-3 tháng trước ngày cưới. Đối với thiệp cưới cao cấp hoặc có số lượng lớn, nên đặt trước 3-4 tháng để đảm bảo thời gian thiết kế và sản xuất."
      },
      {
        title: "Quy trình thiết kế",
        description: "Tư vấn và lên ý tưởng → Thiết kế mẫu → Chỉnh sửa theo yêu cầu (tối đa 3 lần) → Duyệt mẫu cuối cùng → Sản xuất → Giao hàng."
      },
      {
        title: "Đặt cọc và thanh toán",
        description: "Đặt cọc 50% giá trị đơn hàng khi xác nhận đặt hàng. Thanh toán số còn lại trước khi giao hàng. Đối với đơn hàng có giá trị lớn, có thể thỏa thuận lịch thanh toán theo tiến độ."
      },
      {
        title: "Giao hàng và hoàn thiện",
        description: "Thời gian giao hàng từ 7-14 ngày làm việc sau khi duyệt mẫu cuối cùng, tùy thuộc vào số lượng và độ phức tạp của thiệp. Kiểm tra kỹ sản phẩm trước khi nhận hàng."
      }
    ]
  };

  return (
    <BaseServicePage
      title="Thiết Kế Thiệp Cưới"
      description="Thiệp cưới độc đáo và ấn tượng, thể hiện cá tính riêng của bạn. Từ thiệp cưới truyền thống đến thiệp điện tử hiện đại, chúng tôi mang đến đa dạng lựa chọn để bạn gửi lời mời đến những người thân yêu một cách ấn tượng nhất."
      heroImage="/thiep-cuoi.jpg"
      introduction={introduction}
      benefits={benefits}
      partners={partners}
      policies={policies}
    />
  );
};

export default InvitationDesignPage;
