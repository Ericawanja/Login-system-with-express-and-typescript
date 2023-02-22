import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({path:path.resolve(__dirname, '../.env')})

let config = {
    host:'smtp.gmail.com',
    service: 'gmail',
    port:587,
    auth:{
        user: process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}

function createTransporter(config:any){
    return nodemailer.createTransport(config)
}


let message = {
    from:process.env.EMAIL,
    to:process.env.TO,
    subject:"Nodemailer testing",
    text:"Plaintext",
    html:"<p>The html paragram</p>"
}

async function sendMail(message:any){
    let transporter = await createTransporter(config)

    transporter.sendMail(message, (error, info)=>{
        if(error){
            console.log(error)
        }
        console.log(info.response)
    })

}
