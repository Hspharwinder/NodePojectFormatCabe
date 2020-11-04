
const config = require('config');
const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(config.get("sendGrid.key"));
const fromMail = config.get("sendGrid.email");
const sendUserVerifyMail= (payload) => {
    const msg = {
        from: fromMail,
        to: payload.email || '-',
        subject: 'U2Go - Welcome',
        html: ''
    };
    const link=`<a href="https://admin.cleat-street.com/#/email-verification/?veificationToken=${payload.veificationToken}">click me</a>`;
    const html = `
        <h3>Thank you for register on U2Go</h3>
        <p>You verification link is ${link}.</p>
    `;
    msg.html = html;
    sendGrid.send(msg).then(info => {
        // console.log('Email Sent successfully!');
    }).catch(error => {
        // console.log('Email not sent.', error);
    });
};
const sendDriverVerifyMail= (payload) => {
    const msg = {
        from: fromMail,
        to: payload.email || '-',
        subject: 'U2Go - Welcome',
        html: ''
    };
    const link=`<a href="https://admin.cleat-street.com/#/email-verification/?veificationToken=${payload.veificationToken}">click me</a>`;
    const html = `
        <h3>Thank you for register on U2Go</h3>
        <p>You verification link is ${link}.</p>
    `;
    msg.html = html;
    sendGrid.send(msg).then(info => {
        // console.log('Email Sent successfully!');
    }).catch(error => {
        // console.log('Email not sent.', error);
    });
};
const adminForgotEmail=payload => {
    return new Promise((resolve, reject) => {
        const msg = {
            from: fromMail,
            to: payload.email || '-',
            subject: 'U2Go Admin - Reset Password',
            html: ''
        };
        const resetToken=payload.resetToken || '';
        const html = `
            <p><a href="https://admin.cleat-street.com/#/reset-password/?resetToken=${resetToken}">Click here to reset your password.</a></p>
            `;
                msg.html = html;
                sendGrid.send(msg).then(info => {
                    return resolve(info);
                }).catch(error => {
                    // console.log(error)
                    return reject(error);
                });
            });
};
const userForgotEmail= payload => {
    return new Promise((resolve, reject) => {
        const msg = {
            from: fromMail,
            to: payload.email || '-',
            subject: 'U2Go Customer - Reset Password',
            html: ''
        };
        const resetToken=payload.resetToken || '';
        const html = `
            <p><a href="https://admin.cleat-street.com/#/reset-password-user/?resetToken=${resetToken}">Click here to reset your password.</a></p>
            `;
                msg.html = html;
                sendGrid.send(msg).then(info => {
                    // console.log("Email sent")
                    return resolve(info);
                }).catch(error => {
                    // console.log("error",error)
                    return reject(error);
                });
            });
};
const driverForgotEmail= payload => {
    return new Promise((resolve, reject) => {
        const msg = {
            from: fromMail,
            to: payload.email || '-',
            subject: 'U2Go Driver - Reset Password',
            html: ''
        };
        const resetToken=payload.resetToken || '';
        const html = `
            <p><a href="https://admin.cleat-street.com/#/reset-password-driver/?resetToken=${resetToken}">Click here to reset your password.</a></p>
            `;
                msg.html = html;
                sendGrid.send(msg).then(info => {
                    // console.log("Email sent")
                    return resolve(info);
                }).catch(error => {
                    // console.log("error",error)
                    return reject(error);
                });
            });
};

const sendMail= (payload) => {
    const msg = {
        from: fromMail,
        to: payload.email || '-',
        subject: 'U2Go - Welcome',
        html: ''
    };
    const html = payload.message || '';
    msg.html = html;
    sendGrid.send(msg).then(info => {
        // console.log('Email Sent successfully!');
    }).catch(error => {
        // console.log('Email not sent.', error);
    });
};

module.exports = {
    sendUserVerifyMail:sendUserVerifyMail,
    sendDriverVerifyMail:sendDriverVerifyMail,
    adminForgotEmail:adminForgotEmail,
    userForgotEmail:userForgotEmail,
    driverForgotEmail:driverForgotEmail,
    sendMail:sendMail
}