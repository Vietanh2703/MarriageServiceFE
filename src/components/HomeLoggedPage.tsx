import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './AdvertisingSlideshow.tsx';
import { ThemeContext } from '../context/ThemeContext';
import './HomeLoggedPage.css';
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const serviceNavItems = [
  {
    icon: "💐",
    text: "Trang Trí",
    path: "/services/decoration"
  },
  {
    icon: "👗",
    text: "Trang Phục",
    path: "/services/wedding-attire"
  },
  {
    icon: "🚗",
    text: "Xe Cưới",
    path: "/services/wedding-cars"
  },
  {
    icon: "📸",
    text: "Chụp Ảnh",
    path: "/services/photography"
  },
  {
    icon: "💄",
    text: "Trang Điểm",
    path: "/services/makeup"
  },
  {
    icon: "🎂",
    text: "Ẩm Thực",
    path: "/services/catering"
  },
  {
    icon: "💌",
    text: "Thiệp Cưới",
    path: "/services/invitation-design"
  },
  {
    icon: "✨",
    text: "Nghi Lễ",
    path: "/services/wedding-ceremony"
  }
];

const suggestedCompanies = [
  {
    name: 'Dream Weddings',
    description: 'Dịch vụ tổ chức tiệc cưới trọn gói',
    logo: '/public/logo.png',
    rating: 4.8,
    specialties: ['Lên kế hoạch', 'Trang trí', 'Điều phối']
  },
  {
    name: 'Floral Paradise',
    description: 'Trang trí hoa tươi cao cấp',
    logo: '/public/decor.jpg',
    rating: 4.7,
    specialties: ['Hoa cưới', 'Backdrop', 'Bàn tiệc']
  },
  {
    name: 'Gourmet Catering',
    description: 'Ẩm thực phong cách Âu - Á',
    logo: '/public/nau-an.jpg',
    rating: 4.9,
    specialties: ['Buffet', 'Tiệc ngồi', 'Bánh cưới']
  },
  {
    name: 'LuxuryCars',
    description: 'Dịch vụ xe cưới hạng sang',
    logo: '/public/xe-cuoi.jpg',
    rating: 4.6,
    specialties: ['Xe hoa', 'Xe đưa đón', 'Xe cổ điển']
  },
];

const popularServices = [
  {
    name: 'Trang Điểm Cô Dâu',
    description: 'Dịch vụ makeup chuyên nghiệp',
    image: '/public/trang-diem.jpeg',
    stats: '95% khách hàng hài lòng'
  },
  {
    name: 'Chụp Ảnh Cưới',
    description: 'Chụp ảnh cưới trong & ngoài studio',
    image: '/public/photo-service.jpg',
    stats: 'Đã phục vụ 5,000+ cặp đôi'
  },
  {
    name: 'Váy Cưới Cao Cấp',
    description: 'Thiết kế và may đo theo yêu cầu',
    image: '/public/vay-cuoi.jpg',
    stats: '200+ mẫu thiết kế độc quyền'
  },
  {
    name: 'Thiệp Cưới',
    description: 'In ấn thiệp cưới cao cấp',
    image: '/public/thiep-cuoi.jpg',
    stats: 'Giao hàng trong 48h'
  },
];

const blogs = [
  {
    title: 'Lựa Chọn Địa Điểm Tổ Chức Đám Cưới',
    summary: 'Những yếu tố cần cân nhắc khi chọn địa điểm tổ chức.',
    date: '15/06/2025',
    author: 'Minh Tâm',
    link: '#',
    image: '/public/decor.jpg'
  },
  {
    title: 'Xu Hướng Trang Điểm Cô Dâu 2025',
    summary: 'Các phong cách trang điểm được yêu thích nhất năm nay.',
    date: '10/06/2025',
    author: 'Thu Hà',
    link: '#',
    image: '/public/trang-diem.jpeg'
  },
  {
    title: 'Lên Ngân Sách Cho Đám Cưới Hợp Lý',
    summary: 'Cách quản lý chi phí hiệu quả cho ngày trọng đại.',
    date: '05/06/2025',
    author: 'Hoàng Nam',
    link: '#',
    image: '/public/wedding-couple.jpg'
  },
  {
    title: '10 Ý Tưởng Chụp Ảnh Cưới Độc Đáo',
    summary: 'Gợi ý concept chụp ảnh cưới sáng tạo và ấn tượng.',
    date: '01/06/2025',
    author: 'Thanh Vân',
    link: '#',
    image: '/public/photo-service.jpg'
  },
];

const events = [
  {
    name: 'Triển Lãm Cưới 2025',
    date: '2025-06-22',
    location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
    details: 'Sự kiện quy tụ hơn 100 nhà cung cấp dịch vụ cưới hàng đầu. Cơ hội nhận nhiều ưu đãi và quà tặng giá trị.',
    time: '09:00 - 21:00',
    entryFee: 'Miễn phí'
  },
  {
    name: 'Fashion Show Váy Cưới',
    date: '2025-06-28',
    location: 'White Palace Convention Center, TP.HCM',
    details: 'Trình diễn bộ sưu tập váy cưới mới nhất từ các nhà thiết kế nổi tiếng trong và ngoài nước.',
    time: '19:30 - 21:30',
    entryFee: '200,000 VND'
  },
  {
    name: 'Workshop Trang Điểm Cô Dâu',
    date: '2025-06-15',
    location: 'Makeup Studio, 123 Nguyễn Huệ, TP.HCM',
    details: 'Học hỏi kỹ thuật trang điểm cô dâu từ chuyên gia. Số lượng có hạn, đăng ký sớm để đảm bảo chỗ.',
    time: '14:00 - 17:00',
    entryFee: '500,000 VND'
  },
  {
    name: 'Ngày Hội Tư Vấn Đám Cưới',
    date: '2025-06-10',
    location: 'Rex Hotel, TP.HCM',
    details: 'Gặp gỡ và tư vấn trực tiếp với các chuyên gia về kế hoạch tổ chức đám cưới hoàn hảo.',
    time: '10:00 - 18:00',
    entryFee: 'Miễn phí'
  },
];

const HomeLoggedPage: React.FC = () => {
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  const toggleEventExpand = (index: number) => {
    setExpandedEvents(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className={`home-logged-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar />

      {/* Full Width Advertising Slideshow */}
      <section className="full-width-slideshow">
        <Slideshow />
      </section>
      <nav className="service-navbar">
        {serviceNavItems.map((item, index) => (
            <Link key={index} to={item.path} className="service-nav-item">
              <span className="service-nav-icon">{item.icon}</span>
              <span className="service-nav-text">{item.text}</span>
            </Link>
        ))}
      </nav>
      {/* Voucher Offers Section */}
      <section className="voucher-offers-section">
        <div className="section-container">
          <h2>Ưu Đãi Voucher Hấp Dẫn</h2>
          <div className="voucher-list">
            <div className="voucher-card">
              <div className="voucher-left">
                <div className="voucher-logo">
                  <img src="/public/logo.png" alt="Dream Weddings" />
                </div>
                <div className="voucher-discount">-25%</div>
              </div>
              <div className="voucher-content">
                <h3>Dream Weddings</h3>
                <p>Giảm 25% gói trang trí tiệc cưới cao cấp</p>
                <div className="voucher-meta">
                  <span className="voucher-expiry">Hết hạn: 30/07/2025</span>
                  <span className="voucher-code">DREAM25</span>
                </div>
              </div>
              <div className="voucher-cta">
                <button className="voucher-btn">Lưu</button>
              </div>
            </div>

            <div className="voucher-card">
              <div className="voucher-left">
                <div className="voucher-logo">
                  <img src="/public/photo-service.jpg" alt="Perfect Moments" />
                </div>
                <div className="voucher-discount">-30%</div>
              </div>
              <div className="voucher-content">
                <h3>Perfect Moments</h3>
                <p>Giảm 30% gói chụp ảnh cưới ngoại cảnh</p>
                <div className="voucher-meta">
                  <span className="voucher-expiry">Hết hạn: 15/07/2025</span>
                  <span className="voucher-code">PHOTO30</span>
                </div>
              </div>
              <div className="voucher-cta">
                <button className="voucher-btn">Lưu</button>
              </div>
            </div>

            <div className="voucher-card">
              <div className="voucher-left">
                <div className="voucher-logo">
                  <img src="/public/vay-cuoi.jpg" alt="Elegant Bride" />
                </div>
                <div className="voucher-discount">-20%</div>
              </div>
              <div className="voucher-content">
                <h3>Elegant Bride</h3>
                <p>Giảm 20% khi thuê váy cưới + áo dài</p>
                <div className="voucher-meta">
                  <span className="voucher-expiry">Hết hạn: 20/07/2025</span>
                  <span className="voucher-code">BRIDE20</span>
                </div>
              </div>
              <div className="voucher-cta">
                <button className="voucher-btn">Lưu</button>
              </div>
            </div>

            <div className="voucher-card">
              <div className="voucher-left">
                <div className="voucher-logo">
                  <img src="/public/nau-an.jpg" alt="Gourmet Catering" />
                </div>
                <div className="voucher-discount">-15%</div>
              </div>
              <div className="voucher-content">
                <h3>Gourmet Catering</h3>
                <p>Giảm 15% thực đơn tiệc cưới trên 30 bàn</p>
                <div className="voucher-meta">
                  <span className="voucher-expiry">Hết hạn: 25/07/2025</span>
                  <span className="voucher-code">FOOD15</span>
                </div>
              </div>
              <div className="voucher-cta">
                <button className="voucher-btn">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Companies */}
      <section className="suggested-companies-section">
        <div className="section-container">
          <h2>Đối Tác Phù Hợp Với Bạn</h2>
          <div className="company-list">
            {suggestedCompanies.map((company, idx) => (
              <div className="company-card" key={idx}>
                <div className="company-logo">
                  <img src={company.logo} alt={company.name} />
                </div>
                <div className="company-info">
                  <h3>{company.name}</h3>
                  <div className="rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(company.rating))}
                      {'☆'.repeat(5 - Math.floor(company.rating))}
                    </span>
                    <span className="rating-number">{company.rating}</span>
                  </div>
                  <p>{company.description}</p>
                  <div className="specialties">
                    {company.specialties.map((specialty, i) => (
                      <span key={i} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="popular-services-section">
        <div className="section-container">
          <h2>Dịch Vụ Phổ Biến</h2>
          <div className="service-list">
            {popularServices.map((service, idx) => (
              <div className="service-card" key={idx}>
                <div className="service-image">
                  <img src={service.image} alt={service.name} />
                  <div className="service-stats">{service.stats}</div>
                </div>
                <div className="service-info">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <Link to={`/services/${service.name.toLowerCase().replace(/ /g, '-')}`} className="service-link">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            className="show-more-btn"
            onClick={() => setShowAllCompanies(!showAllCompanies)}
          >
            {showAllCompanies ? 'Thu gọn' : 'Xem thêm công ty'}
          </button>
        </div>
      </section>

      {/* Bottom Section: Blogs & Events */}
      <section className="bottom-section">
        <div className="section-container">
          <div className="two-column-layout">
            {/* Left Column: Blogs */}
            <div className="blogs-column">
              <h2>Tư Vấn Dịch Vụ Cưới</h2>
              <div className="blog-list">
                {blogs.map((blog, idx) => (
                  <div className="blog-card" key={idx}>
                    <div className="blog-image">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="blog-content">
                      <h4>{blog.title}</h4>
                      <p className="blog-meta">
                        <span className="blog-date">{blog.date}</span> |
                        <span className="blog-author"> {blog.author}</span>
                      </p>
                      <p className="blog-summary">{blog.summary}</p>
                      <a href={blog.link} className="read-more">Đọc tiếp</a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all-container">
                <Link to="/blogs" className="view-all-link">Xem tất cả bài viết</Link>
              </div>
            </div>

            {/* Right Column: Events */}
            <div className="events-column">
              <h2>Sự Kiện Sắp Diễn Ra</h2>
              <div className="event-list">
                {events.map((event, idx) => (
                  <div className="event-card" key={idx}>
                    <div className="event-date">
                      <span className="day">{new Date(event.date).getDate()}</span>
                      <span className="month">{new Date(event.date).toLocaleString('vi', { month: 'short' })}</span>
                    </div>
                    <div className="event-details">
                      <h4>{event.name}</h4>
                      <p className="event-location">
                        <span className="location-icon">📍</span> {event.location}
                      </p>
                      <p className="event-time">
                        <span className="time-icon">🕒</span> {event.time}
                      </p>
                      {expandedEvents.includes(idx) && (
                        <div className="event-expanded">
                          <p className="event-description">{event.details}</p>
                          <p className="event-entry">
                            <strong>Vé vào cửa:</strong> {event.entryFee}
                          </p>
                        </div>
                      )}
                      <button
                        className="expand-event-btn"
                        onClick={() => toggleEventExpand(idx)}
                      >
                        {expandedEvents.includes(idx) ? 'Thu gọn' : 'Xem thêm'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all-container">
                <Link to="/events" className="view-all-link">Xem tất cả sự kiện</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomeLoggedPage;
