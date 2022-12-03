const router = require('express').Router()
const cadastroController = require('./src/controllers/cadastroController')
const middleware = require('./src/middlewares/mainMiddlewares')
const homeController = require('./src/controllers/homeController')
const agendaController = require('./src/controllers/agendaController')
const passport = require('passport')
const {acesso} = require('./helpers/acesso') //helper para verificar se o usuário está autenticado   

//Rotas de Cadastro
router.get('/cadastro' ,cadastroController.cadastro)
router.post('/cadUser', middleware.schemaRegister, middleware.validator,cadastroController.cadLogin)

//Rotas de Login
router.get('/login', cadastroController.login)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

//Rota de logout
router.get('/logout', homeController.logout)

//Rota da page do usuário
router.get('/', acesso,homeController.homeUser);

//Rota para criar agenda
router.get('/agenda', acesso, agendaController.agenda)
router.post('/criaAgenda', middleware.agenda, middleware.agendaError, agendaController.criaAgenda)
router.get('/filtro', acesso, homeController.filtro)

//Rota de atualizar a agenda
router.get('/atualizar/:id?', acesso, agendaController.atualiza)
router.put('/atualizaAgend/:id?', agendaController.returnAgendaAt)

//rota para excluir a agenda
router.get('/remove/:id?', acesso, agendaController.remove)
router.delete('/remover/:id?', agendaController.removeCad)

module.exports = {
    router
}