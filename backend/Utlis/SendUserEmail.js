const nodemailer = require('nodemailer');

const sendUserEmail = async (orderId, userEmail, deliveryStatus) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: userEmail,
      subject: `🛒 Order ${deliveryStatus} - Order ID: ${orderId}`,
      text: `
Hi,

Your order (ID: ${orderId}) has been ${deliveryStatus.toLowerCase()} by the admin.

Thank you for using our services.

— Team Support
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to user!");
  } catch (error) {
    console.error("❌ Failed to send email to user:", error);
  }
};

module.exports = sendUserEmail;
