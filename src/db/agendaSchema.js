const mongoose = require('mongoose')

const AgendaSchema = new mongoose.Schema({
    id_user: {type: String, required: true},
    diaSemana:{type: String, required: true},
    horaIni:{type: String, required: true},
    horaFim: {type: String, required: true},
    conteudo: {type: String, required: true}
})

module.exports = {
    AgendaSchema
}