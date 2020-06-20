const md5 = require("md5");
const mailer = require("./helper/mailer");
let verificationCode;

verificationCode = md5(new Date().getTime()).substr(0, 6);

mailer({
  from: "zss@narola.email",
  to: "zss@narola.email",
  subject: "User verification",
  text: `Your Verification Code ${verificationCode}`,
  html: `<span> Your Verification Code ${verificationCode} </span>`,
});

console.log(verificationCode);
