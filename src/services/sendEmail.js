import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html } = {}) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // for production no 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const emailInfo = await transporter.sendMail({
        from: `ahmed yasser ${process.env.EMAIL_USER}`,
        to: to ? to : null,
        subject: subject ? subject : "hello",
        html
    })
    if (emailInfo.accepted.length) {
        return true
    }
    return false
}


