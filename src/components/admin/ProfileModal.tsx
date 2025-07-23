import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { buildApiUrl } from '../../utils/apiConfig';
import { jwtDecode } from 'jwt-decode';
import Notification from '../Notification';

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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
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
  }, [showNotification]);

  useEffect(() => {
    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen, fetchUserProfile]);

  const updateProfile = async () => {
    const userId = getUserIdFromToken();
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken || !profile) return;

    try {
      setIsSaving(true);
      const updateData = {
        userId: profile.userId,
        firebaseId: profile.firebaseId,
        avatar: editedProfile.avatar ?? profile.avatar,
        userName: profile.userName,
        email: editedProfile.email ?? profile.email,
        firstName: editedProfile.firstName ?? profile.firstName,
        lastName: editedProfile.lastName ?? profile.lastName,
        birthday: editedProfile.birthday ?? profile.birthday,
        address: editedProfile.address ?? profile.address,
        phoneNumber: editedProfile.phoneNumber ?? profile.phoneNumber,
        roleId: profile.roleId
      };

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

  if (!isOpen) return null;

  return (
    <div className="admin-modal">
      <div className="admin-modal-content profile-modal">
        {isLoading ? (
          <div className="admin-modal-body">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin cá nhân...</p>
          </div>
        ) : !profile ? (
          <div className="admin-modal-body">
            <h2>Không tìm thấy thông tin cá nhân</h2>
          </div>
        ) : (
          <>
            <div className="admin-modal-header">
              <h2>{isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin cá nhân'}</h2>
              <button className="modal-close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            
            <div className="admin-modal-body">
              {!isEditing ? (
                <div className="profile-view">
                  <div className="profile-header">
                    <div className="avatar-section">
                      <img
                        src={profile.avatar || '/public/logo.png'}
                        alt="Avatar"
                        className="profile-avatar"
                      />
                      <div className="profile-info">
                        <h3>{profile.firstName} {profile.lastName}</h3>
                        <p className="profile-email">{profile.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="profile-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Họ và tên</label>
                        <p>{profile.firstName} {profile.lastName}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{profile.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Số điện thoại</label>
                        <p>{profile.phoneNumber || 'Chưa cập nhật'}</p>
                      </div>
                      <div className="info-item">
                        <label>Ngày sinh</label>
                        <p>{profile.birthday ? new Date(profile.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
                      </div>
                      <div className="info-item full-width">
                        <label>Địa chỉ</label>
                        <p>{profile.address || 'Chưa cập nhật'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-edit">
                  <div className="edit-avatar">
                    <img
                      src={getDisplayValue('avatar') || '/public/logo.png'}
                      alt="Avatar"
                      className="edit-avatar-img"
                    />
                    <input
                      type="url"
                      placeholder="URL ảnh đại diện"
                      value={getDisplayValue('avatar')}
                      onChange={(e) => handleInputChange('avatar', e.target.value)}
                    />
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
              )}
            </div>
            
            <div className="admin-modal-footer">
              {isEditing ? (
                <>
                  <button className="admin-btn secondary" onClick={handleCancel} disabled={isSaving}>
                    Hủy
                  </button>
                  <button className="admin-btn primary" onClick={updateProfile} disabled={isSaving}>
                    {isSaving ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </>
              ) : (
                <button className="admin-btn primary" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa
                </button>
              )}
            </div>
          </>
        )}
        
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </div>
  );
};

export default ProfileModal;