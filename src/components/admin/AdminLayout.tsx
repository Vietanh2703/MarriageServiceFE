import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import './AdminLayout.css';

// Icons for sidebar
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaHandshake, 
  FaComments, 
  FaBars, 
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          setIsAdmin(user.role === 'admin');
        } catch (error) {
          console.error('Error parsing user info:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
    // Listen for user info updates
    window.addEventListener('userInfoUpdated', checkAdminStatus);
    
    return () => {
      window.removeEventListener('userInfoUpdated', checkAdminStatus);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === '/admin' ? 'active' : ''}>
              <Link to="/admin">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={location.pathname === '/admin/users' ? 'active' : ''}>
              <Link to="/admin/users">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
            <li className={location.pathname === '/admin/partner-requests' ? 'active' : ''}>
              <Link to="/admin/partner-requests">
                <FaHandshake />
                <span>Partner Requests</span>
              </Link>
            </li>
            <li className={location.pathname === '/admin/feedback' ? 'active' : ''}>
              <Link to="/admin/feedback">
                <FaComments />
                <span>Feedback</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/home" className="logout-button">
            <FaSignOutAlt />
            <span>Back to Site</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="admin-header">
          <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1>
            {location.pathname === '/admin' && 'Dashboard'}
            {location.pathname === '/admin/users' && 'User Management'}
            {location.pathname === '/admin/partner-requests' && 'Partner Requests'}
            {location.pathname === '/admin/feedback' && 'Feedback Management'}
          </h1>
        </div>
        <div className="admin-main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;