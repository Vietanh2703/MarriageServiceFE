import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../HomeNavbar';
import Footer from '../Footer';
import './PartnerRegistrationForm.css';

const PartnerRegistrationForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedPlan = queryParams.get('plan') || 'basic';

  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    website: '',
    taxId: '',
    
    // Contact Person Information
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactPosition: '',
    
    // Service Information
    serviceCategory: '',
    serviceDescription: '',
    serviceArea: '',
    
    // Plan Selection
    plan: selectedPlan,
    
    // Terms and Conditions
    agreeTerms: false,
    agreePrivacy: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy dữ liệu từ state nếu user quay lại từ checkout
    const savedData = location.state?.registrationData;
    if (savedData) {
      setFormData(savedData);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.businessName || !formData.businessType || !formData.businessAddress ||
        !formData.businessPhone || !formData.businessEmail || !formData.contactName ||
        !formData.contactPhone || !formData.contactEmail || !formData.contactPosition ||
        !formData.serviceCategory || !formData.serviceDescription || !formData.serviceArea
        || !formData.agreeTerms || !formData.agreePrivacy) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc và đồng ý với điều khoản');
      return;
    }


    // Navigate to checkout with form data
    navigate('/partner-registration/checkout', {
      state: { registrationData: formData }
    });
  };

  const serviceCategories = [
    'Địa điểm tổ chức',
    'Trang trí',
    'Ẩm thực',
    'Trang phục',
    'Nhiếp ảnh & Video',
    'Âm nhạc',
    'Xe cưới',
    'Thiệp cưới',
    'Trang điểm',
    'Hoa cưới',
    'Khác'
  ];

  const businessTypes = [
    'Doanh nghiệp tư nhân',
    'Công ty TNHH',
    'Công ty cổ phần',
    'Hộ kinh doanh cá thể',
    'Khác'
  ];

  return (
    <div className="partner-registration-form-page">
      <Navbar />
      
      <div className="registration-container">
        <div className="registration-header">
          <h1>Đăng Ký Trở Thành Đối Tác</h1>
          <p>Hoàn thành thông tin dưới đây để bắt đầu hành trình hợp tác với Cuoidi.vn</p>
        </div>

        <div className="registration-content">
          <div className="registration-form-container">
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Thông Tin Doanh Nghiệp</h2>
                
                <div className="form-group">
                  <label htmlFor="businessName">Tên doanh nghiệp <span className="required">*</span></label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên doanh nghiệp của bạn"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="businessType">Loại hình doanh nghiệp <span className="required">*</span></label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn loại hình doanh nghiệp --</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="businessAddress">Địa chỉ doanh nghiệp <span className="required">*</span></label>
                  <input
                    type="text"
                    id="businessAddress"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                    placeholder="Nhập địa chỉ doanh nghiệp"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="businessPhone">Số điện thoại doanh nghiệp <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="businessPhone"
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleChange}
                      required
                      placeholder="Nhập số điện thoại doanh nghiệp"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="businessEmail">Email doanh nghiệp <span className="required">*</span></label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                      placeholder="Nhập email doanh nghiệp"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Nhập website của doanh nghiệp (nếu có)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="taxId">Mã số thuế</label>
                    <input
                      type="text"
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      placeholder="Nhập mã số thuế doanh nghiệp"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Thông Tin Người Liên Hệ</h2>

                <div className="form-group">
                  <label htmlFor="contactName">Họ và tên <span className="required">*</span></label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Nhập họ và tên người liên hệ"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactPhone">Số điện thoại <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      placeholder="Nhập số điện thoại liên hệ"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      placeholder="Nhập email liên hệ"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactPosition">Chức vụ <span className="required">*</span></label>
                  <input
                    type="text"
                    id="contactPosition"
                    name="contactPosition"
                    value={formData.contactPosition}
                    onChange={handleChange}
                    required
                    placeholder="Nhập chức vụ của người liên hệ"
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Thông Tin Dịch Vụ</h2>

                <div className="form-group">
                  <label htmlFor="serviceCategory">Danh mục dịch vụ <span className="required">*</span></label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn danh mục dịch vụ --</option>
                    {serviceCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="serviceDescription">Mô tả dịch vụ <span className="required">*</span></label>
                  <textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={handleChange}
                    required
                    placeholder="Mô tả chi tiết về dịch vụ của bạn"
                    rows={4}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="serviceArea">Khu vực cung cấp dịch vụ <span className="required">*</span></label>
                  <input
                    type="text"
                    id="serviceArea"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    required
                    placeholder="Ví dụ: Hà Nội, TP.HCM, Toàn quốc"
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Gói Dịch Vụ</h2>

                <div className="plan-selection">
                  <div className={`plan-option ${formData.plan === 'basic' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      id="basic"
                      name="plan"
                      value="basic"
                      checked={formData.plan === 'basic'}
                      onChange={handleChange}
                    />
                    <label htmlFor="basic">
                      <div className="plan-name">Cơ Bản</div>
                      <div className="plan-price">1.990.000đ / năm</div>
                    </label>
                  </div>

                  <div className={`plan-option ${formData.plan === 'premium' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      id="premium"
                      name="plan"
                      value="premium"
                      checked={formData.plan === 'premium'}
                      onChange={handleChange}
                    />
                    <label htmlFor="premium">
                      <div className="plan-name">Premium</div>
                      <div className="plan-price">3.990.000đ / năm</div>
                      <div className="plan-badge">Phổ biến nhất</div>
                    </label>
                  </div>

                  <div className={`plan-option ${formData.plan === 'enterprise' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      id="enterprise"
                      name="plan"
                      value="enterprise"
                      checked={formData.plan === 'enterprise'}
                      onChange={handleChange}
                    />
                    <label htmlFor="enterprise">
                      <div className="plan-name">Doanh Nghiệp</div>
                      <div className="plan-price">7.990.000đ / năm</div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreeTerms">
                    Tôi đồng ý với <Link to="/terms">Điều khoản sử dụng</Link> của Cuoidi.vn
                  </label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreePrivacy">
                    Tôi đồng ý với <Link to="/privacy">Chính sách bảo mật</Link> của Cuoidi.vn
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={!formData.agreeTerms || !formData.agreePrivacy}
              >
                Đăng Ký Đối Tác
              </button>
            </form>
          </div>

          <div className="registration-sidebar">
            <div className="sidebar-content">
              <h2>Quy Trình Đăng Ký</h2>
              <ol className="registration-steps">
                <li>
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Điền thông tin</h3>
                    <p>Hoàn thành biểu mẫu đăng ký với thông tin chính xác</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Xác minh</h3>
                    <p>Đội ngũ của chúng tôi sẽ xem xét và xác minh thông tin của bạn</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Thanh toán</h3>
                    <p>Thanh toán phí đăng ký theo gói dịch vụ đã chọn</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Hoàn thiện hồ sơ</h3>
                    <p>Cập nhật thông tin chi tiết và hình ảnh dịch vụ của bạn</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h3>Kích hoạt</h3>
                    <p>Tài khoản đối tác của bạn được kích hoạt và bắt đầu nhận đơn đặt hàng</p>
                  </div>
                </li>
              </ol>

              <div className="sidebar-support">
                <h3>Cần hỗ trợ?</h3>
                <p>Liên hệ với đội ngũ hỗ trợ đối tác của chúng tôi</p>
                <div className="support-contact">
                  <div><strong>Email:</strong> partners@cuoidi.vn</div>
                  <div><strong>Hotline:</strong> 1900 1234</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartnerRegistrationForm;
