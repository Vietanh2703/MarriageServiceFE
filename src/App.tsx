import './App.css';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AIConsultationPage from './components/AIConsultationPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LoadingScreen from './components/LoadingScreen';
import AboutUsPage from './components/AboutUsPage';

// Create inner component that uses useLocation
function AppContent() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    
    // Manage dark mode state directly without context
    const [darkMode, setDarkMode] = useState(() => {
        // Use the same localStorage key as ThemeToggle component
        return localStorage.getItem('theme') === 'dark';
    });
    
    // Listen to theme changes from ThemeToggle
    useEffect(() => {
        const handleThemeChange = (e: any) => {
            if (e.detail && 'theme' in e.detail) {
                setDarkMode(e.detail.theme === 'dark');
            }
        };
        
        window.addEventListener('themeChanged', handleThemeChange);
        
        return () => {
            window.removeEventListener('themeChanged', handleThemeChange);
        };
    }, []);
    
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };
    
    // Reset scroll position on page reload and route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    // Show loading screen on route change
    useEffect(() => {
        setIsLoading(true);
    }, [location.pathname]);
    
    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            {isLoading && (
                <LoadingScreen onLoadingComplete={handleLoadingComplete} darkMode={darkMode} />
            )}
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
                    <Route path="/ai-consultation" element={<AIConsultationPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
                    <Route path="/login" element={<LoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
                    <Route path="/register" element={<RegisterPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
                    <Route path="/about" element={<AboutUsPage />} />
                </Routes>
            </div>
        </div>
    );
}

// Main App component that provides the Router context
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
