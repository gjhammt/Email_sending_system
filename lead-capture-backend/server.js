const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');
const sendEmail = require('./utils/sendEmail');
// const sendEmail = require('./sendGrid');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.post('/api/lead', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newLead = new Lead({ name, email, message });
    await newLead.save();

    await sendEmail(name, email, message);

    res.status(200).json({ message: 'Lead submitted successfully.' });
    console.log('Received data:', req.body);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


