// ---------- 3. models/Lead.js ----------
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);