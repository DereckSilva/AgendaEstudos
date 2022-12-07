import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

//criação de schema para o cadastro de usuários
export const CadSchema = new mongoose.Schema({
    nameUser: {type: String, required: true,  unique: false},
    passwordUser: {type: String, required: true,  unique: false, select: false},
    emailUser: {type: String, required: true,  unique: false},
    telUser: {type: String, required: true,  unique: false},
    cepUser: {type: String, required:true,  unique: false},
    dataNascimento: {type: String, required: true,  unique: false}
})

//criptografando a senha do usuário
CadSchema.pre("save", function (next){
    this.passwordUser = bcrypt.hashSync(this.passwordUser, 10)
    next()
})

export const CadModel = mongoose.model('Cadastro', CadSchema)