import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { API_CONFIG, apiRequest } from '../../utils/apiConfig';
import './Invoice.css';

interface Invoice {
  id: string;
  invoiceNumber: string;
  userEmail: string;
  amount: number;
  description?: string;
  status: 'COMPLETED' | string;
  createdAt: string;
}

const maxItem = 5;

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const sec = String(d.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} - ${hour}:${min}:${sec}`;
};

const InvoiceList: React.FC = () => {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiRequest(API_CONFIG.ENDPOINTS.INVOICE.GET_ALL);
        const data = await response.json();
        const invoices = Array.isArray(data.result)
            ? data.result
                .filter((inv: any) => inv.status === 'COMPLETED')
                .map((inv: any) => ({
                  id: inv.invoiceId,
                  invoiceNumber: inv.invoiceNumber,
                  userEmail: inv.email,
                  amount: inv.amount,
                  description: inv.description,
                  status: inv.status,
                  createdAt: inv.issueDate,
                }))
            : [];
        setInvoiceList(invoices);
      } catch {
        setInvoiceList([]);
      }
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = invoiceList.filter(
      inv =>
          inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvoices.length / maxItem);
  const pagedInvoices = filteredInvoices.slice((page - 1) * maxItem, page * maxItem);

  const formatCurrency = (amount: number) =>
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
      <div className="invoice-bg">
        <div className="invoice-list-page">
          <div className="invoice-list-header">
            <h2>Invoice Management</h2>
            <span className="invoice-total">Total: {filteredInvoices.length}</span>
          </div>
          <div className="invoice-list-filters">
            <div className="invoice-search">
              <FaSearch />
              <input
                  type="text"
                  placeholder="Search by email or invoice number"
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
              />
            </div>
          </div>
          <div className="invoice-list-table-container">
            <table className="invoice-list-table">
              <thead>
              <tr>
                <th>Invoice #</th>
                <th>Issue Date</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {pagedInvoices.length > 0 ? (
                  pagedInvoices.map(invoice => (
                      <tr key={invoice.id}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{formatDateTime(invoice.createdAt)}</td>
                        <td>{invoice.userEmail}</td>
                        <td>{formatCurrency(invoice.amount)}</td>
                        <td>{invoice.description || '-'}</td>
                        <td>
                          <span className="status-badge completed">COMPLETED</span>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={6} className="no-data">No invoices found</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
              <div className="invoice-pagination">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                  Prev
                </button>
                <span>
              Page {page} / {totalPages}
            </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default InvoiceList;