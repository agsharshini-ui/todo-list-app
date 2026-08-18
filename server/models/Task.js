const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);
