import React, {useEffect, useState} from 'react';
import Footer from './Footer';
import './MisaProPage.css';
import HomeNavbar from "./HomeNavbar.tsx";
import { useNavigate } from 'react-router-dom';
import {jwtDecode } from 'jwt-decode';
import Notification from './Notification';

const MisaProPage: React.FC = () => {
    const [notification,setNotification] = useState({
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
    const navigate = useNavigate();

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('misa-animate-in');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.misa-animate').forEach((element) => {
            observer.observe(element);
        });
        return () => observer.disconnect();
    }, []);

    type JWTPayload = {
        email?: string;
        role?: string;
        [key: string]: any;
    };

    const decodeToken = (token: string): JWTPayload | null => {
        try {
            const decoded = jwtDecode<JWTPayload>(token);
            const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || decoded.email;
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role;
            return { ...decoded, email, role };
        } catch {
            return null;
        }
    };

    const handleRegisterClick = (plan: 'basic' | 'pro' | 'premium') => {
        const token = localStorage.getItem('accessToken');
        const payload = token ? decodeToken(token) : null;
        const email = payload?.email;
        if (!email) {
            showNotification("Vui lòng đăng nhập để nâng cấp gói", 'error');
            return;
        }
        navigate('checkout', {
            state: { plan, email }
        });
    };

    return (
        <div className="misa-pro-page">
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
            />
            <HomeNavbar />

            <div className="misa-hero">
                <div className="misa-hero-content">
                    <div className="misa-hero-text">
                        <span className="misa-pro-badge misa-animate">Nâng cấp MISA Pro ngay</span>
                        <h1 className="misa-animate">Tối ưu hiệu suất<br />Tiết kiệm thời gian</h1>
                        <p className="misa-hero-desc misa-animate">
                            Trải nghiệm dịch vụ cao cấp với AI tư vấn thông minh và công cụ lập kế hoạch chuyên nghiệp
                        </p>
                        <div className="misa-hero-stats misa-animate">
                            <div className="misa-stat-item">
                                <span className="misa-stat-number">80%</span>
                                <span className="misa-stat-label">Tiết kiệm thời gian</span>
                            </div>
                            <div className="misa-stat-item">
                                <span className="misa-stat-number">30%</span>
                                <span className="misa-stat-label">Tối ưu chi phí</span>
                            </div>
                            <div className="misa-stat-item">
                                <span className="misa-stat-number">24/7</span>
                                <span className="misa-stat-label">Hỗ trợ</span>
                            </div>
                        </div>
                    </div>
                    <div className="misa-hero-image misa-animate">
                        <div className="misa-performance-visual">
                            <div className="misa-performance-chart">
                                <div className="misa-chart-bar standard">
                                    <span className="misa-bar-label">Thông thường</span>
                                </div>
                                <div className="misa-chart-bar pro">
                                    <span className="misa-bar-label">MISA Pro</span>
                                    <span className="misa-boost-label">+300% hiệu suất</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="misa-pricing">
                <div className="misa-pricing-header misa-animate">
                    <h2>Lựa chọn gói phù hợp</h2>
                    <p>Bắt đầu hành trình cưới hoàn hảo của bạn</p>
                </div>
                <div className="misa-pricing-grid">
                    <div className="misa-plan-card basic misa-animate">
                        <div className="misa-plan-header">
                            <h3>Basic</h3>
                            <div className="misa-plan-price">
                                <span className="price">10.000đ</span>
                                <span className="period">/tháng</span>
                            </div>
                        </div>
                        <ul className="misa-plan-features">
                            <li>AI Tư vấn cơ bản</li>
                            <li>Công cụ lập kế hoạch</li>
                            <li>Quản lý ngân sách</li>
                            <li>Hỗ trợ qua email</li>
                        </ul>
                        <button className="misa-plan-button" onClick={() => handleRegisterClick('basic')}>Đăng kí ngay</button>
                    </div>

                    <div className="misa-plan-card pro misa-animate">
                        <div className="misa-popular-tag">Phổ biến nhất</div>
                        <div className="misa-plan-header">
                            <h3>Pro</h3>
                            <div className="misa-plan-price">
                                <span className="price">20.000đ</span>
                                <span className="period">/tháng</span>
                            </div>
                        </div>
                        <ul className="misa-plan-features">
                            <li>Tất cả tính năng tiêu chuẩn</li>
                            <li>AI Tư vấn không giới hạn</li>
                            <li>Công cụ thiết kế thiệp</li>
                            <li>Hỗ trợ 24/7</li>
                            <li>Báo cáo chi tiết</li>
                            <li>Ưu đãi từ đối tác</li>
                        </ul>
                        <button className="misa-plan-button highlighted" onClick={() => handleRegisterClick('pro')}>Đăng kí ngay</button>
                    </div>

                    <div className="misa-plan-card premium misa-animate">
                        <div className="misa-plan-header">
                            <h3>Premium</h3>
                            <div className="misa-plan-price">
                                <span className="price">30.000đ</span>
                                <span className="period">/tháng</span>
                            </div>
                        </div>
                        <ul className="misa-plan-features">
                            <li>Tất cả tính năng Pro</li>
                            <li>Tư vấn viên riêng</li>
                            <li>Ưu tiên hỗ trợ VIP</li>
                            <li>Tích hợp nhà cung cấp cao cấp</li>
                            <li>Giảm giá độc quyền</li>
                            <li>Báo cáo phân tích chuyên sâu</li>
                            <li>Tùy chỉnh giao diện</li>
                        </ul>
                        <button className="misa-plan-button premium-button" onClick={() => handleRegisterClick('premium')}>Đăng kí ngay</button>
                    </div>
                </div>
            </div>

            <div className="misa-benefits">
                <h2 className="misa-section-title misa-animate">Vì sao nên nâng cấp MISA Pro?</h2>
                <div className="misa-benefits-grid">
                    <div className="misa-benefit-card misa-animate">
                        <span className="misa-benefit-icon">⚡</span>
                        <h3>Tăng hiệu suất 300%</h3>
                        <p>Tự động hóa quy trình lập kế hoạch với AI tiên tiến</p>
                    </div>
                    <div className="misa-benefit-card misa-animate">
                        <span className="misa-benefit-icon">💰</span>
                        <h3>Tối ưu chi phí</h3>
                        <p>Tiết kiệm đến 30% ngân sách với công cụ quản lý thông minh</p>
                    </div>
                    <div className="misa-benefit-card misa-animate">
                        <span className="misa-benefit-icon">🎯</span>
                        <h3>Quyết định chính xác</h3>
                        <p>Phân tích dữ liệu và gợi ý thông minh từ AI</p>
                    </div>
                    <div className="misa-benefit-card misa-animate">
                        <span className="misa-benefit-icon">🤝</span>
                        <h3>Hỗ trợ 24/7</h3>
                        <p>Đội ngũ chuyên gia sẵn sàng tư vấn mọi lúc</p>
                    </div>
                </div>
            </div>

            <div className="misa-cta">
                <div className="misa-cta-content misa-animate">
                    <div className="misa-cta-header">
                        <h2>Sẵn sàng tối ưu hóa đám cưới của bạn?</h2>
                        <p>Trải nghiệm ngay với gói dùng thử miễn phí 7 ngày</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MisaProPage;
