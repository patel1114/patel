const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER || "shreydipakbhaipatel32@gmail.com",
        pass: process.env.EMAIL_PASS || "uzhx ntpn msnv qdcm"
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendTicketEmail = async (email, fullName, ticketId, pdfPath) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || "shreydipakbhaipatel32@gmail.com",
            to: email,
            subject: `Your ticket ${ticketId}`,
            text: `Dear ${fullName},\n\nYour ticket (ID: ${ticketId}) has been successfully created.\n\nPlease find your ticket details attached as PDF.\n\nThank You!`,
            attachments: pdfPath ? [{
                filename: `ticket_${ticketId}.pdf`,
                path: pdfPath
            }] : []
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Email sending error:", error);
        return false;
    }
};