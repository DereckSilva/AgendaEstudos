const mongoose = require('mongoose')

//criação de schema para o cadastro de usuários
const CadSchema = new mongoose.Schema({
    nameUser: {type: String, required: true,  unique: false},
    passwordUser: {type: String, required: true,  unique: false},
    emailUser: {type: String, required: true,  unique: false},
    telUser: {type: String, required: true,  unique: false},
    cepUser: {type: String, required:true,  unique: false},
    dataNascimento: {type: String, required: true,  unique: false}
})

module.exports = {
    CadSchema
}