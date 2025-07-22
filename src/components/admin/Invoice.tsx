import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';

// Invoice interface
interface Invoice {
  id: number;
  invoiceNumber: string;
  userId: number;
  userName: string;
  userEmail: string;
  amount: number;
  serviceType: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  paidAt?: string;
  dueDate: string;
}

// Mock invoice data
const mockInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    userId: 101,
    userName: 'Nguyen Van A',
    userEmail: 'nguyenvana@example.com',
    amount: 5000000,
    serviceType: 'Wedding Planning',
    status: 'paid',
    createdAt: '2025-07-10',
    paidAt: '2025-07-15',
    dueDate: '2025-07-25'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    userId: 102,
    userName: 'Tran Thi B',
    userEmail: 'tranthib@example.com',
    amount: 3500000,
    serviceType: 'Photography',
    status: 'pending',
    createdAt: '2025-07-15',
    dueDate: '2025-07-30'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-003',
    userId: 103,
    userName: 'Le Van C',
    userEmail: 'levanc@example.com',
    amount: 2800000,
    serviceType: 'Catering',
    status: 'pending',
    createdAt: '2025-07-18',
    dueDate: '2025-08-02'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-004',
    userId: 104,
    userName: 'Pham Thi D',
    userEmail: 'phamthid@example.com',
    amount: 4200000,
    serviceType: 'Catering',
    status: 'paid',
    createdAt: '2025-07-05',
    paidAt: '2025-07-08',
    dueDate: '2025-07-20'
  },
  {
    id: 5,
    invoiceNumber: 'INV-2025-005',
    userId: 105,
    userName: 'Hoang Van E',
    userEmail: 'hoangvane@example.com',
    amount: 1800000,
    serviceType: 'Decoration',
    status: 'cancelled',
    createdAt: '2025-07-20',
    dueDate: '2025-08-05'
  },
  {
    id: 6,
    invoiceNumber: 'INV-2025-006',
    userId: 106,
    userName: 'Vo Thi F',
    userEmail: 'vothif@example.com',
    amount: 3200000,
    serviceType: 'Decoration',
    status: 'pending',
    createdAt: '2025-07-19',
    dueDate: '2025-08-03'
  },
  {
    id: 7,
    invoiceNumber: 'INV-2025-007',
    userId: 107,
    userName: 'Dinh Van G',
    userEmail: 'dinhvang@example.com',
    amount: 6500000,
    serviceType: 'Wedding Attire',
    status: 'paid',
    createdAt: '2025-07-12',
    paidAt: '2025-07-14',
    dueDate: '2025-07-27'
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

const Invoice: React.FC = () => {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchInvoices = async () => {
      try {
        // const response = await fetch('/api/admin/invoices');
        // const data = await response.json();
        // setInvoiceList(data);
        // setFilteredInvoices(data);
        
        // Using mock data for now
        setInvoiceList(mockInvoices);
        setFilteredInvoices(mockInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    
    fetchInvoices();
  }, []);
  
  // Filter invoices based on search term and filters
  useEffect(() => {
    let result = invoiceList;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(invoice => 
        invoice.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply service filter
    if (serviceFilter !== 'all') {
      result = result.filter(invoice => invoice.serviceType === serviceFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }
    
    setFilteredInvoices(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, serviceFilter, statusFilter, invoiceList]);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // View invoice details
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedInvoice(null);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  // Update invoice status (in a real app, this would call an API)
  const updateInvoiceStatus = (id: number, newStatus: 'paid' | 'cancelled') => {
    // In a real application, you would call an API to update the status
    // const updateStatusAPI = async () => {
    //   try {
    //     const response = await fetch(`/api/admin/invoices/${id}/status`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ status: newStatus }),
    //     });
    //     
    //     if (response.ok) {
    //       // Update local state after successful API call
    //       updateLocalState();
    //     }
    //   } catch (error) {
    //     console.error('Error updating invoice status:', error);
    //   }
    // };
    
    // For now, just update the local state
    const updatedInvoices = invoiceList.map(invoice => {
      if (invoice.id === id) {
        return {
          ...invoice,
          status: newStatus,
          paidAt: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return invoice;
    });
    
    setInvoiceList(updatedInvoices);
    closeModal();
  };
  
  return (
    <div className="admin-invoices">
      {/* Search and Filters */}
      <div className="admin-filters">
        <div className="admin-search">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or invoice number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Invoice Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Invoice Management</h2>
          <div className="invoice-count">
            <span>Total: {filteredInvoices.length} invoices</span>
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Created Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.userName}</td>
                      <td>{invoice.serviceType}</td>
                      <td>{formatCurrency(invoice.amount)}</td>
                      <td>{invoice.createdAt}</td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <span className={`status-badge ${
                          invoice.status === 'paid' ? 'success' : 
                          invoice.status === 'pending' ? 'warning' : 'danger'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-button view" 
                            onClick={() => handleViewInvoice(invoice)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-button info" 
                            title="Download Invoice"
                          >
                            <FaDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center' }}>No invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredInvoices.length > itemsPerPage && (
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
      
      {/* Invoice Details Modal */}
      {isViewModalOpen && selectedInvoice && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>Invoice Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="invoice-details">
                <div className="invoice-header">
                  <div className="invoice-number">
                    <h3>{selectedInvoice.invoiceNumber}</h3>
                    <span className={`status-badge ${
                      selectedInvoice.status === 'paid' ? 'success' : 
                      selectedInvoice.status === 'pending' ? 'warning' : 'danger'
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
                
                <div className="invoice-detail-section">
                  <div className="invoice-detail-column">
                    <div className="invoice-detail-item">
                      <span className="detail-label">Customer:</span>
                      <span className="detail-value">{selectedInvoice.userName}</span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedInvoice.userEmail}</span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Service:</span>
                      <span className="detail-value">{selectedInvoice.serviceType}</span>
                    </div>
                  </div>
                  
                  <div className="invoice-detail-column">
                    <div className="invoice-detail-item">
                      <span className="detail-label">Created Date:</span>
                      <span className="detail-value">{selectedInvoice.createdAt}</span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value">{selectedInvoice.dueDate}</span>
                    </div>
                    {selectedInvoice.paidAt && (
                      <div className="invoice-detail-item">
                        <span className="detail-label">Paid Date:</span>
                        <span className="detail-value">{selectedInvoice.paidAt}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="invoice-amount">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value amount">{formatCurrency(selectedInvoice.amount)}</span>
                </div>
                
                {selectedInvoice.status === 'pending' && (
                  <div className="invoice-actions">
                    <button 
                      className="admin-button success" 
                      onClick={() => updateInvoiceStatus(selectedInvoice.id, 'paid')}
                    >
                      <FaCheck /> Mark as Paid
                    </button>
                    <button 
                      className="admin-button danger" 
                      onClick={() => updateInvoiceStatus(selectedInvoice.id, 'cancelled')}
                    >
                      <FaTimes /> Cancel Invoice
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-button info">
                <FaDownload /> Download Invoice
              </button>
              <button className="admin-button secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
  .invoice-details {
    padding: 1rem 0;
  }
  .invoice-header {
    margin-bottom: 1.5rem;
  }
  .invoice-number {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .invoice-number h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .invoice-detail-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  .invoice-detail-column {
    flex: 1;
    min-width: 250px;
  }
  .invoice-detail-item {
    margin-bottom: 0.75rem;
  }
  .detail-label {
    font-weight: 600;
    color: var(--admin-secondary);
    display: block;
    margin-bottom: 0.25rem;
  }
  .detail-value {
    color: var(--admin-dark);
  }
  .invoice-amount {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    margin: 1.5rem 0;
  }
  .invoice-amount .amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--admin-primary);
  }
  .invoice-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .admin-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  .admin-button.success {
    background-color: var(--admin-success);
    color: white;
  }
  .admin-button.danger {
    background-color: var(--admin-danger);
    color: white;
  }
  .admin-button.info {
    background-color: var(--admin-info);
    color: white;
  }
  .admin-button.secondary {
    background-color: var(--admin-secondary);
    color: white;
  }
  .admin-button:hover {
    opacity: 0.9;
  }
`}</style>
    </div>
  );
};

export default Invoice;