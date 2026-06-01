const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    try {
        console.log("Request body:", req.body);
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            logger: true,
            debug: true,
        });

        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

        console.log("Verifying transporter...");

        // await transporter.verify();

        console.log("Transporter verified");

        const info = await transporter.sendMail({
            from: 'javedshikh312@gmail.com',
            to: 'javedshikh312@gmail.com',
            subject: `Message from ${req.body.name}`,
            text: `
                Name: ${req.body.name}
                Email: ${req.body.email}
                ${req.body.message}
            `,
        });
        console.log("Mail sent:", info.messageId);

        res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        console.error("MAIL ERROR:", error);
        res.status(500).send({ message: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));