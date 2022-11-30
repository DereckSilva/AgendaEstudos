require('dotenv/config')

const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const port = 3000
const mongoose = require('mongoose')
const router = require('./routes')
const flash  = require('connect-flash')
const middleware = require('./src/middlewares/mainMiddlewares')
const passport = require('passport')
require("./config/auth")(passport)
const methodOverride = require('method-override')

async function conexao(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cursonode.sfcwotf.mongodb.net/agenda?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology:true})
    await app.emit('conectou')
    await console.log('Conectou com a base de dados!')
}

app.use(express.static(path.join(__dirname, '/public') ))
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
app.use(middleware.middleware)
app.use(router.router)

conexao()
app.on('conectou', ()=>{
    app.listen(port, ()=>{
        console.log(`Servidor rodando na porta ${port}`)
    })

})