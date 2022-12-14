import express from  'express'
import session from 'express-session'
import mongoose from 'mongoose'
import {userRouter} from './src/routes/user.routes.js'
import { agendaRouter } from './src/routes/agenda.routes.js'
import flash  from 'connect-flash'
import {middleware} from './src/middlewares/mainMiddlewares.js'
import passport from 'passport'
import dotenv from 'dotenv'
import passportA from "./config/auth.js"
import methodOverride from 'method-override'

const app = express()
const port = 3333
dotenv.config()
passportA(passport)

async function conexao(){
    mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology:true})
    console.log('Conectou com a base de dados!')
}

app.use(express.static('./public'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true})) 
app.set('views', './src/view')
app.set('view engine', 'ejs')


app.use(session({ 
    secret: 'agendaEstudo',
    resave: true, 
    saveUninitialized: true,
    cookie:{
        maxAge: 10000 * 60 * 60 * 24 * 7, 
        httpOnly:true 
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use(middleware)
app.use(userRouter)
app.use(agendaRouter)
app.use(express.json())

conexao()
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})