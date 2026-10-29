const express = require('express');
const jwt     = require('jsonwebtoken');
const Admin   = require('../models/Admin');
const guard   = require('../middleware/auth');
const router  = express.Router();

router.get('/status', async (req, res) => {
  res.json({ setup: await Admin.isSetup() });
});

router.post('/setup', async (req, res) => {
  try {
    if (await Admin.isSetup()) return res.status(400).json({ error: 'Artıq qurulmuşdur.' });
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ error: 'Şifrə ən azı 6 simvol olmalıdır.' });
    await Admin.setPassword(password);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    if (!(await Admin.verify(req.body.password || ''))) return res.status(401).json({ error: 'Şifrə yanlışdır.' });
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/change-password', guard, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ error: 'Şifrə ən azı 6 simvol olmalıdır.' });
    await Admin.setPassword(password);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
