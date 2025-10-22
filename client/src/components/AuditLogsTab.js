import React, { useState, useEffect } from 'react';
import { logsAPI } from '../services/api';

const AuditLogsTab = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  const fetchLogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await logsAPI.getLogs(page, 10);
      setLogs(response.data.logs);
      setCurrentPage(response.data.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
      setTotalLogs(response.data.pagination.totalLogs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch audit logs');
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  const getActionLabel = (action) => {
    switch (action) {
      case 'Create Task':
        return { className: 'action-create', text: action };
      case 'Update Task':
        return { className: 'action-update', text: action };
      case 'Delete Task':
        return { className: 'action-delete', text: action };
      default:
        return { className: 'action-update', text: action };
    }
  };

  const formatUpdatedContent = (updatedContent) => {
    if (!updatedContent) return '-';
    
    if (typeof updatedContent === 'object') {
      const parts = [];
      if (updatedContent.title) parts.push(`title: "${updatedContent.title}"`);
      if (updatedContent.description) parts.push(`description: "${updatedContent.description}"`);
      return parts.join(' ');
    }
    
    return updatedContent;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="loading">Loading audit logs...</div>;
  }

  return (
    <div className="audit-logs-tab">
      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Task ID</th>
              <th>Updated Content</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const actionInfo = getActionLabel(log.action);
                return (
                  <tr key={index}>
                    <td>
                      {new Date(log.timestamp).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }).replace(',', '')}
                    </td>
                    <td>
                      <span className={`action-label ${actionInfo.className}`}>
                        {actionInfo.text}
                      </span>
                    </td>
                    <td>{log.taskId}</td>
                    <td>{formatUpdatedContent(log.updatedContent)}</td>
                    <td>{log.notes || '-'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalLogs)} of {totalLogs} logs
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button className="pagination-button pagination-page">
              Page {currentPage}
            </button>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogsTab;
