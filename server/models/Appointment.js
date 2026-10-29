const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  phone:         { type: String, required: true, trim: true },
  doctor:        { type: String, default: 'any' },
  service:       { type: String, default: '' },
  preferredDate: { type: Date },
  note:          { type: String, default: '' },
  status:        { type: String, enum: ['new','contacted','scheduled','done','cancelled'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', schema);
