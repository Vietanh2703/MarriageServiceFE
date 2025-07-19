import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.ts';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import Navbar from './Navbar';
import './LoginPage.css';
import Footer from "./Footer";
import Notification from './Notification';
import { apiRequest, API_CONFIG } from '../utils/apiConfig';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const navigate = useNavigate();

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      isVisible: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const saveUser = (user: any) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  };

  const loginAPI = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle different possible API response structures
        let accessToken, refreshToken, user;

        if (data.result) {
          // If API uses result wrapper
          accessToken = data.result.accessToken || data.result.access_token || data.result.token;
          refreshToken = data.result.refreshToken || data.result.refresh_token;
          user = data.result.user || data.result.userInfo || data.result;
        } else {
          // Direct response structure
          accessToken = data.accessToken || data.access_token || data.token;
          refreshToken = data.refreshToken || data.refresh_token;
          user = data.user || data.userInfo || data;
        }

        return {
          success: true,
          message: data.message || 'Đăng nhập thành công!',
          accessToken,
          refreshToken,
          user,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại.',
      };
    }
  };

  const getDeviceId = () => {
    // Simple deviceId generator (customize as needed)
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2) + Date.now();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const handleSocialLogin = async (providerType: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      const provider =
          providerType === 'google'
              ? new GoogleAuthProvider()
              : new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const deviceId = getDeviceId();

      // Send to your API
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.FIREBASE_LOGIN, {
        method: 'POST',
        body: JSON.stringify({ idToken, deviceId }),
      });
      const data = await response.json();

      if (response.ok && (data.accessToken || data.result?.accessToken)) {
        // Save tokens and user info as before
        const accessToken = data.accessToken || data.result?.accessToken;
        const refreshToken = data.refreshToken || data.result?.refreshToken;
        const user = data.user || data.result?.user;
        if (accessToken && refreshToken) saveTokens(accessToken, refreshToken);
        if (user) saveUser(user);
        showNotification('Đăng nhập thành công!', 'success');
        window.dispatchEvent(new Event('userInfoUpdated'));
        setTimeout(() => navigate('/home'), 1500);
      } else {
        showNotification(data.message || 'Đăng nhập thất bại.', 'error');
      }
    } catch (error) {
      console.error('Social login error:', error);
      showNotification('Lỗi đăng nhập mạng xã hội.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showNotification('Vui lòng nhập đầy đủ email và mật khẩu', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      const response = await loginAPI(credentials);


      if (response.success) {
        // Save tokens and user info
        if (response.accessToken && response.refreshToken) {
          saveTokens(response.accessToken, response.refreshToken);
        } else {
          console.log('No tokens in response:', {
            hasAccessToken: !!response.accessToken,
            hasRefreshToken: !!response.refreshToken
          });
        }

        if (response.user) {
          saveUser(response.user);
        } else {
          console.log('No user data in response');
        }

        // Show success notification
        showNotification('Đăng nhập thành công!', 'success');

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userInfoUpdated'));

        // Navigate to HomeLoggedPage after a short delay
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        console.log('Login failed:', response.message);
        // Show error notification
        showNotification(response.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification('Lỗi kết nối. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1>Đăng Nhập</h1>
          <p className="login-subtitle">Đăng nhập để truy cập tài khoản của bạn</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập địa chỉ email của bạn"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu của bạn"
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" disabled={isLoading} />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>

            {/* Divider with "hoặc" text */}
            <div className="social-divider">
              <div className="divider-line"></div>
              <span className="divider-text">hoặc</span>
              <div className="divider-line"></div>
            </div>

            {/* Social login buttons */}
            <div className="social-login-buttons">
              <button
                  type="button"
                  className="social-button google-button"
                  disabled={isLoading}
                  onClick={() => handleSocialLogin('google')}
              >
                <img src="/icons8-google-240.svg" alt="Google" />
                Đăng nhập với Google
              </button>
              <button
                  type="button"
                  className="social-button facebook-button"
                  disabled={isLoading}
                  onClick={() => handleSocialLogin('facebook')}
              >
                <img src="/icons8-facebook-144.svg" alt="Facebook" />
                Đăng nhập với Facebook
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
          </div>
        </div>

        <div className="login-image">
          <div className="login-image-content">
            <h2>Chào mừng đến với Cuoidi.vn</h2>
            <p>Nền tảng kết nối dịch vụ cưới hỏi hàng đầu Việt Nam</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
