import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

let config = ({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function createTransport(config:any){
  return nodemailer.createTransport(config)
}

const sendMail = async(messageOptions:any)=>{
  let transporter = createTransport(config)
  await transporter.verify()
  await transporter.sendMail(messageOptions, (err, info)=>{
    console.log(info, 'the info')
  })
}

export default sendMail