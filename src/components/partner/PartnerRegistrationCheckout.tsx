import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaInfoCircle, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../HomeNavbar';
import Footer from '../Footer';
import Notification from '../Notification';
import { API_CONFIG, buildApiUrl } from '../../utils/apiConfig';
import './PartnerRegistrationCheckout.css';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface FormDataType {
  // Business Information
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  website: string;
  taxId: string;

  // Contact Person Information
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactPosition: string;

  // Service Information
  serviceCategory: string;
  serviceDescription: string;
  serviceArea: string;

  // Account Information
  password: string;
  confirmPassword: string;

  // Plan Selection
  plan: string;

  // Terms and Conditions
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

// QR codes for different packages
const QR_CODES = {
  basic: "https://api.vietqr.io/image/970432-0388733989-d9jPf9B.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=10000&addInfo=StandardCuoidiPartnerRegistration",
  premium: "https://api.vietqr.io/image/970432-0388733989-d9jPf9B.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=30000&addInfo=PremiumCuoidiPartnerRegistration",
  enterprise: "https://api.vietqr.io/image/970432-0388733989-d9jPf9B.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=30000&addInfo=EnterpriseCuoidiPartnerRegistration"
};

// Package pricing
const PACKAGE_PRICING = {
  basic: 1990000,
  premium: 3990000,
  enterprise: 7990000
};

const PartnerRegistrationCheckout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<FormDataType | null>(null);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      isVisible: true,
      message,
      type
    });
  };

  // Get registration data from location state
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const data = location.state?.registrationData as FormDataType;
    if (!data) {
      // If no data was passed, redirect back to the form
      navigate('/partner-registration/register');
      return;
    }

    setRegistrationData(data);
  }, [location.state, navigate]);

  // Handle back button - preserve form data
  const handleGoBack = () => {
    if (registrationData) {
      // Navigate back to form with preserved data
      navigate('/partner-registration/register', {
        state: { registrationData: registrationData }
      });
    } else {
      // Fallback to regular navigation
      navigate('/partner-registration/register');
    }
  };

  // Function to send business registration data to API
  const sendBusinessRegistrationToAPI = async (formData: FormDataType) => {
    try {
      // Get access token from localStorage
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        showNotification("Access token not found. Please log in again.", 'error');
      }

      // Get plan name for the plan field
      const getPlanName = (plan: string) => {
        switch(plan) {
          case 'basic':
            return 'Gói thường - Standard - 1.990.000.00đ';
          case 'premium':
            return 'Gói cao cấp - Premium - 3.990.000.00đ';
          case 'enterprise':
            return 'Gói doanh nghiệp - Enterprise - 7.990.000.00đ';
          default:
            return 'Standard - 1.990.000.00đ';
        }
      };

      // Prepare data according to the API format
      const apiData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        businessAddress: formData.businessAddress,
        businessPhone: formData.businessPhone,
        businessEmail: formData.businessEmail,
        website: formData.website || "",
        taxId: formData.taxId || "",
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        contactPosition: formData.contactPosition,
        serviceCategory: formData.serviceCategory,
        serviceDescription: formData.serviceDescription,
        serviceArea: formData.serviceArea,
        plan: getPlanName(formData.plan)
      };

      console.log('Sending business registration data:', apiData);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Business registration successful:', result);
      return result;

    } catch (error) {
      console.error('Business registration API error:', error);
      throw error;
    }
  };

  // Calculate pricing based on selected plan
  const getCheckoutItem = (): CheckoutItem | null => {
    if (!registrationData) return null;

    const planName = registrationData.plan;
    const price = PACKAGE_PRICING[planName as keyof typeof PACKAGE_PRICING] || 0;

    let name = 'Gói Đăng Ký Đối Tác';
    let description = 'Gói đăng ký đối tác với Cuoidi.vn';

    switch(planName) {
      case 'basic':
        name = 'Gói Đăng Ký Đối Tác Cơ Bản';
        description = 'Gói cơ bản với các tính năng thiết yếu cho đối tác';
        break;
      case 'premium':
        name = 'Gói Đăng Ký Đối Tác Premium';
        description = 'Gói cao cấp với đầy đủ tính năng và hỗ trợ ưu tiên';
        break;
      case 'enterprise':
        name = 'Gói Đăng Ký Đối Tác Doanh Nghiệp';
        description = 'Gói dành cho doanh nghiệp lớn với tính năng độc quyền';
        break;
    }

    return {
      id: '1',
      name,
      price,
      description
    };
  };

  const checkoutItem = getCheckoutItem();
  const subtotal = checkoutItem?.price || 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationData) {
      showNotification("Không có dữ liệu đăng ký để xử lý.", 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Check if user is logged in
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        showNotification("Hết phiên đăng nhập. Chuyển đến trang đăng nhập lại", 'error');
        setIsLoading(false);
        navigate('/login');
        return;
      }

      // Send registration data to API
      const result = await sendBusinessRegistrationToAPI(registrationData);

      // Show success notification
      showNotification("Đăng ký đối tác thành công!", 'success');

      // Wait for notification to show, then navigate to success page
      setTimeout(() => {
        navigate('/partner/payment-result', {
          state: {
            success: true,
            orderData: {
              registrationData,
              checkoutItem,
              total,
              apiResult: result
            }
          }
        });
      }, 2000);

    } catch (error: any) {
      console.error('Registration submission failed:', error);

      let errorMessage = 'Có lỗi xảy ra khi đăng ký đối tác. Vui lòng thử lại.';

      if (error.message.includes('Access token not found')) {
        errorMessage = 'Vui lòng đăng nhập để tiếp tục đăng ký.';
      } else if (error.message.includes('HTTP error')) {
        errorMessage = 'Lỗi kết nối đến server. Vui lòng kiểm tra kết nối và thử lại.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Get QR code based on selected plan
  const getQRCode = () => {
    if (!registrationData) return '';
    return QR_CODES[registrationData.plan as keyof typeof QR_CODES] || '';
  };

  // If registration data is not available, show loading or redirect
  if (!registrationData) {
    return <div className="loading-container">Đang tải...</div>;
  }

  return (
      <div className="partner-checkout-page">
        <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={hideNotification}
        />
        <Navbar />

        <div className="checkout-container">
          <div className="checkout-header">
            <h1>Thanh Toán Đăng Ký Đối Tác</h1>
            <p>Vui lòng kiểm tra thông tin và hoàn tất thanh toán</p>
          </div>

          <div className="checkout-content">
            {/* Registration Summary */}
            <div className="registration-summary">
              <h2>Thông Tin Đăng Ký</h2>

              {/* Business Information */}
              <div className="info-section">
                <h3>
                  <FaBuilding className="section-icon" />
                  Thông Tin Doanh Nghiệp
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Tên doanh nghiệp:</span>
                    <span className="info-value">{registrationData.businessName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Loại hình:</span>
                    <span className="info-value">{registrationData.businessType}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Địa chỉ:</span>
                    <span className="info-value">{registrationData.businessAddress}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Điện thoại:</span>
                    <span className="info-value">{registrationData.businessPhone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{registrationData.businessEmail}</span>
                  </div>
                  {registrationData.website && (
                      <div className="info-item">
                        <span className="info-label">Website:</span>
                        <span className="info-value">{registrationData.website}</span>
                      </div>
                  )}
                  {registrationData.taxId && (
                      <div className="info-item">
                        <span className="info-label">Mã số thuế:</span>
                        <span className="info-value">{registrationData.taxId}</span>
                      </div>
                  )}
                </div>
              </div>

              {/* Contact Person Information */}
              <div className="info-section">
                <h3>
                  <FaUser className="section-icon" />
                  Thông Tin Người Liên Hệ
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Họ và tên:</span>
                    <span className="info-value">{registrationData.contactName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Chức vụ:</span>
                    <span className="info-value">{registrationData.contactPosition}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Điện thoại:</span>
                    <span className="info-value">{registrationData.contactPhone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{registrationData.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="info-section">
                <h3>
                  <FaInfoCircle className="section-icon" />
                  Thông Tin Dịch Vụ
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Danh mục:</span>
                    <span className="info-value">{registrationData.serviceCategory}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Khu vực:</span>
                    <span className="info-value">{registrationData.serviceArea}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="info-label">Mô tả:</span>
                    <span className="info-value description">{registrationData.serviceDescription}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3>
                  <FaMoneyBillWave className="section-icon" />
                  Chi Tiết Thanh Toán
                </h3>
                {checkoutItem && (
                    <div className="order-item">
                      <div className="item-info">
                        <h4>{checkoutItem.name}</h4>
                        <p>{checkoutItem.description}</p>
                      </div>
                      <div className="item-price">
                        {formatPrice(checkoutItem.price)}
                      </div>
                    </div>
                )}

                <div className="order-totals">
                  <div className="total-row">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="total-row">
                    <span>Thuế VAT (10%):</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="total-row total-final">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-information">
              <h2>Thanh Toán</h2>
              <div className="payment-method-info">
                <h3>Chuyển khoản ngân hàng</h3>
                <p className="payment-instructions">
                  Vui lòng quét mã QR bên dưới hoặc chuyển khoản theo thông tin với nội dung chuyển khoản đúng với mã đơn hàng.
                </p>

                <div className="qr-code-container">
                  <img src={getQRCode()} alt="QR Code thanh toán" className="qr-code" />
                </div>

                <div className="bank-info">
                  <h4>Thông tin chuyển khoản:</h4>
                  <ul>
                    <li><strong>Ngân hàng:</strong> VPBank (Ngân Hàng Việt Nam Thịnh Vượng)</li>
                    <li><strong>Số tài khoản:</strong> 0388733989</li>
                    <li><strong>Chủ tài khoản:</strong> NGUYEN TRUNG VIỆT ANH</li>
                    <li><strong>Số tiền:</strong> {formatPrice(total)}</li>
                    <li><strong>Nội dung chuyển khoản:</strong> {registrationData.plan === 'basic' ? 'StandardCuoidiPartnerRegistration' : registrationData.plan === 'premium' ? 'PremiumCuoidiPartnerRegistration' : 'EnterpriseCuoidiPartnerRegistration'}</li>
                  </ul>
                </div>

                <div className="payment-note">
                  <h4>Lưu ý:</h4>
                  <ul>
                    <li>Sau khi chuyển khoản thành công, vui lòng nhấn nút "Xác nhận đã thanh toán" bên dưới.</li>
                    <li>Hệ thống sẽ tự động gửi thông tin đăng ký đối tác của bạn đến backend để xử lý.</li>
                    <li>Tài khoản của bạn sẽ được kích hoạt trong vòng 24 giờ làm việc sau khi xác nhận thanh toán.</li>
                    <li>Nếu cần hỗ trợ, vui lòng liên hệ hotline: <strong>1900 1234</strong></li>
                  </ul>
                </div>
              </div>

              <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleGoBack}
                    disabled={isLoading}
                >
                  Quay lại
                </button>
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                  {isLoading ? 'Đang xử lý...' : 'Xác nhận đã thanh toán'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-footer-wrapper">
          <Footer />
        </div>
      </div>
  );
};

export default PartnerRegistrationCheckout;