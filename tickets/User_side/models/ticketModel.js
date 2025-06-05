const db = require("../db");

const createTicket = async (ticketData) => {
    const { ticketId, fullName, email, type, telephone, location, subject, helpTopic, message, attachment } = ticketData;

    const query = `
        INSERT INTO tickets 
        (ticketId, fullName, email, type, telephone, location, subject, helpTopic, message, attachment, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open', NOW())
    `;

    try {
        const [result] = await db.execute(query, [
            ticketId, fullName, email, type, telephone, location, subject, helpTopic, message, attachment
        ]);
        return result;
    } catch (error) {
        console.error("Error inserting ticket:", error);
        throw error;
    }
};

module.exports = { createTicket };