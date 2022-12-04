const { Agenda } = require('../model/agendaModel');

const agenda = (req, res) => {
  res.render('contato', {
    erro: req.flash('erro'),
    sucesso: req.flash('sucesso'),
    title: 'Agenda',
  })
};

const criaAgenda = async (req, res) => {
  try{
    const cadastro = new Agenda(req.session.passport.user,req.body)
    await cadastro.registerAgenda()

    req.flash('sucesso', 'Cadastrado com sucesso')
    res.redirect('/agenda')
  }catch(err){
    res.status(500).send({message: err.message})
  }
};

const atualiza = async (req, res) => {
  try{
    const agenda = new Agenda(req.session.passport.user, req.params.id)
    const result = await agenda.atualizaAgend()
    data = result[0]
      res.render('atualiza', 
      {
        erro: req.flash('erro'),
        sucesso: req.flash('sucesso'),
        title: 'Atualiza Agenda',
        id: data._id,
        diaSemana: data.diaSemana,
        horaIni: data.horaIni,
        horaFim: data.horaFim,
        conteudo: data.conteudo
      })
  }catch(err){
    res.status(500).send({message: err.message})
  }
}

const returnAgendaAt = async(req, res) => {
  try{
    req.body.idUser = req.params.id
    const agenda = new Agenda(req.session.passport.user, req.body)
    await agenda.atualizar()
    
    req.flash('sucesso', 'Cadastro atualizado com sucesso.')
    res.redirect(`/atualizar/${req.params.id}`)
  }catch(err){
      res.status(500).send({message: err.message})
  }
}

const remove = async(req, res) => {
  try{
    const agenda = new Agenda(req.session.passport.user, req.params.id)
    let result = await agenda.atualizaAgend()
    result = result[0];
      res.render('remove', 
      {
        title: 'Remove',
        id: req.params.id,
        diaSemana: result.diaSemana,
        horaIni: result.horaIni,
        horaFim: result.horaFim,
        conteudo: result.conteudo 
      })
  }catch(err){
    res.status(500).send({message: err.message})
  }
}

const removeCad = async(req, res) => {
  try{
    const agenda = new Agenda(req.session.passport.user, req.params.id)
    await agenda.removeCad()

    res.redirect(`/`)
  }catch(err){
    res.status(500).send({message: err.message})
}
}


module.exports = {
  agenda,
  criaAgenda,
  atualiza,
  returnAgendaAt,
  remove,
  removeCad
};
