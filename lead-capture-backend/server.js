// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const Lead = require('./models/Lead');
// const sendEmail = require('./utils/sendEmail');
// const { leadValidationRules } = require('./middlewares/validators');
// const { validationResult } = require('express-validator');

// const helmet = require('helmet');
// app.use(helmet());

// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use(limiter);

// // const sendEmail = require('./sendGrid');
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

// // Routes
// app.post('/api/lead', leadValidationRules, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, email, message } = req.body;
//     const newLead = new Lead({ name, email, message });
//     await newLead.save();

//     await sendEmail(name, email, message);

//     res.status(200).json({ message: 'Lead submitted successfully.' });
//     console.log('Received data:', req.body);
//   } catch (err) {
//     console.error('Submission error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });




// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/lead', leadRoutes);

const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());

// Public admin login route
app.use('/login', adminAuthRoutes);

// Protected admin routes
app.use('/api/leads', authMiddleware, adminRoutes);

app.use('/api/admin', adminRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
