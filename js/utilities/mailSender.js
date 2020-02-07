"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = (AuthHelper, info) => {
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    const client = AuthHelper.emailTransport(sendGridApiKey);
    const sendEmailPromise = new Promise((resolve, reject) => {
        if (info.email === undefined || info.email === '')
            reject(new Error('Provide email'));
        else if (info.subject === undefined || info.subject === '')
            reject(new Error('Provide subject'));
        else if (!info.html)
            reject(new Error('No html provided'));
        info.email = info.email.toLowerCase();
        const email = {
            from: process.env.APP_EMAIL,
            to: info.email,
            subject: info.subject,
            html: info.html,
        };
        client.sendMail(email, (err, data) => {
            const error = { message: 'Not sent', error: err };
            const success = { message: 'Sent', data: data };
            if (err)
                reject(error);
            resolve(success);
        });
    });
    return sendEmailPromise;
};
//# sourceMappingURL=mailSender.js.map