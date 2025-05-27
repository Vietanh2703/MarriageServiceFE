import './App.css';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AIConsultationPage from './components/AIConsultationPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LoadingScreen from './components/LoadingScreen';
import AboutUsPage from './components/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    // Quản lý dark mode
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    
    // Lắng nghe sự thay đổi theme
    useEffect(() => {
        const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
            setDarkMode(e.detail.theme === 'dark');
        };
        
        window.addEventListener('themeChanged', handleThemeChange as EventListener);

        return () => {
            window.removeEventListener('themeChanged', handleThemeChange as EventListener);
        };
    }, []);
    
    // Xử lý toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');

        // Phát event khi theme thay đổi
        const themeChangeEvent = new CustomEvent('themeChanged', {
            detail: { theme: newDarkMode ? 'dark' : 'light' }
        });
        window.dispatchEvent(themeChangeEvent);
    };
    
    // Xử lý loading khi chuyển trang
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Kiểm tra hiển thị BackToTop

    return (
        <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} darkMode={darkMode} />}
            <div className="content">
                <Routes>
                    <Route path="/" element={
                        <HomePage  />
                    } />
                    <Route path="/ai-consultation" element={
                        <AIConsultationPage  />
                    } />
                    <Route path="/login" element={
                        <LoginPage />
                    } />
                    <Route path="/register" element={
                        <RegisterPage  />
                    } />
                    <Route path="/about" element={
                        <AboutUsPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                    } />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
