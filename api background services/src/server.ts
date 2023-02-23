import express, {Application, Router} from 'express'
import cron from 'node-cron'
import sendWelcomeEmail from './EmailService'

const app:Application = express()

cron.schedule('* * * * * *', async()=>{
    console.log('running a task every 10 second')
    sendWelcomeEmail()
})

app.listen(4002, ()=>{
    console.log("app is running")
})
