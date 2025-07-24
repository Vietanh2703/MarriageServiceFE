import React, { useEffect, useState } from 'react';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './MisaProResultPage.css';

const MisaProResult: React.FC = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (count === 0) {
            navigate('/home');
            return;
        }
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, navigate]);

    return (
        <div className="misa-pro-result-bg">
            <HomeNavbar />
            <main className="misa-pro-result-main">
                <div className="misa-pro-result-message">
                    <h2>Payment Successful!</h2>
                    <p>Bạn đã thanh toán thành công.</p>
                </div>
                <button
                    className="misa-pro-result-countdown"
                    disabled
                >
                    Quay lại trang chủ sau {count}s
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default MisaProResult;