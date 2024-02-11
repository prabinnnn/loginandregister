const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailer = async (email, subject, body) => {
  const info = await transporter.sendMail({
    from: '"prabin" <bhandariprabin402@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: "successful registration", // plain text body
    html: `<b>${body}</b>`, // html body
  });
  return info.messageId;
};
module.exports = { mailer };
