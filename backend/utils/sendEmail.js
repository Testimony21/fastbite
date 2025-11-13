import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";

dotenv.config();

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, html }) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: to }],
    sender: { name: "Fastbite", email: "testimonyokochac@gmail.com" },
    subject,
    htmlContent: html,
  });

  try {
    const result = await client.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent:", result);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
    throw error;
  }
};

export default sendEmail;
