import express from 'express'
import {login, cadLogin, cadastro} from './src/controllers/cadastroController.js'
import {schemaRegister, validator, agendaV, agendaEmail, agendaError} from './src/middlewares/mainMiddlewares.js'
import {homeUser, logout, filtro} from './src/controllers/homeController.js'
import {agenda, criaAgenda, atualiza, returnAgendaAt, remove, removeCad} from './src/controllers/agendaController.js'
import passport from 'passport'
import acesso from './helpers/acesso.js' //helper para verificar se o usuário está autenticado   

export const router = express.Router()
//Rotas de Cadastro
router.get('/cadastro' ,cadastro)
router.post('/cadUser', schemaRegister, validator,cadLogin)

//Rotas de Login
router.get('/login', login)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

//Rota de logout
router.get('/logout', logout)

//Rota da page do usuário
router.get('/', acesso.acesso, homeUser);

//Rota para criar agenda
router.get('/agenda', acesso.acesso, agenda)
router.post('/criaAgenda', agendaEmail, agendaV, agendaError, criaAgenda)
router.get('/filtro', acesso.acesso, filtro)

//Rota de atualizar a agenda
router.get('/atualizar/:id?', acesso.acesso, atualiza)
router.put('/atualizaAgend/:id?', agendaV, agendaError, returnAgendaAt)

//rota para excluir a agenda
router.get('/remove/:id?', acesso.acesso, remove)
router.delete('/remover/:id?', removeCad)