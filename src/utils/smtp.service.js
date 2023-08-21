var nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(mailDetails) {
    var mailOptions = {
      from: mailDetails.from,
      to: mailDetails.to,
      cc: mailDetails.cc,
      text: 'Omni Channel company',
      html: mailDetails.html,
    };

    mailOptions.subject = mailDetails.subject;
    var smtpTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'forall.omni.channel@gmail.com',
        pass: 'bfbjdecdlkemjpws',
      },
      debug: true,
    });

    smtpTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  },
};
