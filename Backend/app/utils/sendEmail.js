const nodemailer = require("nodemailer");

const sendEmail = async(option) => {
  // Transporter

  const Transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // mail options receiver

  const Mailoptions = {
    from: `"E-Commerce Support" <${process.env.EMAIL_USER}>`, 
    to: option.email, 
    subject: option.subject,
    html: option.html,
  };

  await Transporter.sendMail(Mailoptions)
};

module.exports = sendEmail;
