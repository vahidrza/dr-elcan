const express     = require('express');
const Appointment = require('../models/Appointment');
const guard       = require('../middleware/auth');
const router      = express.Router();

// Public — saytdan gələn müraciət
router.post('/', async (req, res) => {
  try {
    const { name, phone, doctor, service, preferredDate, note } = req.body;
    if (!name?.trim() || !phone?.trim()) {
      return res.status(400).json({ error: 'Ad və telefon tələb olunur.' });
    }
    const doc = await Appointment.create({
      name: name.trim(), phone: phone.trim(),
      doctor, service,
      preferredDate: preferredDate || undefined,
      note: note?.trim() || ''
    });
    res.status(201).json({ success: true, id: doc._id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin — siyahı
router.get('/', guard, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const list = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin — status dəyiş
router.patch('/:id', guard, async (req, res) => {
  try {
    const doc = await Appointment.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Tapılmadı.' });
    res.json(doc);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin — sil
router.delete('/:id', guard, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
