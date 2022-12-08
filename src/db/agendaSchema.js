import mongoose from 'mongoose'

export const AgendaSchema = new mongoose.Schema({
    //alterando tipo de referência para o id do usuário
    id_user: {type: mongoose.Schema.Types.ObjectId, ref:"Cadastro", required: true},
    diaSemana:{type: String, required: true},
    horaIni:{type: String, required: true},
    horaFim: {type: String, required: true},
    conteudo: {type: String, required: true}
})
