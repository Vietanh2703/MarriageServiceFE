import React from 'react';
import { Link } from 'react-router-dom';
import './AuthPromptModal.css';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <div className="modal-body">
          <div className="modal-icon">✨</div>
          <h2>Trải Nghiệm Ngay!</h2>
          <p>Hãy đăng ký tài khoản để có những trải nghiệm tốt nhất với dịch vụ của chúng tôi.</p>
          <Link to="/register" className="modal-button register">
            Đăng Ký Tài Khoản
          </Link>
          <div className="modal-divider">
            <span>hoặc</span>
          </div>
          <p className="login-prompt">Bạn đã là thành viên của chúng tôi?</p>
          <Link to="/login" className="modal-button login">
            Đăng Nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
