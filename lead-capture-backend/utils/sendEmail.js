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

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_448,dpr_2/f_auto,q_auto/v1705580325/ideas-and-advice-prod/en-us/target_142183cd7b8/target_142183cd7b8.png?_i=AA" alt="Company Logo" style="max-width: 150px; margin-bottom: 20px;">
      </div>

      <h2 style="color: #333333;">Hi ${name},</h2>
      <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>

      <h4>Your Message:</h4>
      <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <img src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg" alt="Thank You" style="max-width: 100%;">
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #777777; text-align: center;">
        &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting us',
    html: htmlContent,
    // text: `Hi ${name},\n\nThanks for reaching out. We received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nRegards,\nYour Company`
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
  html: htmlContent,
  // text: `
  //   New lead received:

  //   Name: ${name}
  //   Email: ${email}
  //   Message: ${message}
  // `,
};

transporter.sendMail(adminMailOptions);

};

module.exports = sendEmail;