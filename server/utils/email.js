const mailer = require('nodemailer');

const sendEmail = async options => {
    // create a transporter

    console.log (process.env.EMAIL_USERNAME)
    const transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `${process.env.EMAIL_USERNAME}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });

    const mailOptions = {
        from: 'Junior Bisimwa <bisimwa@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log ('email sent' + info.response);
        }
    });
};

module.exports = sendEmail;