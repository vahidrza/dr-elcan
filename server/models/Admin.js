const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const schema = new mongoose.Schema({ passwordHash: { type: String, required: true } });

schema.statics.verify = async function (password) {
  const doc = await this.findOne();
  return doc ? bcrypt.compare(password, doc.passwordHash) : false;
};

schema.statics.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 12);
  return this.findOneAndUpdate({}, { passwordHash: hash }, { upsert: true, new: true });
};

schema.statics.isSetup = async function () {
  return !!(await this.findOne());
};

module.exports = mongoose.model('Admin', schema);
