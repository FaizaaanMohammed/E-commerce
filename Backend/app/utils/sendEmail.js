const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // Transporter Config - Environment Variables ke sath pure standard approach
  const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,              // 🟩 Port 587 (STARTTLS) Render ke firewall blockages ko bypass karega
    secure: false,          // 🟩 Port 587 ke liye hamesha false hota hai
    auth: {
      user: process.env.EMAIL_USER, // Render Dashboard se automatic read hoga
      pass: process.env.EMAIL_PASS, // Render Dashboard se automatic read hoga
    },
    // Render par response lag ya timeout se bachne ke liye standard settings:
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  // mail options receiver
  const Mailoptions = {
    from: `"E-Commerce Support" <${process.env.EMAIL_USER}>`, 
    to: option.email, 
    subject: option.subject,
    html: option.html,
  };

  // Mail sending command
  await Transporter.sendMail(Mailoptions);
};

module.exports = sendEmail;