const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['Create Task', 'Update Task', 'Delete Task']
  },
  taskId: {
    type: Number,
    required: true
  },
  updatedContent: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  notes: {
    type: String,
    default: '-',
    maxlength: 500
  }
}, {
  timestamps: false
});

// Index for better query performance
logSchema.index({ timestamp: -1 });
logSchema.index({ taskId: 1 });

module.exports = mongoose.model('Log', logSchema);
