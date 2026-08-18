const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = { user: req.user.id };
    if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') }];
    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    res.json({ notes });
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, [body('title').notEmpty().withMessage('Title required')], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content } = req.body;
    const note = await Note.create({ user: req.user.id, title, content });
    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    res.json({ note });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.content !== undefined) updates.content = req.body.content;

    Object.assign(note, updates);
    await note.save();
    res.json({ note });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.content !== undefined) updates.content = req.body.content;

    Object.assign(note, updates);
    await note.save();
    res.json({ note });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    await note.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
