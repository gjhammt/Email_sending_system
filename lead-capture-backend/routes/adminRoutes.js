// File: routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

// Temporary hardcoded admin credentials
const ADMIN_EMAIL = process.env.ADMIN_USERNAME || 'adminuser@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'strongpassword123';

// @route POST /api/admin/login
// @desc Admin login to receive token
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// @route GET /api/admin/leads
// @desc Get all leads (protected)
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// @route GET /api/admin/export
// @desc Export leads to CSV
router.get('/export', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find();
    const csvHeaders = 'Name,Email,Message,Date\n';
    const csvRows = leads.map(lead => `"${lead.name}","${lead.email}","${lead.message}","${lead.createdAt.toISOString()}"`).join('\n');
    const csvContent = csvHeaders + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export leads' });
  }
});

module.exports = router;