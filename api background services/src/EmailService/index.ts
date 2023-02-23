import dotenv from 'dotenv'
import ejs from 'ejs'
import path from 'path';
import sendMail from '../helpers/email';



dotenv.config({path:path.resolve(__dirname, '../../.env')})



const sendWelcomeEmail = async()=>{
   let user = 'wanjaerica@gmail.com'
   ejs.renderFile('Templates/registration.ejs', {name:'Me'}, async(error, html)=>{
    const message = {
        from:process.env.FROM,
        to:process.env.TO,
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
export default sendWelcomeEmail
