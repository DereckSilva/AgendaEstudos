const { Agenda } = require('../model/agendaModel')
const { Cadastro } = require('../model/cadastroUsuariosModel')

const homeUser = async (req, res) => {
    const agenda = new Agenda(req.session.passport.user, req.body);
    const cadastro = new Cadastro(req.session.passport.user)
    const dias = await agenda.buscaAll()
    const user = await cadastro.buscaUser()

    /*organizando informações */
    const diasOrg = new Set()
    ajusta(dias, diasOrg)
    const valoresAle = new Set()
    if(req.session.valoresAle != undefined) ajusta(req.session.valoresAle, valoresAle)
    data = req.session.valoresAle != undefined ? valoresAle : diasOrg

    res.render('home', {title: 'Home', valores: data, diass: diasOrg, user: user});
}

const ajusta = (oldArray, newArray) => {
        ajustaArray(newArray, oldArray, 'segunda') 
        ajustaArray(newArray, oldArray, 'terça') 
        ajustaArray(newArray, oldArray, 'quarta') 
        ajustaArray(newArray, oldArray, 'quinta') 
        ajustaArray(newArray, oldArray, 'sexta') 
}

const ajustaArray = (newArray, oldArray, descSem) =>{
    oldArray.forEach((element) => {
        if(element.diaSemana == descSem) newArray.add(element)
    })
}

const filtro = async (req, res) => {

    const agenda = new Agenda(req.session.passport.user, req.query['diaSemana']);
    const dias =  await agenda.buscaFilter()
    req.session.valoresAle = dias
    console.log(req.session.valoresAle)
    res.redirect('back')
}

const logout = (req, res) => {
    req.logout((err) => {
        if(err) return console.log('Erro ' + err);

        res.redirect('/login');
    });
};

module.exports = {
    homeUser,
    logout,
    filtro
};