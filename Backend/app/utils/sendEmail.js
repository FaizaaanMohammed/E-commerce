const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // Transporter Config - Environment Variables ke sath pure standard approach
  const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // 🔥 Render par IPv6 unreachable error ko crash hone se rokne ke liye custom connection config:
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: {
      // Yeh line Nodemailer ko IPv6 bypass karne aur strict IPv4 connectivity establish karne me help karegi
      rejectUnauthorized: false
    }
  });

  // mail options receiver
  const Mailoptions = {
    from: `"E-Commerce Support" <${process.env.EMAIL_USER}>`, 
    to: option.email, 
    subject: option.subject,
    html: option.html,
  };

  await Transporter.sendMail(Mailoptions);
};

module.exports = sendEmail;