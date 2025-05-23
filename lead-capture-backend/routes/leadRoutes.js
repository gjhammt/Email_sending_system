// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { leadValidationRules } = require('../middlewares/validators');
const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');

router.post('/', leadValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    const newLead = new Lead({ name, email, message });
    await newLead.save();

    await sendEmail(name, email, message);

    res.status(200).json({ message: 'Lead submitted successfully.' });
  } catch (err) {
    console.error('Error submitting lead:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
