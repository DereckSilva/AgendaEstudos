const { Agenda } = require('../model/agendaModel')
const { Cadastro } = require('../model/cadastroUsuariosModel')

const homeUser = (req, res) => {
    const agenda = new Agenda(req.session.passport.user, req.body);
    const cadastro = new Cadastro(req.session.passport.user)
    const dias = agenda.buscaAll()
    const user = cadastro.buscaUser()
    dias.then(diasSemana => {
        const diasOrg = new Set()
        ajusta(diasSemana, diasOrg)
        const valoresAle = new Set()
        user.then(nameUser => {
            if(req.session.valoresAle != undefined) ajusta(req.session.valoresAle, valoresAle)
            data = req.session.valoresAle != undefined ? valoresAle : diasOrg
            res.render('home', {title: 'Home', valores: data, diass: diasOrg, user: nameUser});
        })
    })
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

const filtro = (req, res) => {

    const agenda = new Agenda(req.session.passport.user, req.query['diaSemana']);
    const dias = agenda.buscaFilter()
    dias.then(diasSemana =>{
        req.session.valoresAle = diasSemana
        res.redirect('back');
    })
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