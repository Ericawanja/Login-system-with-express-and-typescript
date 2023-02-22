import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
ejs.renderFile(
  "Templates/registration.ejs",
  { name: "erica" },
  (error, html) => {
    if (error) {
      console.log(error);
    }
    let message = {
      from: process.env.EMAIL,
      to: process.env.TO,
      subject: "Nodemailer testing",
      text: "Plaintext",
      html,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log(info.response);
    });
  }
);
