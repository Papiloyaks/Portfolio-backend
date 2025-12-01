const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const Message = require("../models/Message");

const contact = async (req, res) => {
  try {
    console.log("📥 Received:", req.body);

    const newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      message: req.body.message,
    });

    await newMessage.save();
    console.log("📩 Message saved to DB");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // 🚀 FIX SSL ERROR
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "recipient@gmail.com",
      subject: `${req.body.name} checked your portfolio`,
      text: `Message: ${req.body.message}
Email: ${req.body.email}
Company: ${req.body.company}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: true,
      message: "Message saved and email sent!",
    });

  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ status: false, error });
  }
};

module.exports = { contact };

