import React, { useEffect, useState } from 'react';
import { FaSearch, FaSyncAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_CONFIG, apiRequest } from '../../utils/apiConfig';
import './MisaProRequests.css';

interface MisaProRequest {
    id: number;
    email: string;
    amount: number;
    description: string;
    status: string;
    createdAt: string;
}

const MAX_ITEM = 5;

const MisaProRequests: React.FC = () => {
    const [requests, setRequests] = useState<MisaProRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = requests.filter(
        r =>
            r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / MAX_ITEM);
    const pagedRequests = filtered.slice((currentPage - 1) * MAX_ITEM, currentPage * MAX_ITEM);

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await apiRequest(API_CONFIG.ENDPOINTS.MISA_PRO.GET_ALL);
            const data = await res.json();
            setRequests(Array.isArray(data.result) ? data.result : []);
        } catch {
            setRequests([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (id: number, status: 'ACCEPTED' | 'REJECTED') => {
        setLoading(true);
        try {
            await apiRequest(`${API_CONFIG.ENDPOINTS.MISA_PRO.UPDATE_STATUS}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(status),
            });
            fetchRequests();
        } catch {
            setLoading(false);
        }
    };


    return (
        <div className="misa-pro-requests-page">
            <div className="misa-pro-requests-header">
                <h2>MisaPro Requests</h2>
                <div>
                    <button className="misa-pro-refresh-btn" onClick={fetchRequests} disabled={loading}>
                        <FaSyncAlt /> Refresh
                    </button>
                    <span className="misa-pro-total">Total: {filtered.length}</span>
                </div>
            </div>
            <div className="misa-pro-requests-filters">
                <div className="misa-pro-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by email or description"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="misa-pro-requests-table-container">
                <table className="misa-pro-requests-table">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="no-data">Loading...</td>
                        </tr>
                    ) : pagedRequests.length > 0 ? (
                        pagedRequests.map(r => (
                            <tr key={r.id}>
                                <td>{r.email}</td>
                                <td>{r.amount}</td>
                                <td>{r.description}</td>
                                <td>
                                    <span className={`status-badge ${r.status.toLowerCase()}`}>{r.status}</span>
                                </td>
                                <td>{formatDate(r.createdAt)}</td>
                                <td>
                                    {r.status === 'PENDING' && (
                                        <>
                                            <button
                                                className="action-btn accept"
                                                title="Accept"
                                                onClick={() => handleStatusUpdate(r.id, 'ACCEPTED')}
                                            >
                                                <FaCheckCircle />
                                            </button>
                                            <button
                                                className="action-btn reject"
                                                title="Reject"
                                                onClick={() => handleStatusUpdate(r.id, 'REJECTED')}
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="no-data">No requests found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="misa-pro-pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MisaProRequests;