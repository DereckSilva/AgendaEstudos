const mongoose = require('mongoose')
const { AgendaSchema } = require('../db/agendaSchema')

const AgendaModel = mongoose.model('Agenda', AgendaSchema)

class Agenda {
  constructor(user,body) {
    this.body = body;
    this.user = user
};

  /*busca registros cadastrados*/
   buscaFilter() {
      let agenda 
      if(this.body){
        agenda = AgendaModel.find({id_user: this.user, diaSemana: this.body});
      }else{
        agenda = AgendaModel.find({id_user: this.user});
      }
  
      return agenda;
};

 buscaAll(){
      const agenda =  AgendaModel.find({id_user: this.user});
  
      return agenda;
}

  /*atualiza os dados da agenda*/
 atualizaAgend(){

    const agenda = AgendaModel.find({_id: this.body});

    return agenda
  }

 atualizar(){
    
    const agendaAtualizada = AgendaModel.findOneAndUpdate(
      {_id: this.body.idUser},//busca por esse objeto
      //atualiza o conjunto de valores abaixo
      {diaSemana: this.body.diaSemana,
        horaIni: this.body.horaIni, 
        horaFim: this.body.horaFim, 
        conteudo: this.body.conteudo
      })

      return agendaAtualizada
  }

  
/*cadastra novos registros no banco */
  registerAgenda() {

    const result = this.cadAgenda();

    return result;
};

  cadAgenda() {
    this.body.id_user = this.user;
    const registro = AgendaModel.insertMany([this.body]);
    return registro;
};

/*remove cadastro do banco de dados */
  removeCad(){
    const registro = AgendaModel.findOneAndDelete({_id: this.body})

    return registro
  }

};

module.exports = {
  Agenda,
  AgendaModel
};
