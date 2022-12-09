import  express  from 'express'
import {agendaV, agendaEmail, agendaError} from '../middlewares/mainMiddlewares.js'
import {filtro} from '../controllers/homeController.js'
import {agenda, criaAgenda, atualiza, returnAgendaAt, remove, removeCad} from '../controllers/agendaController.js'
import acesso from '../../helpers/acesso.js'

export const agendaRouter = express.Router()

//Rota para criar agenda
agendaRouter.get('/agenda', acesso.acesso, agenda)
agendaRouter.post('/criaAgenda', agendaEmail, agendaV, agendaError, criaAgenda)
agendaRouter.get('/filtro', acesso.acesso, filtro)

//Rota de atualizar a agenda
agendaRouter.get('/atualizar/:id?', acesso.acesso, atualiza)
agendaRouter.put('/atualizaAgend/:id?', agendaV, agendaError, returnAgendaAt)

//rota para excluir a agenda
agendaRouter.get('/remove/:id?', acesso.acesso, remove)
agendaRouter.delete('/remover/:id?', removeCad)

