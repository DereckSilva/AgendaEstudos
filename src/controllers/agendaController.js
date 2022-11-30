const { Agenda } = require('../model/agendaModel');

const agenda = (req, res) => {
  res.render('contato', {
    erro: req.flash('erro'),
    sucesso: req.flash('sucesso'),
    title: 'Agenda',
  })
};

const criaAgenda = async (req, res) => {
  const cadastro = new Agenda(req.session.passport.user,req.body);
  const resultado = await cadastro.registerAgenda();

  req.flash('sucesso', 'Cadastrado com sucesso');
  res.redirect('/agenda');
};

const atualiza = async (req, res) => {
  const agenda = new Agenda(req.session.passport.user, req.params.id)
  const result = agenda.atualizaAgend()
  result.then(data => {
    data = data[0]
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
  })
}

const returnAgendaAt = async(req, res) => {
  req.body.idUser = req.params.id
  const agenda = new Agenda(req.session.passport.user, req.body)
  const result = agenda.atualizar()
  
  req.flash('sucesso', 'Cadastro atualizado com sucesso.')
  res.redirect(`/atualizar/${req.params.id}`)
}

const remove = async(req, res) => {
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
}

const removeCad = async(req, res) => {
  const agenda = new Agenda(req.session.passport.user, req.params.id)
  const registro = await agenda.removeCad()

  req.flash('sucesso', 'Cadastro removido com sucesso')
  res.redirect(`/`)
}


module.exports = {
  agenda,
  criaAgenda,
  atualiza,
  returnAgendaAt,
  remove,
  removeCad
};
