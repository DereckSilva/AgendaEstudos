import { CadModel } from '../db/schemaCad.js'

export const buscaUser = (id) =>{
    const user = CadModel.findOne({_id: id})
    return user
}

export class Cadastro {

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

        const user = CadModel.create(this.body)

        return user
    }

    buscaUser(){
        const user = CadModel.findOne({_id: this.body})
        return user
    }
}