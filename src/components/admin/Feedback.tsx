import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaReply, FaStar, FaCheck } from 'react-icons/fa';

// Feedback interface
interface Feedback {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  content: string;
  serviceType: string;
  status: 'pending' | 'responded';
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

// Mock feedback data
const mockFeedback: Feedback[] = [
  {
    id: 1,
    userId: 101,
    userName: 'Nguyen Van A',
    userEmail: 'nguyenvana@example.com',
    rating: 5,
    content: 'Dịch vụ rất tốt, tôi rất hài lòng với trải nghiệm của mình. Nhân viên thân thiện và chuyên nghiệp.',
    serviceType: 'Wedding Planning',
    status: 'responded',
    createdAt: '2025-07-10',
    response: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất vui khi bạn hài lòng!',
    respondedAt: '2025-07-11'
  },
  {
    id: 2,
    userId: 102,
    userName: 'Tran Thi B',
    userEmail: 'tranthib@example.com',
    rating: 4,
    content: 'Dịch vụ tốt nhưng giá hơi cao. Tuy nhiên, chất lượng xứng đáng với giá tiền.',
    serviceType: 'Photography',
    status: 'pending',
    createdAt: '2025-07-15'
  },
  {
    id: 3,
    userId: 103,
    userName: 'Le Van C',
    userEmail: 'levanc@example.com',
    rating: 3,
    content: 'Dịch vụ ở mức trung bình. Có một số vấn đề nhỏ nhưng được giải quyết kịp thời.',
    serviceType: 'Catering',
    status: 'pending',
    createdAt: '2025-07-18'
  },
  {
    id: 4,
    userId: 104,
    userName: 'Pham Thi D',
    userEmail: 'phamthid@example.com',
    rating: 5,
    content: 'Tuyệt vời! Đồ ăn ngon, trang trí đẹp, mọi thứ đều hoàn hảo.',
    serviceType: 'Catering',
    status: 'responded',
    createdAt: '2025-07-05',
    response: 'Cảm ơn bạn đã đánh giá cao dịch vụ của chúng tôi. Rất mong được phục vụ bạn trong tương lai!',
    respondedAt: '2025-07-06'
  },
  {
    id: 5,
    userId: 105,
    userName: 'Hoang Van E',
    userEmail: 'hoangvane@example.com',
    rating: 2,
    content: 'Tôi không hài lòng với dịch vụ. Nhân viên không chuyên nghiệp và thiếu trách nhiệm.',
    serviceType: 'Decoration',
    status: 'pending',
    createdAt: '2025-07-20'
  },
  {
    id: 6,
    userId: 106,
    userName: 'Vo Thi F',
    userEmail: 'vothif@example.com',
    rating: 4,
    content: 'Dịch vụ trang trí rất đẹp, đúng với yêu cầu của tôi. Chỉ có một vài chi tiết nhỏ cần cải thiện.',
    serviceType: 'Decoration',
    status: 'pending',
    createdAt: '2025-07-19'
  },
  {
    id: 7,
    userId: 107,
    userName: 'Dinh Van G',
    userEmail: 'dinhvang@example.com',
    rating: 5,
    content: 'Trang phục cưới đẹp tuyệt vời, vừa vặn hoàn hảo. Dịch vụ chăm sóc khách hàng xuất sắc.',
    serviceType: 'Wedding Attire',
    status: 'responded',
    createdAt: '2025-07-12',
    response: 'Cảm ơn bạn đã tin tưởng chúng tôi cho ngày trọng đại của bạn. Chúc bạn hạnh phúc!',
    respondedAt: '2025-07-13'
  }
];

// Service types for filter
const serviceTypes = [
  'Wedding Planning',
  'Photography',
  'Catering',
  'Decoration',
  'Wedding Attire',
  'Makeup',
  'Transportation',
  'Invitation Design'
];

const Feedback: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(mockFeedback);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>(mockFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchFeedback = async () => {
      try {
        // const response = await fetch('/api/admin/feedback');
        // const data = await response.json();
        // setFeedbackList(data);
        // setFilteredFeedback(data);
        
        // Using mock data for now
        setFeedbackList(mockFeedback);
        setFilteredFeedback(mockFeedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    
    fetchFeedback();
  }, []);
  
  // Filter feedback based on search term and filters
  useEffect(() => {
    let result = feedbackList;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(feedback => 
        feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      result = result.filter(feedback => feedback.rating === parseInt(ratingFilter));
    }
    
    // Apply service filter
    if (serviceFilter !== 'all') {
      result = result.filter(feedback => feedback.serviceType === serviceFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(feedback => feedback.status === statusFilter);
    }
    
    setFilteredFeedback(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, ratingFilter, serviceFilter, statusFilter, feedbackList]);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedback.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // View feedback details
  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsViewModalOpen(true);
    setResponseText(feedback.response || '');
  };
  
  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedFeedback(null);
    setResponseText('');
  };
  
  // Submit response (in a real app, this would call an API)
  const submitResponse = () => {
    if (!selectedFeedback || !responseText.trim()) return;
    
    // In a real application, you would call an API to submit the response
    // const submitResponseAPI = async () => {
    //   try {
    //     const response = await fetch(`/api/admin/feedback/${selectedFeedback.id}/respond`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ response: responseText }),
    //     });
    //     
    //     if (response.ok) {
    //       // Update local state after successful API call
    //       updateLocalState();
    //     }
    //   } catch (error) {
    //     console.error('Error submitting response:', error);
    //   }
    // };
    
    // For now, just update the local state
    const updatedFeedback = feedbackList.map(feedback => {
      if (feedback.id === selectedFeedback.id) {
        return {
          ...feedback,
          status: 'responded' as const,
          response: responseText,
          respondedAt: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
        };
      }
      return feedback;
    });
    
    setFeedbackList(updatedFeedback);
    closeModal();
  };
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };
  
  return (
    <div className="admin-feedback">
      {/* Search and Filters */}
      <div className="admin-filters">
        <div className="admin-search">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="admin-filter">
          <select 
            value={ratingFilter} 
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        
        <div className="admin-filter">
          <select 
            value={serviceFilter} 
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="all">All Services</option>
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="admin-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </div>
      
      {/* Feedback Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Feedback Management</h2>
          <div className="feedback-count">
            <span>Total: {filteredFeedback.length} feedback</span>
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Service</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(feedback => (
                    <tr key={feedback.id}>
                      <td>{feedback.userName}</td>
                      <td className="rating-cell">
                        <div className="star-rating">
                          {renderStars(feedback.rating)}
                        </div>
                      </td>
                      <td>{feedback.serviceType}</td>
                      <td className="content-cell">
                        {feedback.content.length > 50 
                          ? `${feedback.content.substring(0, 50)}...` 
                          : feedback.content}
                      </td>
                      <td>{feedback.createdAt}</td>
                      <td>
                        <span className={`status-badge ${feedback.status === 'responded' ? 'success' : 'warning'}`}>
                          {feedback.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-button view" 
                            onClick={() => handleViewFeedback(feedback)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {feedback.status === 'pending' && (
                            <button 
                              className="action-button success" 
                              onClick={() => handleViewFeedback(feedback)}
                              title="Respond to Feedback"
                            >
                              <FaReply />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No feedback found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredFeedback.length > itemsPerPage && (
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
      
      {/* Feedback Details Modal */}
      {isViewModalOpen && selectedFeedback && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>Feedback Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="feedback-details">
                <div className="feedback-detail-item">
                  <span className="detail-label">User:</span>
                  <span className="detail-value">{selectedFeedback.userName} ({selectedFeedback.userEmail})</span>
                </div>
                <div className="feedback-detail-item">
                  <span className="detail-label">Rating:</span>
                  <span className="detail-value">
                    <div className="star-rating">
                      {renderStars(selectedFeedback.rating)}
                    </div>
                  </span>
                </div>
                <div className="feedback-detail-item">
                  <span className="detail-label">Service:</span>
                  <span className="detail-value">{selectedFeedback.serviceType}</span>
                </div>
                <div className="feedback-detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{selectedFeedback.createdAt}</span>
                </div>
                <div className="feedback-detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${selectedFeedback.status === 'responded' ? 'success' : 'warning'}`}>
                    {selectedFeedback.status}
                  </span>
                </div>
                <div className="feedback-detail-item feedback-content">
                  <span className="detail-label">Content:</span>
                  <div className="detail-value content-box">
                    {selectedFeedback.content}
                  </div>
                </div>
                
                {selectedFeedback.status === 'responded' && selectedFeedback.response && (
                  <div className="feedback-detail-item feedback-response">
                    <span className="detail-label">Response:</span>
                    <div className="detail-value response-box">
                      {selectedFeedback.response}
                      <div className="response-date">
                        Responded on: {selectedFeedback.respondedAt}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedFeedback.status === 'pending' && (
                  <div className="response-section">
                    <h3><FaReply /> Respond to Feedback</h3>
                    <textarea
                      placeholder="Enter your response to this feedback..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              {selectedFeedback.status === 'pending' ? (
                <button 
                  className="admin-button success" 
                  onClick={submitResponse}
                  disabled={!responseText.trim()}
                >
                  <FaCheck /> Submit Response
                </button>
              ) : (
                <button className="admin-button secondary" onClick={closeModal}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
  .star-rating {
    display: flex;
    align-items: center;
  }
  .star-filled {
    color: #ffc107;
  }
  .star-empty {
    color: #e0e0e0;
  }
  .content-cell {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-box, .response-box {
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    white-space: pre-wrap;
  }
  .response-box {
    background-color: #f0f7ff;
    position: relative;
  }
  .response-date {
    font-size: 0.75rem;
    color: #6c757d;
    margin-top: 0.5rem;
    text-align: right;
  }
`}</style>
    </div>
  );
};

export default Feedback;