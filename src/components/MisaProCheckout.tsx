import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';
import './MisaProCheckout.css';

const PLAN_INFO = {
    basic: {
        name: 'Basic',
        price: '10.000đ',
        bankAccount: '0388733989',
        bankName: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)',
        accountName: 'NGUYEN TRUNG VIET ANH',
        qrImage: 'https://api.vietqr.io/image/970432-0388733989-ksUOAFI.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=10000&addInfo=MisaAIBasicReigtration',
        transferInfo: 'MisaAIBasicReigtration',
    },
    pro: {
        name: 'Pro',
        price: '20.000đ',
        bankAccount: '0388733989',
        bankName: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)',
        accountName: 'NGUYEN TRUNG VIET ANH',
        qrImage: 'https://api.vietqr.io/image/970432-0388733989-ksUOAFI.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=20000&addInfo=MisaAIProReigtration',
        transferInfo: 'MisaAIProReigtration',
    },
    premium: {
        name: 'Premium',
        price: '20.000đ',
        bankAccount: '0388733989',
        bankName: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)',
        accountName: 'NGUYEN TRUNG VIET ANH',
        qrImage: 'https://api.vietqr.io/image/970432-0388733989-ksUOAFI.jpg?accountName=NGUYEN%20T%20V%20ANH&amount=20000&addInfo=MisaAIPremiumReigtration',
        transferInfo: 'MisaAIPremiumReigtration',
    },
};

type PlanType = 'basic' | 'pro' | 'premium';

const MisaProCheckout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan, email } = location.state || {};

    if (!plan || !email || !PLAN_INFO[plan as PlanType]) {
        navigate('/');
        return null;
    }

    const info = PLAN_INFO[plan as PlanType];

    const handleBack = () => {
        navigate(-1);
    };

    const handleConfirm = () => {
        alert('Thank you for your payment! We will verify and activate your plan soon.');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <HomeNavbar />
            <main style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '200px 0 100px 0' // More top padding
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: 900,
                    margin: '0 16px'
                }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#0f172a', fontWeight: 700, fontSize: '1.7rem' }}>
                        Checkout - {info.name} Plan
                    </h2>
                    <div style={{
                        display: 'flex',
                        gap: 48,
                        flexWrap: 'wrap'
                    }}>
                        {/* Left column: Transfer info */}
                        <div style={{ flex: 1, minWidth: 260 }}>
                            <div className="misa-checkout-section">
                                <p>Tài khoản: <b>{email}</b></p>
                            </div>
                            <div className="misa-checkout-section">
                                <p>Amount: <b>{info.price}</b></p>
                                <p>Bank: <b>{info.bankName}</b></p>
                                <p>Account Number: <b>{info.bankAccount}</b></p>
                                <p>Account Name: <b>{info.accountName}</b></p>
                                <p>Transfer Content: <b>{info.transferInfo} - {email}</b></p>
                            </div>
                            <div className="misa-checkout-note">
                                <p>Please transfer the exact amount and content for quick activation.</p>
                            </div>
                        </div>
                        {/* Right column: QR and buttons */}
                        <div style={{
                            flex: 1,
                            minWidth: 260,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div className="misa-checkout-qr">
                                <p>Scan QR to pay:</p>
                                <img
                                    src={info.qrImage}
                                    alt="QR code"
                                    width={240}
                                    height={240}
                                    style={{ borderRadius: 8, boxShadow: '0 2px 8px #0001' }}
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: 16,
                                marginTop: 32,
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <button
                                    onClick={handleBack}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: 6,
                                        border: 'none',
                                        background: '#e2e8f0',
                                        color: '#334155',
                                        fontWeight: 500,
                                        cursor: 'pointer'
                                    }}
                                >
                                    &#8592; Back
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: 6,
                                        border: 'none',
                                        background: '#0ea5e9',
                                        color: '#fff',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MisaProCheckout;