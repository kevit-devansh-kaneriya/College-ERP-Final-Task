const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendStaffLoginInfoEmail = (email, password) => {
    sgMail.send({
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: 'Your staff account crated successfully.',
        text: `Login Id: ${email}\nPassword: ${password}`,
    });
};
module.exports = { sendStaffLoginInfoEmail };
//# sourceMappingURL=account.js.map