const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get tasks with optional filters
router.get('/', auth, async (req, res, next) => {
  try {
    const { status, priority, search, sort } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];

    let query = Task.find(filter);
    if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else if (sort === 'oldest') query = query.sort({ createdAt: 1 });
    else if (sort === 'dueDate') query = query.sort({ dueDate: 1 });

    const tasks = await query.exec();
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  auth,
  [body('title').notEmpty().withMessage('Title required')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { title, description, priority, dueDate } = req.body;
      const task = await Task.create({ user: req.user.id, title, description, priority, dueDate });
      res.status(201).json({ task });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    res.json({ task });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });

    const updates = ['title', 'description', 'status', 'priority', 'dueDate'].reduce((acc, key) => {
      if (req.body[key] !== undefined) acc[key] = req.body[key];
      return acc;
    }, {});

    Object.assign(task, updates);
    await task.save();
    res.json({ task });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });

    const updates = ['title', 'description', 'status', 'priority', 'dueDate', 'completed'].reduce((acc, key) => {
      if (req.body[key] !== undefined) acc[key] = req.body[key];
      return acc;
    }, {});

    Object.assign(task, updates);
    await task.save();
    res.json({ task });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    await task.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
