import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaCheck, FaTimes, FaFilter, FaSpinner, FaSync, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { apiRequest, API_CONFIG } from '../../utils/apiConfig';
import './PartnerRequests.css';

// BusinessRequest interface
interface BusinessRequest {
  businessRequestId: string;
  businessName: string;
  businessType: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  website?: string;
  taxId?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactPosition?: string;
  serviceCategory?: string;
  serviceDescription?: string;
  serviceArea?: string;
  plan?: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  status: string;
  description: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  feedback?: string;
}

// Interface for detailed request
interface BusinessRequestDetail extends BusinessRequest {
  // Any additional fields that might be in the detail view
}

const PartnerRequests: React.FC = () => {
  const [requests, setRequests] = useState<BusinessRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<BusinessRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState<BusinessRequestDetail | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Fetch all business requests
  const fetchBusinessRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await apiRequest(API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.GET_ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        let businessRequests: BusinessRequest[] = [];

        if (Array.isArray(data)) {
          businessRequests = data;
        } else if (data.result && Array.isArray(data.result)) {
          businessRequests = data.result;
        } else if (data.businessRequests && Array.isArray(data.businessRequests)) {
          businessRequests = data.businessRequests;
        } else if (data.data && Array.isArray(data.data)) {
          businessRequests = data.data;
        }

        // Sort by creation date (newest first)
        businessRequests.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRequests(businessRequests);
        setFilteredRequests(businessRequests);

        // Extract unique business types for filter
        const types = [...new Set(businessRequests.map(request => request.businessType))];
        setBusinessTypes(types);
      } else {
        console.error('Failed to fetch business requests:', response.status);
        setError('Failed to load business requests. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching business requests:', error);
      setError('Network error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch business request details by ID
  const fetchBusinessRequestDetail = async (requestId: string) => {
    setIsDetailLoading(true);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.GET_BY_ID}/${requestId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        let detailData: BusinessRequestDetail;

        if (data.result) {
          detailData = data.result;
        } else if (data.businessRequest) {
          detailData = data.businessRequest;
        } else if (data.data) {
          detailData = data.data;
        } else {
          detailData = data;
        }

        setSelectedRequest(detailData);
      } else {
        console.error('Failed to fetch business request details:', response.status);
        alert('Failed to load request details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching business request details:', error);
      alert('Network error occurred while fetching details.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Update business request status
  const updateRequestStatus = async (requestId: string, newStatus: 'ACCEPTED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.CHANGE_STATUS}/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newStatus),
      });

      if (response.ok) {
        // Update local state after successful API call
        const updatedRequests = requests.map(request => {
          if (request.businessRequestId === requestId) {
            return {
              ...request,
              status: newStatus === 'ACCEPTED' ? 'Accepted' : 'Rejected'
            };
          }
          return request;
        });

        setRequests(updatedRequests);
        setFilteredRequests(
            filteredRequests.map(request => {
              if (request.businessRequestId === requestId) {
                return {
                  ...request,
                  status: newStatus === 'ACCEPTED' ? 'Accepted' : 'REJECTED'
                };
              }
              return request;
            })
        );

        closeModal();
        alert(`Request has been ${newStatus === 'ACCEPTED' ? 'Accepted' : 'REJECTED'}.`);
      } else {
        alert('Failed to update request status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating business request status:', error);
      alert('Network error occurred while updating status.');
    }
  };

  // Initialize data
  useEffect(() => {
    fetchBusinessRequests();
  }, []);

  // Filter business requests based on search term and filters
  useEffect(() => {
    let result = requests;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(request =>
          request.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request =>
          request.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply business type filter
    if (businessTypeFilter !== 'all') {
      result = result.filter(request => request.businessType === businessTypeFilter);
    }

    setFilteredRequests(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, businessTypeFilter, requests]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // View partner request details
  const handleViewRequest = (request: BusinessRequest) => {
    fetchBusinessRequestDetail(request.businessRequestId);
    setIsViewModalOpen(true);
    setFeedbackText('');
  };

  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedRequest(null);
    setFeedbackText('');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  if (isLoading) {
    return (
        <div className="partner-requests-container">
          <div className="partner-requests-loading">
            <div className="partner-requests-loading-spinner"></div>
            <p>Loading business requests...</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="partner-requests-container">
          <div className="partner-requests-error">
            <div className="partner-requests-error-icon">⚠️</div>
            <p>{error}</p>
            <button className="partner-requests-retry-button" onClick={fetchBusinessRequests}>
              <FaSync/> Retry
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="partner-requests-container">
        <div className="partner-requests-header">
          <h1>Partner Requests</h1>
          <div className="partner-requests-controls">
            <div className="partner-requests-search">
              <FaSearch className="search-icon" />
              <input
                  type="text"
                  placeholder="Search by business name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
                className="partner-requests-filter-toggle"
                onClick={toggleFilters}
                title="Toggle Filters"
            >
              <FaFilter /> Filters {isFiltersVisible ? '▲' : '▼'}
            </button>

            <button
                className="partner-requests-refresh-button"
                onClick={fetchBusinessRequests}
                disabled={isLoading}
                title="Refresh Data"
            >
              <FaSync /> Refresh
            </button>
          </div>
        </div>

        {isFiltersVisible && (
            <div className="partner-requests-filters">
              <div className="filter-item">
                <label>Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Business Type:</label>
                <select
                    value={businessTypeFilter}
                    onChange={(e) => setBusinessTypeFilter(e.target.value)}
                >
                  <option value="all">All Business Types</option>
                  {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
        )}

        <div className="partner-requests-summary">
          <p>Total Requests: <strong>{filteredRequests.length}</strong></p>
        </div>

        <div className="partner-requests-table-container">
          <table className="partner-requests-table">
            <thead>
            <tr>
              <th>Business Name</th>
              <th>Business Type</th>
              <th>Contact Person</th>
              <th>Status</th>
              <th>Submitted Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentItems.length > 0 ? (
                currentItems.map(request => (
                    <tr key={request.businessRequestId}>
                      <td className="business-name-cell">{request.businessName}</td>
                      <td>{request.businessType}</td>
                      <td>{request.contactName || request.ownerName}</td>
                      <td>
                    <span className={`status-badge ${
                        request.status.toLowerCase() === 'accepted' ? 'status-accepted' :
                            request.status.toLowerCase() === 'rejected' ? 'status-rejected' :
                                'status-pending'
                    }`}>
                      {request.status}
                    </span>
                      </td>
                      <td>{formatDate(request.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                              className="action-button view"
                              onClick={() => handleViewRequest(request)}
                              title="View Details"
                          >
                            <FaEye />
                          </button>
                          {request.status.toLowerCase() === 'pending' && (
                              <>
                                <button
                                    className="action-button approve"
                                    title="Approve Request"
                                    onClick={() => updateRequestStatus(request.businessRequestId, 'ACCEPTED')}
                                >
                                  <FaCheck />
                                </button>
                                <button
                                    className="action-button reject"
                                    title="Reject Request"
                                    onClick={() => updateRequestStatus(request.businessRequestId, 'REJECTED')}
                                >
                                  <FaTimes />
                                </button>
                              </>
                          )}
                        </div>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan={6} className="no-data">
                    No business requests found
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredRequests.length > itemsPerPage && (
            <div className="partner-requests-pagination">
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

        {/* Business Request Details Modal */}
        {isViewModalOpen && (
            <div className="partner-requests-modal">
              <div className="partner-requests-modal-content">
                <div className="partner-requests-modal-header">
                  <h2>Business Request Details</h2>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>

                <div className="partner-requests-modal-body">
                  {isDetailLoading ? (
                      <div className="detail-loading">
                        <FaSpinner className="spinner-icon" />
                        <p>Loading details...</p>
                      </div>
                  ) : selectedRequest ? (
                      <div className="partner-detail-grid">
                        {/* Business Information */}
                        <div className="detail-section">
                          <h3>Business Information</h3>
                          <div className="detail-item">
                            <span className="detail-label">Business Name:</span>
                            <span className="detail-value">{selectedRequest.businessName}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Business Type:</span>
                            <span className="detail-value">{selectedRequest.businessType}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Business Address:</span>
                            <span className="detail-value">
                        {selectedRequest.businessAddress || selectedRequest.address || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Business Phone:</span>
                            <span className="detail-value">
                        {selectedRequest.businessPhone || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Business Email:</span>
                            <span className="detail-value">
                        {selectedRequest.businessEmail || selectedRequest.email || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Website:</span>
                            <span className="detail-value">
                        {selectedRequest.website ? (
                            <a href={selectedRequest.website} target="_blank" rel="noopener noreferrer">
                              {selectedRequest.website}
                            </a>
                        ) : 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Tax ID:</span>
                            <span className="detail-value">
                        {selectedRequest.taxId || 'Not provided'}
                      </span>
                          </div>
                        </div>

                        {/* Contact Person Information */}
                        <div className="detail-section">
                          <h3>Contact Person Information</h3>
                          <div className="detail-item">
                            <span className="detail-label">Contact Name:</span>
                            <span className="detail-value">
                        {selectedRequest.contactName || selectedRequest.ownerName || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Contact Position:</span>
                            <span className="detail-value">
                        {selectedRequest.contactPosition || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Contact Phone:</span>
                            <span className="detail-value">
                        {selectedRequest.contactPhone || selectedRequest.phoneNumber || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Contact Email:</span>
                            <span className="detail-value">
                        {selectedRequest.contactEmail || selectedRequest.email || 'Not provided'}
                      </span>
                          </div>
                        </div>

                        {/* Service Information */}
                        <div className="detail-section">
                          <h3>Service Information</h3>
                          <div className="detail-item">
                            <span className="detail-label">Service Category:</span>
                            <span className="detail-value">
                        {selectedRequest.serviceCategory || selectedRequest.businessType || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Service Area:</span>
                            <span className="detail-value">
                        {selectedRequest.serviceArea || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Plan:</span>
                            <span className="detail-value">
                        {selectedRequest.plan || 'Not provided'}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Service Description:</span>
                            <div className="detail-value description">
                              {selectedRequest.serviceDescription || selectedRequest.description || 'No description provided.'}
                            </div>
                          </div>
                        </div>

                        {/* Status Information */}
                        <div className="detail-section wide">
                          <h3>Status Information</h3>
                          <div className="detail-item">
                            <span className="detail-label">Status:</span>
                            <span className={`status-badge ${
                                selectedRequest.status.toLowerCase() === 'accepted' ? 'status-accepted' :
                                    selectedRequest.status.toLowerCase() === 'rejected' ? 'status-rejected' :
                                        'status-pending'
                            }`}>
                        {selectedRequest.status}
                      </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Submitted Date:</span>
                            <span className="detail-value">{formatDate(selectedRequest.createdAt)}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Last Updated:</span>
                            <span className="detail-value">{formatDate(selectedRequest.updatedAt)}</span>
                          </div>
                          {selectedRequest.feedback && (
                              <div className="detail-item">
                                <span className="detail-label">Feedback:</span>
                                <div className="detail-value feedback">
                                  {selectedRequest.feedback}
                                </div>
                              </div>
                          )}
                        </div>

                        {selectedRequest.status.toLowerCase() === 'pending' && (
                            <div className="detail-section wide">
                              <h3>Provide Feedback</h3>
                              <textarea
                                  placeholder="Enter feedback or notes about this request..."
                                  value={feedbackText}
                                  onChange={(e) => setFeedbackText(e.target.value)}
                                  rows={4}
                                  className="feedback-textarea"
                              />
                            </div>
                        )}
                      </div>
                  ) : (
                      <p>No details available.</p>
                  )}
                </div>

                <div className="partner-requests-modal-footer">
                  {selectedRequest && selectedRequest.status.toLowerCase() === 'pending' ? (
                      <>
                        <button
                            className="modal-button approve"
                            onClick={() => updateRequestStatus(selectedRequest.businessRequestId, 'ACCEPTED')}
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                            className="modal-button reject"
                            onClick={() => updateRequestStatus(selectedRequest.businessRequestId, 'REJECTED')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                  ) : (
                      <button className="modal-button close" onClick={closeModal}>Close</button>
                  )}
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default PartnerRequests;