import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './AIConsultationPage.css';

const AIConsultationPage: React.FC = () => {
  return (
    <div className="ai-consultation-page">
      <Navbar />
      
      <div className="ai-hero-section">
        <div className="ai-hero-content">
          <h1>Tư Vấn AI Cho Đám Cưới Trong Mơ</h1>
          <p>
            Sử dụng công nghệ trí tuệ nhân tạo tiên tiến để lên kế hoạch cho ngày trọng đại của bạn.
            Tiết kiệm thời gian, giảm stress và tạo ra đám cưới hoàn hảo với sự hỗ trợ của AI.
          </p>
        </div>
      </div>
      
      <div className="ai-intro-section">
        <div className="container">
          <h2>Tại Sao Chọn Dịch Vụ Tư Vấn AI?</h2>
          <div className="ai-benefits">
            <div className="ai-benefit-item">
              <div className="ai-benefit-icon">⏱️</div>
              <h3>Tiết Kiệm Thời Gian</h3>
              <p>AI phân tích hàng nghìn lựa chọn trong vài giây, giúp bạn tiết kiệm hàng trăm giờ nghiên cứu.</p>
            </div>
            
            <div className="ai-benefit-item">
              <div className="ai-benefit-icon">💰</div>
              <h3>Tối Ưu Ngân Sách</h3>
              <p>Nhận đề xuất phù hợp với ngân sách của bạn, tránh chi tiêu lãng phí cho những dịch vụ không cần thiết.</p>
            </div>
            
            <div className="ai-benefit-item">
              <div className="ai-benefit-icon">🎯</div>
              <h3>Cá Nhân Hóa</h3>
              <p>Đề xuất được điều chỉnh theo sở thích, phong cách và mong muốn cụ thể của bạn.</p>
            </div>
            
            <div className="ai-benefit-item">
              <div className="ai-benefit-icon">🧠</div>
              <h3>Trí Tuệ Tập Thể</h3>
              <p>AI học hỏi từ hàng nghìn đám cưới thành công, mang đến cho bạn những ý tưởng đã được chứng minh.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ai-packages-section">
        <div className="container">
          <h2>Gói Dịch Vụ Tư Vấn AI</h2>
          <p className="ai-packages-subtitle">Chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
          
          <div className="ai-packages">
            <div className="ai-package-card">
              <div className="ai-package-header">
                <h3>Gói Cơ Bản</h3>
                <div className="ai-package-price">
                  <span className="price">499.000</span>
                  <span className="currency">VNĐ</span>
                </div>
              </div>
              
              <ul className="ai-package-features">
                <li>Tư vấn AI cơ bản</li>
                <li>Đề xuất 3 phong cách trang trí</li>
                <li>Gợi ý ngân sách tổng thể</li>
                <li>Danh sách kiểm tra cơ bản</li>
                <li>Hỗ trợ email trong 48 giờ</li>
              </ul>
              
              <div className="ai-package-footer">
                <Link to="/ai-consultation/basic" className="ai-package-button">Chọn Gói Này</Link>
              </div>
            </div>
            
            <div className="ai-package-card featured">
              <div className="ai-package-badge">Phổ biến nhất</div>
              <div className="ai-package-header">
                <h3>Gói Nâng Cao</h3>
                <div className="ai-package-price">
                  <span className="price">999.000</span>
                  <span className="currency">VNĐ</span>
                </div>
              </div>
              
              <ul className="ai-package-features">
                <li>Tất cả tính năng của Gói Cơ Bản</li>
                <li>Đề xuất 5 phong cách trang trí</li>
                <li>Lập kế hoạch chi tiết theo ngân sách</li>
                <li>Danh sách nhà cung cấp được đề xuất</li>
                <li>Lịch trình chi tiết cho ngày cưới</li>
                <li>Hỗ trợ email trong 24 giờ</li>
                <li>1 buổi tư vấn trực tuyến 30 phút</li>
              </ul>
              
              <div className="ai-package-footer">
                <Link to="/ai-consultation/premium" className="ai-package-button">Chọn Gói Này</Link>
              </div>
            </div>
            
            <div className="ai-package-card">
              <div className="ai-package-header">
                <h3>Gói VIP</h3>
                <div className="ai-package-price">
                  <span className="price">1.999.000</span>
                  <span className="currency">VNĐ</span>
                </div>
              </div>
              
              <ul className="ai-package-features">
                <li>Tất cả tính năng của Gói Nâng Cao</li>
                <li>Đề xuất không giới hạn phong cách</li>
                <li>Phân tích chi tiết từng hạng mục chi</li>
                <li>Đàm phán với nhà cung cấp hộ bạn</li>
                <li>Quản lý danh sách khách mời AI</li>
                <li>Hỗ trợ ưu tiên 24/7</li>
                <li>3 buổi tư vấn trực tuyến (45 phút/buổi)</li>
                <li>Hỗ trợ khẩn cấp trong ngày cưới</li>
              </ul>
              
              <div className="ai-package-footer">
                <Link to="/ai-consultation/vip" className="ai-package-button">Chọn Gói Này</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ai-how-it-works">
        <div className="container">
          <h2>Cách Thức Hoạt Động</h2>
          
          <div className="ai-steps">
            <div className="ai-step">
              <div className="ai-step-number">1</div>
              <h3>Chọn Gói Dịch Vụ</h3>
              <p>Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn.</p>
            </div>
            
            <div className="ai-step">
              <div className="ai-step-number">2</div>
              <h3>Hoàn Thành Khảo Sát</h3>
              <p>Trả lời một số câu hỏi về sở thích, phong cách và mong muốn của bạn.</p>
            </div>
            
            <div className="ai-step">
              <div className="ai-step-number">3</div>
              <h3>Nhận Đề Xuất AI</h3>
              <p>AI phân tích thông tin và đưa ra đề xuất cá nhân hóa cho đám cưới của bạn.</p>
            </div>
            
            <div className="ai-step">
              <div className="ai-step-number">4</div>
              <h3>Tùy Chỉnh & Hoàn Thiện</h3>
              <p>Điều chỉnh các đề xuất theo ý muốn và nhận kế hoạch chi tiết cuối cùng.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ai-testimonials">
        <div className="container">
          <h2>Khách Hàng Nói Gì Về Dịch Vụ AI</h2>
          
          <div className="ai-testimonial-cards">
            <div className="ai-testimonial-card">
              <div className="ai-testimonial-content">
                <p>"AI tư vấn đã giúp chúng tôi tiết kiệm hơn 20 triệu đồng cho đám cưới và giảm một nửa thời gian lên kế hoạch. Thật sự đáng đồng tiền!"</p>
              </div>
              <div className="ai-testimonial-author">
                <div className="ai-testimonial-avatar" style={{ backgroundColor: "#ffcdd2" }}>
                  <span>TH</span>
                </div>
                <div className="ai-testimonial-info">
                  <h4>Trần Hương & Nguyễn Minh</h4>
                  <p>Đám cưới tháng 4/2023</p>
                </div>
              </div>
            </div>
            
            <div className="ai-testimonial-card">
              <div className="ai-testimonial-content">
                <p>"Những đề xuất của AI rất sáng tạo và phù hợp với phong cách của chúng tôi. Đặc biệt là phần sắp xếp chỗ ngồi cho khách mời - thật sự thông minh!"</p>
              </div>
              <div className="ai-testimonial-author">
                <div className="ai-testimonial-avatar" style={{ backgroundColor: "#c8e6c9" }}>
                  <span>LM</span>
                </div>
                <div className="ai-testimonial-info">
                  <h4>Lê Mai & Hoàng Anh</h4>
                  <p>Đám cưới tháng 7/2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ai-cta-section">
        <div className="container">
          <h2>Bắt Đầu Lên Kế Hoạch Cưới Thông Minh Ngay Hôm Nay</h2>
          <p>Để AI giúp bạn tạo nên đám cưới trong mơ mà không cần lo lắng</p>
          <Link to="/ai-consultation/premium" className="ai-cta-button">Bắt Đầu Ngay</Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIConsultationPage;