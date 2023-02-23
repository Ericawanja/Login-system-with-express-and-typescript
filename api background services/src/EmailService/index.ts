import dotenv from 'dotenv'
import ejs from 'ejs'
import path from 'path';
import { exec } from '../helpers/dbConnect';
import sendMail from '../helpers/email';



dotenv.config({path:path.resolve(__dirname, '../../.env')})



const sendWelcomeEmail = async()=>{
const emailList = await exec('getResetEmailList')
for (let user of emailList){


   ejs.renderFile('Templates/registration.ejs', {name:'there'}, async(error, html)=>{
    const message = {
        from:process.env.FROM,
        to:user.Email,
        subject:"testing",
        html,
    }
    console.log(message.html)
    try{
        await sendMail(message)
    }catch(error){
        console.log('error', error)
    }
   }) 
}
}
export default sendWelcomeEmail
