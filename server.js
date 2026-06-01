require("dotenv").config();

const { Resend } = require("resend");
const express = require("express");
const cors = require("cors");

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Request body:", req.body);

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tehzeebjahan820@gmail.com",
      subject: `Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (data.error) {
            console.error("Resend error:", data.error);

            return res.status(500).json({
            message: data.error.message,
        });
    }

    console.log("Email sent:", data);

  } catch (error) {
    console.error("RESEND ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});