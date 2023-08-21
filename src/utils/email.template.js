const { sendEmail } = require('./smtp.service');

const forgotPasswordOtpVerificationEmail = function (userData) {
  let EmailObject = {
    from: 'forall.omni.channel@gmail.com',
    subject: 'Forget password otp verification',
  };
  Object.assign(EmailObject, {
    to: userData.email,
    html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Omni Channel</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Omni Channel. Use the following OTP to change your forget password procedures. OTP is valid for 10 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userData.otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Omni Channel</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Omni Channel App</p>
                </div>
            </div>
        </div>`,
  });
  return sendEmail(EmailObject);
};

const sendMailWithCredentials = function (mailData) {
  let EmailObject = {
    from: 'forall.omni.channel@gmail.com',
    subject: 'Wave login credentials',
  };
  Object.assign(EmailObject, {
    to: mailData.email,
    html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Omni Channel</a>
                </div>
                <p style="font-size:1.1em">Hi ${mailData.userName},</p>
                <p>Welcome in Omni Channel portal. Use the following details for access your account.</p>
                <p style="font-weight:200;">Email: ${mailData.email}</p>
                <p style="font-weight:200;">Password: ${mailData.password}</p>
                <p style="font-size:0.9em;">Regards,<br />Omni Channel</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Omni Channel App</p>
                </div>
            </div>
        </div>`,
  });
  return sendEmail(EmailObject);
};

module.exports = {
  forgotPasswordOtpVerificationEmail,
  sendMailWithCredentials,
};
