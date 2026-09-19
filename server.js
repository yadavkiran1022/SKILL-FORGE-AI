require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const os = require("os");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

// ==========================================
// SMTP CONFIGURATION (optional)
// ==========================================

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_CONFIGURED = !!(SMTP_USER && SMTP_PASS);

let transporter = null;
if (SMTP_CONFIGURED) {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
    transporter.verify((error) => {
        if (error) {
            console.error("⚠️  SMTP connection failed:", error.message);
            console.error("    Verification codes will be shown on-screen instead.");
        } else {
            console.log("✅ Gmail SMTP connection successful");
        }
    });
} else {
    console.log("ℹ️  SMTP not configured — verification codes will be shown on-screen.");
}

// ==========================================
// EXPRESS CONFIGURATION
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ==========================================
// OTP STORAGE (in-memory)
// ==========================================

const otpStore = new Map();

// ==========================================
// GENERATE OTP
// ==========================================

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ==========================================
// RESOLVE USER (accepts email or ID, returns email)
// ==========================================

app.post("/api/resolve-user", (req, res) => {
    const identity = String(req.body.userId || req.body.email || "")
        .trim()
        .toLowerCase();

    if (!identity) {
        return res.status(400).json({ success: false, message: "User ID or email is required." });
    }

    if (identity.includes("@")) {
        return res.json({ success: true, email: identity, userId: null });
    }

    return res.json({ success: true, userId: identity, email: identity + "@skillforge.ai" });
});

// ==========================================
// SEND VERIFICATION OTP
// ==========================================

app.post("/api/send-verification", async (req, res) => {
    try {
        const identity = String(req.body.userId || req.body.email || "")
            .trim()
            .toLowerCase();

        if (!identity) {
            return res.status(400).json({
                success: false,
                message: "User ID or email is required."
            });
        }

        let email = identity;
        if (!identity.includes("@")) {
            email = identity + "@skillforge.ai";
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "The account does not have a valid email address."
            });
        }

        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        otpStore.set(email, { otp, expiresAt });

        if (SMTP_CONFIGURED && transporter) {
            const mailOptions = {
                from: `"Skill Forge AI" <${SMTP_USER}>`,
                to: email,
                subject: "Your Skill Forge AI Verification Code",
                text: `Your Skill Forge AI verification code is: ${otp}\n\nThis code will expire in 5 minutes.\n\nIf you did not request this code, please ignore this email.`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2>Skill Forge AI</h2>
                        <p>Your verification code is:</p>
                        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 15px; text-align: center; background: #f4f4f4; border-radius: 8px;">${otp}</div>
                        <p>This code will expire in <b>5 minutes</b>.</p>
                        <p>If you did not request this code, please ignore this email.</p>
                    </div>`
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log("✅ Verification email sent to:", email);
                return res.json({ success: true, message: "Verification code sent.", recipient: email });
            } catch (mailErr) {
                console.error("⚠️  Email send failed, returning demo code:", mailErr.message);
                return res.json({
                    success: true,
                    demo: true,
                    demoCode: otp,
                    recipient: email,
                    message: "Email could not be sent. Use the demo code shown on-screen."
                });
            }
        }

        // No SMTP configured — return the code so the frontend can display it
        console.log(`📧 Demo verification code for ${email}: ${otp}`);
        return res.json({
            success: true,
            demo: true,
            demoCode: otp,
            recipient: email,
            message: "SMTP not configured. Use the demo code shown on-screen."
        });

    } catch (error) {
        console.error("❌ OTP sending failed:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to send verification code.",
            error: error.message
        });
    }
});

// ==========================================
// VERIFY OTP
// ==========================================

app.post("/api/verify-code", (req, res) => {
    try {
        const identity = String(req.body.userId || req.body.email || "")
            .trim()
            .toLowerCase();
        const code = String(req.body.code || "").trim();

        if (!identity || !code) {
            return res.status(400).json({
                success: false,
                message: "User ID or email and verification code are required."
            });
        }

        if (!/^\d{6}$/.test(code)) {
            return res.status(400).json({
                success: false,
                message: "Enter the 6-digit OTP."
            });
        }

        let email = identity;
        if (!identity.includes("@")) {
            email = identity + "@skillforge.ai";
        }

        const record = otpStore.get(email);

        if (!record) {
            return res.status(400).json({ success: false, message: "No verification code found. Please request a new code." });
        }

        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ success: false, message: "Verification code expired. Please request a new code." });
        }

        if (record.otp !== code) {
            return res.status(400).json({ success: false, message: "Invalid verification code." });
        }

        otpStore.delete(email);
        console.log("✅ OTP verified:", email);
        return res.json({ success: true, message: "Email verified successfully." });

    } catch (error) {
        console.error("❌ Verification error:", error.message);
        return res.status(500).json({ success: false, message: "Verification failed." });
    }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Skill Forge AI server is running",
        mailMode: SMTP_CONFIGURED ? "gmail-smtp" : "demo"
    });
});

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ==========================================
// START SERVER
// ==========================================

function getLanAddresses() {
    return Object.values(os.networkInterfaces())
        .flat()
        .filter(details => details && details.family === "IPv4" && !details.internal)
        .map(details => details.address);
}

const server = app.listen(PORT, HOST, () => {
    const lanAddresses = getLanAddresses();
    console.log("");
    console.log("==========================================");
    console.log("   SKILL FORGE AI SERVER");
    console.log("==========================================");
    console.log(`Local: http://localhost:${server.address().port}`);
    if (lanAddresses.length > 0) {
        console.log("Network:");
        lanAddresses.forEach(address => console.log(`  http://${address}:${server.address().port}`));
    }
    console.log(`Mail mode: ${SMTP_CONFIGURED ? "Gmail SMTP" : "Demo (on-screen codes)"}`);
    console.log("==========================================");
    console.log("");
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log(`Port ${PORT} is in use, trying port ${PORT + 1}...`);
        app.listen(PORT + 1, HOST, () => {
            console.log(`✅ Server running on http://localhost:${PORT + 1}`);
        });
    } else {
        console.error("Server error:", err.message);
        process.exit(1);
    }
});
