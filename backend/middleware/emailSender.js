const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function emailSender(mailOptions) {
  const info = await transporter.sendMail({
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html, 
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = emailSender
