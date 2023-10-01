import express from "express";
import logger from "morgan";
import cors from "cors";

import "dotenv/config";

import contactsRouter from "./routes/api/contacts.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


import nodemailer from "nodemailer";
// import "dotenv/config";

const {UKR_NET_FROM, UKR_NET_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: "465",
    secure: true, 
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_FROM,
    to: "padogi6753@fesgrid.com",
    subject:"Test email",
    html: "Test email",
}

transport.sendMail(email)
.then(()=> console.log("email send"))
.catch(error=> console.log(error.message));


export default app;
