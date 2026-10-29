const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date:         { type: Date, default: Date.now },
  doctor:       { type: String, enum: ['aygun', 'elcan', ''], default: '' },
  treatment:    { type: String, enum: ['consultation','braces','implant','whitening','veneer','crown','extraction','root_canal','cleaning','prosthesis','other',''], default: '' },
  nextStep:     { type: String, enum: ['1w','2w','1m','3m','6m','done','await_call',''], default: '' },
  sessionNotes: { type: String, default: '' },
  photos:       [String]
}, { timestamps: true });

const patientSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  phone:  { type: String, required: true, trim: true },
  dob:    Date,
  gender: { type: String, enum: ['male', 'female', ''], default: '' },
  doctor: { type: String, enum: ['aygun', 'elcan', ''], default: '' },
  notes:  { type: String, default: '' },
  visits: [visitSchema]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
