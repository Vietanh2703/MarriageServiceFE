import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaCheck, FaTimes, FaComments } from 'react-icons/fa';
// These imports will be used when connecting to real API endpoints
// import { apiRequest, API_CONFIG } from '../../utils/apiConfig';

// Partner Request interface
interface PartnerRequest {
  id: number;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  description?: string;
}

// Mock partner request data
const mockPartnerRequests: PartnerRequest[] = [
  {
    id: 1,
    businessName: 'Elegant Wedding Studio',
    ownerName: 'Nguyen Van A',
    email: 'elegant@example.com',
    phone: '0901234567',
    businessType: 'Photography',
    status: 'pending',
    submittedDate: '2025-07-15',
    description: 'Professional wedding photography studio with 10 years of experience.'
  },
  {
    id: 2,
    businessName: 'Luxury Catering Service',
    ownerName: 'Tran Thi B',
    email: 'luxury@example.com',
    phone: '0912345678',
    businessType: 'Catering',
    status: 'approved',
    submittedDate: '2025-07-10',
    description: 'High-end catering service specializing in Vietnamese and international cuisine.'
  },
  {
    id: 3,
    businessName: 'Dream Wedding Planner',
    ownerName: 'Le Van C',
    email: 'dream@example.com',
    phone: '0923456789',
    businessType: 'Wedding Planning',
    status: 'rejected',
    submittedDate: '2025-07-05',
    description: 'Full-service wedding planning and coordination.'
  },
  {
    id: 4,
    businessName: 'Floral Paradise',
    ownerName: 'Pham Thi D',
    email: 'floral@example.com',
    phone: '0934567890',
    businessType: 'Decoration',
    status: 'pending',
    submittedDate: '2025-07-18',
    description: 'Specializing in floral arrangements and venue decoration.'
  },
  {
    id: 5,
    businessName: 'Royal Wedding Cars',
    ownerName: 'Hoang Van E',
    email: 'royal@example.com',
    phone: '0945678901',
    businessType: 'Transportation',
    status: 'pending',
    submittedDate: '2025-07-20',
    description: 'Luxury car rental service for weddings and special events.'
  },
  {
    id: 6,
    businessName: 'Bridal Beauty Salon',
    ownerName: 'Vo Thi F',
    email: 'bridal@example.com',
    phone: '0956789012',
    businessType: 'Makeup',
    status: 'approved',
    submittedDate: '2025-07-08',
    description: 'Professional makeup and hair styling for brides and wedding parties.'
  },
  {
    id: 7,
    businessName: 'Wedding Attire Boutique',
    ownerName: 'Dinh Van G',
    email: 'attire@example.com',
    phone: '0967890123',
    businessType: 'Wedding Attire',
    status: 'pending',
    submittedDate: '2025-07-17',
    description: 'Designer wedding dresses and suits for the perfect wedding day.'
  }
];

const PartnerRequests: React.FC = () => {
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>(mockPartnerRequests);
  const [filteredRequests, setFilteredRequests] = useState<PartnerRequest[]>(mockPartnerRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchPartnerRequests = async () => {
      try {
        // Using the existing BUSINESS_REGISTER endpoint
        // const response = await apiRequest(API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.GET_ALL, {
        //   method: 'GET',
        // });
        // const data = await response.json();
        // setPartnerRequests(data);
        // setFilteredRequests(data);
        
        // Using mock data for now
        setPartnerRequests(mockPartnerRequests);
        setFilteredRequests(mockPartnerRequests);
      } catch (error) {
        console.error('Error fetching partner requests:', error);
      }
    };
    
    fetchPartnerRequests();
  }, []);
  
  // Filter partner requests based on search term and filters
  useEffect(() => {
    let result = partnerRequests;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(request => 
        request.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // Apply business type filter
    if (businessTypeFilter !== 'all') {
      result = result.filter(request => request.businessType === businessTypeFilter);
    }
    
    setFilteredRequests(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, businessTypeFilter, partnerRequests]);
  
  // Get unique business types for filter dropdown
  const businessTypes = [...new Set(partnerRequests.map(request => request.businessType))];
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // View partner request details
  const handleViewRequest = (request: PartnerRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
    setFeedbackText('');
  };
  
  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedRequest(null);
    setFeedbackText('');
  };
  
  // Update partner request status (in a real app, this would call an API)
  const updateRequestStatus = (requestId: number, newStatus: 'approved' | 'rejected') => {
    // In a real application, you would call an API to update the status
    // const updateRequest = async () => {
    //   try {
    //     const response = await apiRequest(`${API_CONFIG.ENDPOINTS.BUSINESS_REGISTER.GET_BY_ID}/${requestId}`, {
    //       method: 'PATCH',
    //       body: JSON.stringify({ 
    //         status: newStatus,
    //         feedback: feedbackText 
    //       }),
    //     });
    //     
    //     if (response.ok) {
    //       // Update local state after successful API call
    //       updateLocalState();
    //     }
    //   } catch (error) {
    //     console.error('Error updating partner request:', error);
    //   }
    // };
    
    // For now, just update the local state
    const updatedRequests = partnerRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: newStatus
        };
      }
      return request;
    });
    
    setPartnerRequests(updatedRequests);
    closeModal();
  };
  
  return (
    <div className="admin-partner-requests">
      {/* Search and Filters */}
      <div className="admin-filters">
        <div className="admin-search">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by business name, owner, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="admin-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="admin-filter">
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
      
      {/* Partner Requests Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Partner Requests</h2>
          <div className="request-count">
            <span>Total: {filteredRequests.length} requests</span>
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>Owner</th>
                  <th>Business Type</th>
                  <th>Status</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(request => (
                    <tr key={request.id}>
                      <td>{request.businessName}</td>
                      <td>{request.ownerName}</td>
                      <td>{request.businessType}</td>
                      <td>
                        <span className={`status-badge ${
                          request.status === 'approved' ? 'success' : 
                          request.status === 'rejected' ? 'danger' : 
                          'warning'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.submittedDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-button view" 
                            onClick={() => handleViewRequest(request)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button 
                                className="action-button success" 
                                title="Approve Request"
                                onClick={() => handleViewRequest(request)}
                              >
                                <FaCheck />
                              </button>
                              <button 
                                className="action-button danger" 
                                title="Reject Request"
                                onClick={() => handleViewRequest(request)}
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
                    <td colSpan={6} style={{ textAlign: 'center' }}>No partner requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredRequests.length > itemsPerPage && (
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
      
      {/* Partner Request Details Modal */}
      {isViewModalOpen && selectedRequest && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>Partner Request Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="partner-details">
                <div className="partner-detail-item">
                  <span className="detail-label">Business Name:</span>
                  <span className="detail-value">{selectedRequest.businessName}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Owner Name:</span>
                  <span className="detail-value">{selectedRequest.ownerName}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedRequest.email}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedRequest.phone}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Business Type:</span>
                  <span className="detail-value">{selectedRequest.businessType}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${
                    selectedRequest.status === 'approved' ? 'success' : 
                    selectedRequest.status === 'rejected' ? 'danger' : 
                    'warning'
                  }`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Submitted Date:</span>
                  <span className="detail-value">{selectedRequest.submittedDate}</span>
                </div>
                <div className="partner-detail-item">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{selectedRequest.description || 'No description provided.'}</span>
                </div>
                
                {selectedRequest.status === 'pending' && (
                  <div className="feedback-section">
                    <h3><FaComments /> Provide Feedback</h3>
                    <textarea
                      placeholder="Enter feedback or notes about this request..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              {selectedRequest.status === 'pending' ? (
                <>
                  <button 
                    className="admin-button success" 
                    onClick={() => updateRequestStatus(selectedRequest.id, 'approved')}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button 
                    className="admin-button danger" 
                    onClick={() => updateRequestStatus(selectedRequest.id, 'rejected')}
                  >
                    <FaTimes /> Reject
                  </button>
                </>
              ) : (
                <button className="admin-button secondary" onClick={closeModal}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerRequests;