const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: false
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to auto-increment ID
taskSchema.pre('save', async function(next) {
  if (this.isNew && !this.id) {
    try {
      const lastTask = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastTask ? lastTask.id + 1 : 1;
    } catch (error) {
      console.error('Error generating task ID:', error);
      this.id = 1; // fallback
    }
  }
  next();
});

// Update updatedAt field on save
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
