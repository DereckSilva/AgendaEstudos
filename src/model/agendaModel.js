import mongoose from 'mongoose';
import { AgendaSchema } from '../db/agendaSchema.js';

export const AgendaModel = mongoose.model('Agenda', AgendaSchema)


/*busca registros cadastrados*/
export const buscaFilter = (user, body)=>{
  let agenda
  if(body){
    agenda = AgendaModel.find({id_user: user, diaSemana: body});
  }else{
    agenda = AgendaModel.find({id_user: user});
  }

  return agenda
}

export const buscaAll = (user)=>{
  const agenda =  AgendaModel.find({id_user: user});
  
  return agenda;
}

export const cadAgenda = (body, user) =>{
  body.id_user = user;
    const registro = AgendaModel.create(body);
    return registro;
}

export const paginationBd = (limit, offset) => {

  const users = AgendaModel.find()
                            .sort({_id: -1})
                            .skip(offset) 
                            .limit(limit)
                            
  return users
}

export const count = () => {
  const countInfo = AgendaModel.countDocuments()
  return  countInfo
}

export class Agenda {
  constructor(user,body) {
    this.body = body;
    this.user = user
};

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

  cadAgenda() {
    this.body.id_user = this.user;
    const registro = AgendaModel.create(this.body);
    return registro;
};

/*remove cadastro do banco de dados */
  removeCad(){
    const registro = AgendaModel.findOneAndDelete({_id: this.body})

    return registro
  }

};
