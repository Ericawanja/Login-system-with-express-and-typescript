import express, {Application, Request, Response} from 'express'

const App:Application = express()

App.get('/', (req:Request, res:Response)=>{
    return res.status(200).json({msg:'getting the data'})
})
App.listen(5000, ()=>console.log('app running'))