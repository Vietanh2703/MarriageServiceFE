import React, { useState, useEffect } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import {API_CONFIG, apiRequest} from "../../utils/apiConfig.ts";

interface Feedback {
  feedbackId: string;
  email: string;
  point: number;
  content: string;
  createdAt: string;
  isDeleted: boolean;
}

const ITEMS_PER_PAGE = 5;

const Feedback: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [filtered, setFiltered] = useState<Feedback[]>([]);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await apiRequest(API_CONFIG.ENDPOINTS.FEEDBACK.GET_ALL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setFeedbackList(data.result || []);
        setFiltered(data.result || []);
      } catch (e) {
        setFeedbackList([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  useEffect(() => {
    let result = feedbackList;
    if (search) {
      result = result.filter(f =>
          f.email.toLowerCase().includes(search.toLowerCase()) ||
          f.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (rating !== 'all') {
      result = result.filter(f => f.point === parseInt(rating));
    }
    setFiltered(result);
    setPage(1);
  }, [search, rating, feedbackList]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const renderStars = (point: number) =>
      Array(5).fill(0).map((_, i) => (
          <FaStar key={i} className={i < point ? 'star-filled' : 'star-empty'} />
      ));

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
      <div>
        <div className="feedback-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
                type="text"
                placeholder="Search by email or content"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select value={rating} onChange={e => setRating(e.target.value)}>
            <option value="all">All Ratings</option>
            {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
        <div className="feedback-container">
          <div className="feedback-table-wrapper">
            <table className="feedback-table">
              <thead>
              <tr>
                <th>Email</th>
                <th>Point</th>
                <th>Content</th>
                <th>Created At</th>
              </tr>
              </thead>
              <tbody>
              {loading ? (
                  <tr><td colSpan={4} style={{textAlign:'center'}}>Loading...</td></tr>
              ) : currentItems.length ? (
                  currentItems.map(fb => (
                      <tr key={fb.feedbackId}>
                        <td>{fb.email}</td>
                        <td>{renderStars(fb.point)}</td>
                        <td className="content-cell">{fb.content}</td>
                        <td>{formatDate(fb.createdAt)}</td>
                      </tr>
                  ))
              ) : (
                  <tr><td colSpan={4} style={{textAlign:'center'}}>No feedback found</td></tr>
              )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
                {Array.from({length: totalPages}, (_, i) => i+1).map(num => (
                    <button
                        key={num}
                        className={page===num ? 'active' : ''}
                        onClick={() => setPage(num)}
                    >{num}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
              </div>
          )}
        </div>
        <style>{`
        .feedback-container {
          max-width: 1000px;
          margin: 48px auto 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px #0002;
          padding: 48px 32px;
        }
        .feedback-controls {
          display: flex;
          gap: 16px;
          margin: 0 auto 24px auto;
          max-width: 1000px;
          align-items: center;
          background: none;
          box-shadow: none;
          padding: 0;
        }
        .search-box {
          position: relative;
          flex: 1;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
        }
        .search-box input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
        }
        select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          font-size: 1rem;
        }
        .feedback-table-wrapper {
          overflow-x: auto;
        }
        .feedback-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
        }
        .feedback-table th, .feedback-table td {
          padding: 14px 12px;
          border-bottom: 1px solid #f0f0f0;
          text-align: left;
        }
        .feedback-table th {
          background: #f8f9fa;
          font-weight: 600;
        }
        .star-filled { color: #ffc107; }
        .star-empty { color: #e0e0e0; }
        .content-cell {
          max-width: 320px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pagination {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          margin-top: 24px;
        }
        .pagination button {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .pagination button.active, .pagination button:hover:not(:disabled) {
          background: #1976d2;
          color: #fff;
          border-color: #1976d2;
        }
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
      </div>
  );
};

export default Feedback;