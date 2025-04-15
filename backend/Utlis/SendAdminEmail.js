const nodemailer = require('nodemailer');
const sendAdminEmail = async (order, userEmail) => {
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
        to: process.env.ADMIN_EMAIL,
        replyTo: userEmail,
        subject: '🛒 New Order Placed!',
        text: `
  New Order Received!
  
  📅 Service Date: ${order.serviceDate}
  💰 Total Amount: ₹${order.totalAmount}
  📧 Ordered by: ${userEmail}
  
  🛍️ Items:
  ${order.cartItems.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n')}
        `,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("📧 Email sent to admin!");
    } catch (error) {
      console.error("❌ Failed to send email to admin:", error);
    }
  };
  
  module.exports = sendAdminEmail;