const mongoose = require('mongoose')
const bycript = require('bcryptjs')
const { CadSchema } = require('../db/schemaCad')

const CadModel = mongoose.model('Cadastro', CadSchema)

class Cadastro {

    constructor(body) {
        this.body = body,
        this.error = [],
        this.user = null
    }

    async register(){

        try{
            const result = await this.criaUser()
            
            return result
        }catch(err){    
            console.log(err)
        }

    }

    //responsável por fazer a validação de dados
     criaUser(){

        //formatando alguns dados para remover coisas simples
        this.body.telUser =  this.body.telUser.replace('(', '')
        this.body.telUser =  this.body.telUser.replace(')', '')
        this.body.cepUser =  this.body.cepUser.replace('-', '')
        //criptografando a senha
        this.body.passwordUser = bycript.hashSync(this.body.passwordUser, 10)

        //fazer método para varias inserções

        const user = CadModel.insertMany([this.body])

        return user
    }

    buscaUser(){
        const user = CadModel.findOne({_id: this.body})
        return user
    }
}

module.exports = {
    Cadastro,
    CadModel
}