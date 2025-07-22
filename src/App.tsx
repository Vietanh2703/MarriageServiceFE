import './App.css';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AIConsultationPage from './components/AIConsultationPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import OTPVerificationPage from './components/OTPVerificationPage';
import LoadingScreen from './components/LoadingScreen';
import AboutUsPage from './components/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';
import ServicesPage from "./components/ServicesPage.tsx";
import CateringPage from "./components/services/CateringPage.tsx";
import DecorationPage from "./components/services/DecorationPage.tsx";
import PhotographyPage from "./components/services/PhotographyPage";
import InvitationDesignPage from "./components/services/InvitationDesignPage.tsx";
import MakeupPage from "./components/services/MakeupPage.tsx";
import WeddingAttirePage from "./components/services/WeddingAttirePage.tsx";
import WeddingCarsPage from "./components/services/WeddingCarsPage.tsx";
import WeddingCeremonyPage from "./components/services/WeddingCeremonyPage.tsx";
import HomeLoggedPage from "./components/HomeLoggedPage.tsx";
import ChatbotPage from "./components/ChatbotPage.tsx";
import MisaProPage from "./components/MisaProPage.tsx";
import ProfilePage from "./components/ProfilePageClean.tsx";
import PartnerRegistrationIntroPage from "./components/partner/PartnerRegistrationIntroPage";
import PartnerRegistrationForm from "./components/partner/PartnerRegistrationForm";
import PartnerRegistrationCheckout from "./components/partner/PartnerRegistrationCheckout";
import PartnerRegistrationPaymentResult from "./components/partner/PartnerRegistrationPaymentResult.tsx";

function AppContent() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    // Xử lý loading khi chuyển trang
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="app light-theme">
            {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
            <div className="content">
                <Routes>
                    <Route path="/" element={
                        <HomePage  />
                    } />
                    <Route path="/ai-consultation" element={
                        <AIConsultationPage  />
                    } />
                    <Route path="/services" element={
                        <ServicesPage  />
                    } />
                    <Route path="/login" element={
                        <LoginPage />
                    } />
                    <Route path="/register" element={
                        <RegisterPage  />
                    } />
                    <Route path="/otp-verification" element={
                        <OTPVerificationPage />
                    } />
                    <Route path="/about" element={
                        <AboutUsPage />
                    } />
                    <Route path="/services/catering" element={
                        <CateringPage />
                    } />
                    <Route path="/services/decoration" element={
                        <DecorationPage />
                    } />
                    <Route path="/services/photography" element={
                        <PhotographyPage />
                    } />
                    <Route path="/services/invitation-design" element={
                        <InvitationDesignPage />
                    } />
                    <Route path="/services/makeup" element={
                        <MakeupPage />
                    } />
                    <Route path="/services/wedding-attire" element={
                        <WeddingAttirePage />
                    } />
                    <Route path="/services/wedding-cars" element={
                        <WeddingCarsPage />
                    } />
                    <Route path="/services/ceremony" element={
                        <WeddingCeremonyPage />
                    } />
                    <Route path="/home" element={
                        <HomeLoggedPage />
                    } />
                    <Route path="/chatbot" element={
                        <ChatbotPage />
                    } />
                    <Route path="/misa-pro" element={
                        <MisaProPage />
                    } />
                    <Route path="/partner-registration" element={
                        <PartnerRegistrationIntroPage />
                    } />
                    <Route path="/partner-registration/register" element={
                        <PartnerRegistrationForm />
                    } />
                    <Route path="/partner-registration/checkout" element={
                        <PartnerRegistrationCheckout />
                    } />
                    <Route path="/partner/payment-result" element={
                        <PartnerRegistrationPaymentResult />
                    } />
                    <Route path="/profile" element={
                        <ProfilePage />
                    } />
                    {/* Thêm các route khác nếu cần */}
                    <Route path="*" element={
                        <div className="not-found">
                            <h1>404 - Page Not Found</h1>
                            <p>Sorry, the page you are looking for does not exist.</p>
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
    );
}

export default App;
