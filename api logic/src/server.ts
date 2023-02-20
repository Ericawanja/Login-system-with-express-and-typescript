import express, {Application, Request, Response, json} from 'express'
import authRouter from './Routers'

const App:Application = express()
App.use(json())

App.use("/auth" authRouter)
App.listen(5000, ()=>console.log('app running'))