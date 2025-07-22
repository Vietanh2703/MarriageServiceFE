import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserCheck, FaUserTimes } from 'react-icons/fa';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  registeredDate: string;
  lastLogin: string;
}

// Mock user data
const mockUsers: User[] = [
  { 
    id: 1, 
    name: 'Nguyen Van A', 
    email: 'nguyenvana@example.com', 
    role: 'user', 
    status: 'active', 
    registeredDate: '2025-01-15',
    lastLogin: '2025-07-20'
  },
  { 
    id: 2, 
    name: 'Tran Thi B', 
    email: 'tranthib@example.com', 
    role: 'user', 
    status: 'active', 
    registeredDate: '2025-02-20',
    lastLogin: '2025-07-21'
  },
  { 
    id: 3, 
    name: 'Le Van C', 
    email: 'levanc@example.com', 
    role: 'user', 
    status: 'inactive', 
    registeredDate: '2025-03-10',
    lastLogin: '2025-06-15'
  },
  { 
    id: 4, 
    name: 'Pham Thi D', 
    email: 'phamthid@example.com', 
    role: 'partner', 
    status: 'active', 
    registeredDate: '2025-04-05',
    lastLogin: '2025-07-22'
  },
  { 
    id: 5, 
    name: 'Hoang Van E', 
    email: 'hoangvane@example.com', 
    role: 'admin', 
    status: 'active', 
    registeredDate: '2025-01-01',
    lastLogin: '2025-07-23'
  },
  { 
    id: 6, 
    name: 'Vo Thi F', 
    email: 'vothif@example.com', 
    role: 'user', 
    status: 'active', 
    registeredDate: '2025-05-12',
    lastLogin: '2025-07-19'
  },
  { 
    id: 7, 
    name: 'Dinh Van G', 
    email: 'dinhvang@example.com', 
    role: 'user', 
    status: 'inactive', 
    registeredDate: '2025-06-18',
    lastLogin: '2025-07-01'
  },
  { 
    id: 8, 
    name: 'Bui Thi H', 
    email: 'buithih@example.com', 
    role: 'partner', 
    status: 'active', 
    registeredDate: '2025-03-25',
    lastLogin: '2025-07-20'
  },
  { 
    id: 9, 
    name: 'Ly Van I', 
    email: 'lyvani@example.com', 
    role: 'user', 
    status: 'active', 
    registeredDate: '2025-04-30',
    lastLogin: '2025-07-18'
  },
  { 
    id: 10, 
    name: 'Truong Thi K', 
    email: 'truongthik@example.com', 
    role: 'user', 
    status: 'active', 
    registeredDate: '2025-05-22',
    lastLogin: '2025-07-15'
  }
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/admin/users');
        // const data = await response.json();
        // setUsers(data);
        // setFilteredUsers(data);
        
        // Using mock data for now
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Filter users based on search term and filters
  useEffect(() => {
    let result = users;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, roleFilter, statusFilter, users]);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };
  
  // Toggle user status (in a real app, this would call an API)
  const toggleUserStatus = (userId: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
  };
  
  return (
    <div className="admin-user-list">
      {/* Search and Filters */}
      <div className="admin-filters">
        <div className="admin-search">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="admin-filter">
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="partner">Partner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="admin-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* User Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">User Management</h2>
          <div className="user-count">
            <span>Total: {filteredUsers.length} users</span>
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Registered Date</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status === 'active' ? 'success' : 'danger'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.registeredDate}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-button view" 
                            onClick={() => handleViewUser(user)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-button edit" 
                            title="Edit User"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-button"
                            title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? <FaUserTimes className="danger" /> : <FaUserCheck className="success" />}
                          </button>
                          <button 
                            className="action-button delete" 
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredUsers.length > itemsPerPage && (
            <div className="admin-pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* User Details Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>User Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="user-details">
                <div className="user-detail-item">
                  <span className="detail-label">ID:</span>
                  <span className="detail-value">{selectedUser.id}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedUser.name}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedUser.email}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">{selectedUser.role}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{selectedUser.status}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Registered Date:</span>
                  <span className="detail-value">{selectedUser.registeredDate}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">{selectedUser.lastLogin}</span>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-button secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;