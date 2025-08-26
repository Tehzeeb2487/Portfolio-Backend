const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'javedshikh312@gmail.com',
                pass: 'fpqyvphksczifltl',
            },
        });

        await transporter.sendMail({
            from: 'javedshaikh312@gmail.com',
            to: 'javedshikh312@gmail.com',
            subject: `Message from ${name}`,
            text: `From: ${email}\n${message}`,
            replyTo: email,
        });

        res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));