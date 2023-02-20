import express, {Application,json} from 'express'
import authRouter from './Routers/index'

const App:Application = express()
App.use(json())

App.use("/auth", authRouter)
App.listen(5000, ()=>console.log('app running'))