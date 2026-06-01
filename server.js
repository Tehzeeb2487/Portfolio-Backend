const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    console.log("Request body:", req.body);

    res.status(200).json({
        message: "Backend working"
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));