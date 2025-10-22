const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// GET /api/logs - Get all audit logs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const totalLogs = await Log.countDocuments();
    const totalPages = Math.ceil(totalLogs / limit);

    res.json({
      logs,
      pagination: {
        currentPage: page,
        totalPages,
        totalLogs,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// GET /api/logs/:taskId - Get logs for a specific task
router.get('/task/:taskId', async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find({ taskId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const totalLogs = await Log.countDocuments({ taskId });
    const totalPages = Math.ceil(totalLogs / limit);

    res.json({
      logs,
      pagination: {
        currentPage: page,
        totalPages,
        totalLogs,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching task logs:', error);
    res.status(500).json({ error: 'Failed to fetch task logs' });
  }
});

module.exports = router;
