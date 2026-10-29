const express = require('express');
const fs      = require('fs');
const path    = require('path');
const guard   = require('../middleware/auth');
const router  = express.Router();

const FILE    = path.join(__dirname, '../../data/gallery.json');
const IMG_DIR = path.join(__dirname, '../../images/gallery/');

const read  = () => fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : [];
const write = d  => fs.writeFileSync(FILE, JSON.stringify(d, null, 2), 'utf8');

router.get('/', (req, res) => res.json(read()));

router.post('/', guard, (req, res) => {
  try {
    const gal = read();
    gal.push(req.body);
    write(gal);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', guard, (req, res) => {
  try {
    const gal  = read();
    const item = gal.find(g => g.id === req.params.id);
    write(gal.filter(g => g.id !== req.params.id));
    if (item) {
      [item.before, item.after].filter(Boolean).forEach(f => {
        try { fs.unlinkSync(path.join(IMG_DIR, f)); } catch {}
      });
    }
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
