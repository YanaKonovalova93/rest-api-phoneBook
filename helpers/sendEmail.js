// import nodemailer from "nodemailer ";
// import "dotenv/config";

// const {GMAIL_FROM, GMAIL_PASSWORD} = process.env;

// const nodemailerConfig = {
//     host: "smtp.gmail.com",
//     port: "465",
//     secure: true, 
//     auth: {
//         user: GMAIL_FROM,
//         pass: GMAIL_PASSWORD,
//     }
// }

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//     from: GMAIL_FROM,
//     to: "padogi6753@fesgrid.com",
//     subject:"Test email",
//     html: "Test email",
// }

// transport.sendMail(email)
// .then(()=> console.log("email send"))
// .catch(error=> console.log(error.message));