const express = require('express');
const multer  = require('multer');
const path    = require('path');
const guard   = require('../middleware/auth');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../images/gallery/')),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `gal_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file.originalname).toLowerCase());
    cb(null, ok);
  }
});

router.post('/', guard, upload.fields([{ name: 'before', maxCount: 1 }, { name: 'after', maxCount: 1 }]), (req, res) => {
  const result = {};
  if (req.files?.before) result.before = req.files.before[0].filename;
  if (req.files?.after)  result.after  = req.files.after[0].filename;
  res.json(result);
});

module.exports = router;
