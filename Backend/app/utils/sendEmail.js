const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // Transporter Config - Environment Variables ke sath strict IPv4 connectivity
  const Transporter = nodemailer.createTransport({
    // 🔥 Host mein direct Gmail ka official IPv4 IP address daal diya taaki IPv6 block bypass ho sake
    host: "74.125.130.108", 
    port: 465,              // Secure SSL Port
    secure: true,           // SSL active rahega
    auth: {
      user: process.env.EMAIL_USER, // Render Dashboard variable
      pass: process.env.EMAIL_PASS, // Render Dashboard variable
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: {
      // Kyunki hum IP address use kar rahe hain, isliye SSL domain mismatch warning ko ignore karna hoga
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