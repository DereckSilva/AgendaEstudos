import express from 'express'
import {login, cadLogin, cadastro} from '../controllers/cadastroController.js'
import {schemaRegister, validator} from '../middlewares/mainMiddlewares.js'
import {homeUser, logout} from '../controllers/homeController.js'
import passport from 'passport'
import acesso from '../../helpers/acesso.js' //helper para verificar se o usuário está autenticado   

export const userRouter = express.Router()

//Rota da page do usuário
userRouter.get('/', acesso.acesso, homeUser);

//Rotas de Cadastro
userRouter.get('/cadastro' ,cadastro)
userRouter.post('/cadUser', schemaRegister, validator,cadLogin)

//Rotas de Login
userRouter.get('/login', login)
userRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

//Rota de logout
userRouter.get('/logout', logout)

