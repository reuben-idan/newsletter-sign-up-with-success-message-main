// server.js (Node.js example)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-email', (req, res) => {
  const email = req.body.email;

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.your-email-provider.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password'
    }
  });

  // Compose the email message
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Newsletter Subscription Confirmation',
    text: 'Thank you for subscribing to our newsletter!'
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('Error sending email.');
    } else {
      console.log('Email sent: %s', info.messageId);
      res.send('Email submitted successfully.');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});