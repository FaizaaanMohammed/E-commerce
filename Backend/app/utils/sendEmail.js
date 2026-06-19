const { Resend } = require("resend");

const sendEmail = async (option) => {
  // 🟩 .env se API Key load hogi, koi hardcoding nahi
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Email bhejte hain API ke through (Port 443 - jo Render block nahi kar sakta)
  await resend.emails.send({
    from: "onboarding@resend.dev", // Resend ka default free testing sender email
    to: option.email,
    subject: option.subject,
    html: option.html,
  });
};

module.exports = sendEmail;