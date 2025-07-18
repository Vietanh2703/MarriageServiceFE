import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_CONFIG, buildApiUrl } from '../utils/apiConfig';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';
import Notification from './Notification';
import './ProfilePage.css';

interface UserRole {
  id: string;
  name: string;
}

interface UserProfile {
  userId: string;
  firebaseId: string;
  avatar: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  phoneNumber: string;
  roleId: string;
  role: UserRole | null;
  isDeleted: boolean;
  lastUpdatedBy: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
}

interface DecodedToken {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  nameid?: string;
  sub?: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const getUserIdFromToken = (): string | null => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;

    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
             decodedToken.nameid ||
             decodedToken.sub ||
             null;
    } catch {
      return null;
    }
  };

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  const fetchUserProfile = useCallback(async () => {
    const userId = getUserIdFromToken();
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(buildApiUrl(`/user/${userId}`), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.isSuccess && response.data.result) {
        setProfile(response.data.result);
        setEditedProfile(response.data.result);
      } else {
        showNotification('Không thể tải thông tin profile', 'error');
      }
    } catch {
      showNotification('Lỗi khi tải thông tin profile', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, showNotification]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const updateProfile = async () => {
    const userId = getUserIdFromToken();
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken || !profile) return;

    try {
      setIsSaving(true);

      const updateData = {
        userId: profile.userId,
        firebaseId: profile.firebaseId,
        avatar: editedProfile.avatar !== undefined ? editedProfile.avatar : profile.avatar,
        userName: profile.userName,
        email: editedProfile.email !== undefined ? editedProfile.email : profile.email,
        firstName: editedProfile.firstName !== undefined ? editedProfile.firstName : profile.firstName,
        lastName: editedProfile.lastName !== undefined ? editedProfile.lastName : profile.lastName,
        birthday: editedProfile.birthday !== undefined ? editedProfile.birthday : profile.birthday,
        address: editedProfile.address !== undefined ? editedProfile.address : profile.address,
        phoneNumber: editedProfile.phoneNumber !== undefined ? editedProfile.phoneNumber : profile.phoneNumber,
        roleId: profile.roleId
      };

      try {
        const response = await axios.put(buildApiUrl(`/user/${userId}`), updateData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.isSuccess) {
          setProfile({ ...profile, ...updateData });
          setIsEditing(false);
          showNotification('Cập nhật thông tin thành công!', 'success');
          localStorage.setItem('userInfo', JSON.stringify({ ...profile, ...updateData }));
          window.dispatchEvent(new Event('userInfoUpdated'));
        } else {
          showNotification('Không thể cập nhật thông tin', 'error');
        }
      } catch (apiError) {
        const error = apiError as { response?: { status: number; data?: { message?: string } }; message?: string };

        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');

          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN), {
                refreshToken: refreshToken
              });

              if (refreshResponse.data.isSuccess) {
                const newAccessToken = refreshResponse.data.result.accessToken;
                const newRefreshToken = refreshResponse.data.result.refreshToken;

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                const retryResponse = await axios.put(buildApiUrl(`/user/${userId}`), updateData, {
                  headers: {
                    'Authorization': `Bearer ${newAccessToken}`,
                    'Content-Type': 'application/json'
                  }
                });

                if (retryResponse.data.isSuccess) {
                  setProfile({ ...profile, ...updateData });
                  setIsEditing(false);
                  showNotification('Cập nhật thông tin thành công!', 'success');
                  localStorage.setItem('userInfo', JSON.stringify({ ...profile, ...updateData }));
                  window.dispatchEvent(new Event('userInfoUpdated'));
                } else {
                  showNotification('Không thể cập nhật thông tin', 'error');
                }
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userInfo');
                showNotification('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
                setTimeout(() => navigate('/login'), 2000);
              }
            } catch {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userInfo');
              showNotification('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
              setTimeout(() => navigate('/login'), 2000);
            }
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            showNotification('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
            setTimeout(() => navigate('/login'), 2000);
          }
        } else {
          showNotification(`Lỗi cập nhật thông tin: ${error.response?.data?.message || error.message || 'Unknown error'}`, 'error');
        }
      }
    } catch {
      showNotification('Lỗi khi cập nhật thông tin', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const getDisplayValue = (field: keyof UserProfile): string => {
    const value = isEditing
      ? (editedProfile[field] !== undefined ? editedProfile[field] : profile?.[field])
      : profile?.[field];

    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'boolean') return value.toString();
    return '';
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <HomeNavbar />
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin cá nhân...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <HomeNavbar />
        <div className="profile-error">
          <h2>Không tìm thấy thông tin cá nhân</h2>
          <button onClick={() => navigate('/home')} className="back-btn">
            Quay lại trang chủ
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <HomeNavbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="header-content">
            <div className="avatar-section">
              <div className="avatar-container">
                <img
                  src={profile.avatar || '/public/logo.png'}
                  alt="Avatar"
                  className="profile-avatar"
                />
                <div className="avatar-edit-btn" onClick={() => setIsEditing(true)}>
                  <span>📷</span>
                </div>
              </div>
              <div className="profile-name">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <p className="profile-email">{profile.email}</p>
              </div>
            </div>
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              <span>✏️</span> Chỉnh sửa thông tin
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="column">
            <div className="info-section">
              <h3>Thông tin cá nhân</h3>
              <div className="info-item">
                <label>Họ</label>
                <p>{profile.firstName || 'Chưa cập nhật'}</p>
              </div>
              <div className="info-item">
                <label>Tên</label>
                <p>{profile.lastName || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="info-section">
              <h3>Thông tin liên hệ</h3>
              <div className="info-item">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
              <div className="info-item">
                <label>Số điện thoại</label>
                <p>{profile.phoneNumber || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="info-section">
              <h3>Thông tin khác</h3>
              <div className="info-item">
                <label>Ngày sinh</label>
                <p>{profile.birthday ? new Date(profile.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
              </div>
              <div className="info-item">
                <label>Địa chỉ</label>
                <p>{profile.address || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <div className="edit-header">
              <h2>Chỉnh sửa thông tin cá nhân</h2>
              <button className="close-btn" onClick={handleCancel}>✕</button>
            </div>
            <div className="edit-content">
              <div className="edit-avatar-section">
                <div className="edit-avatar-container">
                  <img
                    src={getDisplayValue('avatar') || '/public/logo.png'}
                    alt="Avatar"
                    className="edit-avatar"
                  />
                  <input
                    type="url"
                    placeholder="URL ảnh đại diện"
                    value={getDisplayValue('avatar')}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                    className="avatar-input"
                  />
                </div>
              </div>
              <div className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ *</label>
                    <input
                      type="text"
                      value={getDisplayValue('firstName')}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Nhập họ"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên *</label>
                    <input
                      type="text"
                      value={getDisplayValue('lastName')}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Nhập tên"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={getDisplayValue('email')}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Nhập email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      value={getDisplayValue('phoneNumber')}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input
                      type="date"
                      value={formatDate(getDisplayValue('birthday'))}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Địa chỉ</label>
                  <textarea
                    value={getDisplayValue('address')}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Nhập địa chỉ"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="edit-actions">
              <button className="cancel-btn" onClick={handleCancel} disabled={isSaving}>
                Hủy
              </button>
              <button className="save-btn" onClick={updateProfile} disabled={isSaving}>
                {isSaving ? 'Đang lưu...' : 'Lưu thông tin'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default ProfilePage;
