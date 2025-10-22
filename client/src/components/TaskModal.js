import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';

const TaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description
      });
    } else {
      setFormData({
        title: '',
        description: ''
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (task) {
        // Update existing task
        await tasksAPI.updateTask(task.id, formData);
      } else {
        // Create new task
        await tasksAPI.createTask(formData);
      }
      onSave();
    } catch (err) {
      setError(task ? 'Failed to update task' : 'Failed to create task');
      console.error('Error saving task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="e.g., Plan sprint backlog"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-input"
                placeholder="Add scope, owners, and due dates"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {error && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '10px' }}>
                {error}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              <span>💾</span>
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
