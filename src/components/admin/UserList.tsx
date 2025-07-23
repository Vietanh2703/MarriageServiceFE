import React, { useEffect, useState } from 'react';
import { apiRequest, API_CONFIG } from '../../utils/apiConfig';
import { FaSync, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './UserList.css';

interface User {
  userId: string;
  firebaseId: string;
  avatar: string | null;
  userName: string;
  email: string;
  firstName: string;
  lastName: string | null;
  birthday: string;
  address: string | null;
  phoneNumber: string;
  roleId: string;
  role: string | null;
  isDeleted: boolean;
  lastUpdatedBy: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userRoles: any;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await apiRequest(API_CONFIG.ENDPOINTS.USER.GET_ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        let usersData: User[] = [];

        if (Array.isArray(data)) {
          usersData = data;
        } else if (data.result && Array.isArray(data.result)) {
          usersData = data.result;
        } else if (data.users && Array.isArray(data.users)) {
          usersData = data.users;
        } else if (data.data && Array.isArray(data.data)) {
          usersData = data.data;
        }

        // Sort users by creation date (newest first)
        usersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Filter out deleted users
        const activeUsers = usersData.filter(user => !user.isDeleted);

        setUsers(activeUsers);
      } else {
        console.error('Failed to fetch users:', response.status);
        setError('Failed to load users data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Network error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
        <div className="user-list-container">
          <div className="user-list-loading">
            <div className="user-list-loading-spinner"></div>
            <p>Loading users data...</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="user-list-container">
          <div className="user-list-error">
            <div className="user-list-error-icon">⚠️</div>
            <p>{error}</p>
            <button className="user-list-retry-button" onClick={fetchUsers}>
              <FaSync /> Retry
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="user-list-container">
        <div className="user-list-header">
          <h1>User Management</h1>
          <div className="user-list-controls">
            <button
                className="user-list-refresh-button"
                onClick={fetchUsers}
                disabled={isLoading}
                title="Refresh Data"
            >
              <FaSync /> Refresh
            </button>
          </div>
        </div>

        <div className="user-list-summary">
          <p>Total Users: <strong>{users.length}</strong></p>
        </div>

        <div className="user-list-table-container">
          <table className="user-list-table">
            <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Joined</th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                    <tr key={user.userId}>
                      <td className="user-info-cell">
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.avatar ? (
                                <img src={user.avatar} alt={`${user.firstName || ''} ${user.lastName || ''}`} />
                            ) : (
                                <div className="avatar-placeholder">
                                  {user.firstName?.charAt(0) || user.userName?.charAt(0) || '?'}
                                </div>
                            )}
                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              {`${user.firstName || ''} ${user.lastName || ''}`}
                              {!(user.firstName || user.lastName) && user.userName}
                            </div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="user-contact">
                          {user.phoneNumber || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="user-location">
                          {user.address || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="user-joined-date">
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan={4} className="no-data">
                    No users found
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users.length > itemsPerPage && (
            <div className="user-list-pagination">
              <button
                  className="pagination-button"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
              <button
                  className="pagination-button"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
        )}
      </div>
  );
};

export default UserList;