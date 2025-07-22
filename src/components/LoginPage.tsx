import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.ts';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import Navbar from './Navbar';
import './LoginPage.css';
import Footer from "./Footer";
import Notification from './Notification';
import { apiRequest, API_CONFIG } from '../utils/apiConfig';
import { jwtDecode } from 'jwt-decode'; // Thêm import này

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

// Thêm interface cho JWT payload
interface JWTPayload {
  sub?: string;
  email?: string;
  role?: string;
  name?: string;
  exp?: number;
  iat?: number;
  jti?: string;
  // Microsoft Identity claims
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  [key: string]: any;
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

  // Thêm function để decode JWT token
  const decodeToken = (token: string): JWTPayload | null => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);

      // Extract email from Microsoft claims
      const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
          decoded.email;

      // Extract role from Microsoft claims
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decoded.role;

      return {
        ...decoded,
        email: email,
        role: role
      };
    } catch (error) {
      return null;
    }
  };


  // Thêm function để kiểm tra admin
  const isAdminUser = (user: any, token?: string): boolean => {

    // Kiểm tra từ user object trước
    if (user?.role === 'admin' || user?.email === 'admin@cuoidi.dev') {
      return true;
    }

    // Nếu có token, decode để kiểm tra
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        // Lấy email từ Microsoft claims
        const tokenEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
            decodedToken.email;

        // Lấy role từ Microsoft claims (có thể là GUID của role admin)
        const tokenRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
            decodedToken.role;

        // Kiểm tra email admin
        const isAdminEmail = tokenEmail === 'admin@cuoidi.dev';

        // Kiểm tra role (có thể cần thêm logic để map GUID role thành text)
        const isAdminRole = tokenRole === 'admin' ||
            tokenRole === 'ADMIN' ||
            // Nếu bạn biết GUID của admin role, thêm vào đây
            tokenRole === '960a814f-467c-4303-a951-3db74ea30aef'; // Ví dụ từ token của bạn


        if (isAdminEmail || isAdminRole) {
          return true;
        }
      }
    }
    return false;
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

        setTimeout(() => {
          // Sử dụng function isAdminUser mới với token decode
          if (isAdminUser(user, accessToken)) {
            console.log('Navigating to admin page for social login user:', user);
            navigate('/admin');
          } else {
            console.log('Navigating to home page for social login user:', user);
            navigate('/home');
          }
        }, 1500);
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
        }

        // Show success notification
        showNotification('Đăng nhập thành công!', 'success');

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userInfoUpdated'));

        // Navigate với logic kiểm tra admin mới
        setTimeout(() => {
          // Decode token để kiểm tra role
          console.log('Checking admin status for user:', response.user);
          console.log('Access token available:', !!response.accessToken);

          if (isAdminUser(response.user, response.accessToken)) {
            console.log('✅ Admin user detected, navigating to /admin');
            navigate('/admin');
          } else {
            console.log('👤 Regular user, navigating to /home');
            navigate('/home');
          }
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
