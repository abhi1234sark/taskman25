import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tasks API
export const tasksAPI = {
  // Get all tasks with pagination
  getTasks: (page = 1, limit = 10) => {
    return api.get(`/tasks?page=${page}&limit=${limit}`);
  },

  // Get a single task by ID
  getTask: (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Create a new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update a task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Delete a task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

// Logs API
export const logsAPI = {
  // Get all logs with pagination
  getLogs: (page = 1, limit = 10) => {
    return api.get(`/logs?page=${page}&limit=${limit}`);
  },

  // Get logs for a specific task
  getTaskLogs: (taskId, page = 1, limit = 10) => {
    return api.get(`/logs/task/${taskId}?page=${page}&limit=${limit}`);
  },
};

export default api;
