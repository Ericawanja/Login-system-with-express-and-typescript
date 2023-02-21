import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({path:path.resolve(__dirname, '../.env')})

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    service: 'gmail',
    port:587,
    auth:{
        user: process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

let message = {
    from:process.env.EMAIL,
    to:process.env.TO,
    subject:"Nodemailer testing",
    text:"Plaintext",
    html:"<p>The html paragram</p>"
}

transporter.sendMail(message, (error, info)=>{
    if(error){
        console.log(error)
    }
    console.log(info.response)
})