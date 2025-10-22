const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Log = require('../models/Log');

// GET /api/tasks - Get all tasks with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTasks = await Task.countDocuments();
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      tasks,
      pagination: {
        currentPage: page,
        totalPages,
        totalTasks,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id - Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const task = new Task({ title, description });
    await task.save();

    // Create audit log
    const log = new Log({
      action: 'Create Task',
      taskId: task.id,
      updatedContent: {
        title: task.title,
        description: task.description
      }
    });
    await log.save();

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Task ID already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const taskId = parseInt(req.params.id);

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const oldTask = await Task.findOne({ id: taskId });
    if (!oldTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { id: taskId },
      { title, description },
      { new: true, runValidators: true }
    );

    // Create audit log
    const log = new Log({
      action: 'Update Task',
      taskId: taskId,
      updatedContent: {
        title: title,
        description: description
      }
    });
    await log.save();

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await Task.findOne({ id: taskId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Task.findOneAndDelete({ id: taskId });

    // Create audit log
    const log = new Log({
      action: 'Delete Task',
      taskId: taskId,
      updatedContent: null
    });
    await log.save();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
