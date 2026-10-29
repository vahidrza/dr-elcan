const express = require('express');
const Patient = require('../models/Patient');
const guard   = require('../middleware/auth');
const router  = express.Router();

router.use(guard);

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { $or: [{ name: { $regex: q, $options: 'i' } }, { phone: { $regex: q, $options: 'i' } }] } : {};
    const patients = await Patient.find(filter)
      .select('name phone doctor createdAt visits')
      .sort({ createdAt: -1 });
    res.json(patients);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Tapılmadı.' });
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const p = await Patient.create(req.body);
    res.status(201).json(p);
  } catch (e) {
    res.status(e.name === 'ValidationError' ? 400 : 500).json({ error: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { visits, ...update } = req.body;
    const p = await Patient.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ error: 'Tapılmadı.' });
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/:id/visits', async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Tapılmadı.' });
    p.visits.unshift(req.body);
    await p.save();
    res.status(201).json(p.visits[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id/visits/:vid', async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Tapılmadı.' });
    p.visits = p.visits.filter(v => v._id.toString() !== req.params.vid);
    await p.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
