const mongoose = require('mongoose')
const { AgendaSchema } = require('../db/agendaSchema')

const AgendaModel = mongoose.model('Agenda', AgendaSchema)

class Agenda {
  constructor(user,body) {
    this.body = body;
    this.user = user
};

  /*busca registros cadastrados*/
  async buscaFilter() {
    try{

      let agenda 
      if(this.body){
        agenda = await AgendaModel.find({id_user: this.user, diaSemana: this.body});
      }else{
        agenda = await AgendaModel.find({id_user: this.user});
      }
  
      return agenda;
    }catch(err){
      console.log('Erro: '+err)
    }
};

  async buscaAll(){
    try{

      const agenda = await AgendaModel.find({id_user: this.user});
  
      return agenda;
    }catch(err){
      console.log('Erro: '+err)
    }
}

  /*atualiza os dados da agenda*/
  async atualizaAgend(){
    try{

      const agenda = await AgendaModel.find({_id: this.body});
  
      return agenda
    }catch(err){
      console.log('Erro: '+err)
    }
  }

  async atualizar(){
    try{

      const agendaAtualizada = await AgendaModel.findOneAndUpdate(
        {_id: this.body.idUser},//busca por esse objeto
        //atualiza o conjunto de valores abaixo
        {diaSemana: this.body.diaSemana,
          horaIni: this.body.horaIni, 
          horaFim: this.body.horaFim, 
          conteudo: this.body.conteudo
        })
  
        return agendaAtualizada
    }catch(err){
      console.log('Erro: '+err)
    }
  }

  
/*cadastra novos registros no banco */
  async registerAgenda() {
    try{

      const result = await this.cadAgenda();
  
      return result;
    }catch(err){
      console.log('Erro: '+err)
    }
};

  async cadAgenda() {
    try{
      this.body.id_user = this.user;
      const registro = await AgendaModel.insertMany([this.body]);
      return registro;
    }catch(err){
      console.log('Erro: '+err)
    }


};

/*remove cadastro do banco de dados */
  async removeCad(){
    try{
      const registro = await AgendaModel.findOneAndDelete({_id: this.body})
  
      return registro
    }catch(err){
      console.log('Erro: '+err)
    }
  }

};

module.exports = {
  Agenda,
  AgendaModel
};
