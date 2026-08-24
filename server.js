const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(connection => {
        console.log("✅ MySQL database connected successfully");
        connection.release();
    })
    .catch(error => {
        console.error("❌ MySQL connection failed:");
        console.error(error.message);
    });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const localtunnel = require("localtunnel");
const path = require("path");
const os = require("os");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const configuredHost = String(process.env.HOST || "").trim().toLowerCase();
const HOST = ["localhost", "127.0.0.1", "::1"].includes(configuredHost)
    ? "0.0.0.0"
    : (configuredHost || "0.0.0.0");

function getLanAddresses() {
    return Object.values(os.networkInterfaces())
        .flat()
        .filter(details => details && details.family === "IPv4" && !details.internal)
        .map(details => details.address);
}

// ==========================================
// SMTP CONFIGURATION
// ==========================================

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// ==========================================
// EXPRESS CONFIGURATION
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your frontend files
app.use(express.static(path.join(__dirname)));

// ==========================================
// OTP STORAGE
// ==========================================

const otpStore = new Map();

// ==========================================
// GMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
});

// ==========================================
// CHECK SMTP CONNECTION
// ==========================================

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP connection failed:");
        console.error(error.message);
    } else {
        console.log("✅ Gmail SMTP connection successful");
    }
});

// ==========================================
// GENERATE OTP
// ==========================================

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Resolve a login identity before the frontend selects a local progress store.
app.post("/api/resolve-user", async (req, res) => {
    try {
        const identity = String(req.body.userId || req.body.email || "")
            .trim()
            .toLowerCase();

        if (!identity) {
            return res.status(400).json({ success: false, message: "User ID or email is required." });
        }

        if (identity.includes("@")) {
            return res.json({ success: true, email: identity, userId: null });
        }

        const [users] = await db.query(
            "SELECT id, email FROM users WHERE id = ? LIMIT 1",
            [identity]
        );
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No account was found for that user ID." });
        }

        return res.json({
            success: true,
            userId: String(users[0].id),
            email: String(users[0].email).trim().toLowerCase()
        });
    } catch (error) {
        console.error("❌ User identity lookup failed:", error.message);
        return res.status(500).json({ success: false, message: "Could not look up this account." });
    }
});

// ==========================================
// SEND VERIFICATION OTP
// ==========================================

app.post("/api/send-verification", async (req, res) => {
    try {
        const identity = String(req.body.userId || req.body.email || "")
            .trim()
            .toLowerCase();

        console.log("📧 OTP requested for:", identity);

        if (!identity) {
            return res.status(400).json({
                success: false,
                message: "User ID or email is required."
            });
        }

        // Accept either the registered email or the user's database ID. The
        // resolved email is always used as the OTP recipient and storage key.
        let email = identity;
        if (!identity.includes("@")) {
            const [users] = await db.query(
                "SELECT email FROM users WHERE id = ? LIMIT 1",
                [identity]
            );
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No account was found for that user ID."
                });
            }
            email = String(users[0].email || "").trim().toLowerCase();
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "The account does not have a valid email address."
            });
        }

        // Generate 6-digit OTP
        const otp = generateOTP();

        // OTP expires after 5 minutes
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        console.log("🔐 OTP generated");

        // Send email
        const mailOptions = {
            from: `"Skill Forge AI" <${SMTP_USER}>`,
            to: email,
            subject: "Your Skill Forge AI Verification Code",

            text: `Your Skill Forge AI verification code is: ${otp}

This code will expire in 5 minutes.

If you did not request this code, please ignore this email.`,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 25px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                ">

                    <h2>Skill Forge AI</h2>

                    <p>Your verification code is:</p>

                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        padding: 15px;
                        text-align: center;
                        background: #f4f4f4;
                        border-radius: 8px;
                    ">
                        ${otp}
                    </div>

                    <p>
                        This code will expire in
                        <b>5 minutes</b>.
                    </p>

                    <p>
                        If you did not request this code,
                        please ignore this email.
                    </p>

                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email sent successfully");
        console.log("📨 Message ID:", info.messageId);

        // Save OTP in MySQL
        await db.query(
            `INSERT INTO users
                (email, otp, otp_expires_at)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE
                otp = ?,
                otp_expires_at = ?`,
            [
                email,
                otp,
                expiresAt,
                otp,
                expiresAt
            ]
        );

        console.log("✅ OTP saved in MySQL");

        return res.json({
            success: true,
            message: "Verification code sent successfully.",
            recipient: email
        });

    } catch (error) {

        console.error("❌ OTP sending failed:");
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to send verification email.",
            error: error.message
        });
    }
});
// ==========================================
// VERIFY OTP
// ==========================================

app.post("/api/verify-code", async (req, res) => {
    try {

        const identity = String(req.body.userId || req.body.email || "")
            .trim()
            .toLowerCase();

        const code = String(req.body.code || "")
            .trim();

        if (!identity || !code) {
            return res.status(400).json({
                success: false,
                message: "User ID or email and verification code are required."
            });
        }

        if (!/^\d{6}$/.test(code)) {
            return res.status(400).json({
                success: false,
                message: "Enter the current 6-digit OTP from your latest email."
            });
        }

        let email = identity;
        if (!identity.includes("@")) {
            const [users] = await db.query(
                "SELECT email FROM users WHERE id = ? LIMIT 1",
                [identity]
            );
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No account was found for that user ID."
                });
            }
            email = String(users[0].email || "").trim().toLowerCase();
        }

        console.log("🔎 Verifying OTP for:", email);

        const [rows] = await db.query(
            `SELECT *
             FROM users
             WHERE email = ?
             AND otp = ?
             AND otp_expires_at > NOW()`,
            [email, code]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP."
            });
        }

        // OTP is correct
        await db.query(
            `UPDATE users
             SET otp = NULL,
                 otp_expires_at = NULL
             WHERE email = ?`,
            [email]
        );

        console.log("✅ OTP verified:", email);

        return res.json({
            success: true,
            message: "Email verified successfully."
        });

    } catch (error) {

        console.error("❌ Verification error:");
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Verification failed."
        });
    }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Skill Forge AI server is running",
        mailMode: "gmail-smtp"
    });

});

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, HOST, async () => {

    const lanAddresses = getLanAddresses();

    console.log("");
    console.log("==========================================");
    console.log("   SKILL FORGE AI SERVER");
    console.log("==========================================");
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://<this-computer-ip>:${PORT}`);
    if (lanAddresses.length > 0) {
        console.log("Open on devices connected to the same Wi-Fi:");
        lanAddresses.forEach(address => console.log(`  http://${address}:${PORT}`));
    } else {
        console.log("No LAN address detected. Check that Wi-Fi is connected.");
    }
    console.log("Mail mode: Gmail SMTP");
    console.log("OTP sending: ENABLED");
    if (process.argv.includes("--tunnel")) {
        try {
            const tunnel = await localtunnel({ port: PORT });
            console.log(`Public: ${tunnel.url}`);
            tunnel.on("close", () => console.log("Public tunnel closed."));
        } catch (error) {
            console.error("Public tunnel could not be started:", error.message);
        }
    }
    console.log("==========================================");
    console.log("");

});