const nodemailer = require('nodemailer');

const sendEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
      // admin: process.env.ADMIN_EMAIL, 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting us',
    text: `Hi ${name},\n\nThanks for reaching out. We received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nRegards,\nYour Company`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
  });

  // Email to admin
const adminMailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL, // <-- your own address
  subject: 'New Lead Submission',
  text: `
    New lead received:

    Name: ${name}
    Email: ${email}
    Message: ${message}
  `,
};

transporter.sendMail(adminMailOptions);

};

module.exports = sendEmail;