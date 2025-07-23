import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';
import ProfileModal from './ProfileModal';

// Icons for sidebar
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaHandshake, 
  FaComments, 
  FaBars, 
  FaTimes,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaUserCircle,
  FaUser
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [optionsBoxOpen, setOptionsBoxOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const location = useLocation();
  const optionsBoxRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleOptionsBox = () => {
    setOptionsBoxOpen(!optionsBoxOpen);
  };
  
  const openProfileModal = () => {
    setOptionsBoxOpen(false); // Close dropdown menu
    setProfileModalOpen(true);
  };
  
  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };
  
  // Close options box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsBoxRef.current && 
        avatarRef.current && 
        !optionsBoxRef.current.contains(event.target as Node) && 
        !avatarRef.current.contains(event.target as Node)
      ) {
        setOptionsBoxOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`admin-layout${sidebarOpen ? ' sidebar-open' : ' sidebar-closed'}`}>
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
            <li className={location.pathname === '/admin/invoices' ? 'active' : ''}>
              <Link to="/admin/invoices">
                <FaFileInvoiceDollar />
                <span>Invoices</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
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
            {location.pathname === '/admin/invoices' && 'Invoice Management'}
          </h1>
          <div className="admin-avatar-dropdown navbar-avatar">
            <div className="avatar-container" onClick={toggleOptionsBox} ref={avatarRef}>
              <FaUserCircle className="admin-avatar" />
              <span>Admin</span>
            </div>
            {optionsBoxOpen && (
              <div className="dropdown-menu" ref={optionsBoxRef}>
                <div className="dropdown-item" onClick={openProfileModal}>
                  <FaUser />
                  <span>View Profile</span>
                </div>
                <Link to="/" className="dropdown-item">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="admin-main">
          {children}
        </div>
      </div>
      
      {/* Profile Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={closeProfileModal} />
    </div>
  );
};

export default AdminLayout;