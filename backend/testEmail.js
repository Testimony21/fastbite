// backend/testEmail.js
import dotenv from "dotenv";
// import fetch from "node-fetch"; // ❌ REMOVE this line

dotenv.config();

const BREVO_API_KEY = process.env.SMTP_API_KEY; // your Brevo API key
const TO_EMAIL = "testimonyokochac@gmail.com"; // replace with your email

async function sendTestEmail() {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "FastBite Test", email: "no-reply@fastbite.com" },
        to: [{ email: TO_EMAIL }],
        subject: "🚀 Test Email from FastBite Backend (API)",
        htmlContent: "<h2>Hello!</h2><p>This is a test email sent via Brevo API.</p>",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Email sent successfully via API!");
      console.log(data);
    } else {
      console.error("❌ Failed to send email via API:", data);
    }
  } catch (err) {
    console.error("❌ Error sending email via API:", err);
  }
}

// Run test
sendTestEmail();
