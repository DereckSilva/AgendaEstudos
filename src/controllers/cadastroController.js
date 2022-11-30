const { Cadastro } = require('../model/cadastroUsuariosModel')

const cadastro = (req, res) => {

    res.render('cadastro', {erro: req.flash('erro'), sucesso: req.flash('sucesso'),
    title: 'Cadastro'})
}

const cadLogin =  async ( req, res) => {
    const cadastro = await new Cadastro(req.body)
    const retorno =  await cadastro.register()// método que será responsável por fazer o registro
    if(cadastro.error.length > 0) {
        req.flash('erro', retorno)
    }else{
        req.flash('sucesso', 'Usuário criado com sucesso')
    }
    await res.redirect('/cadastro')
}  

const login = async (req, res) => {
    res.render('login', {erro: res.locals.erro, sucesso: res.locals.sucesso,title: 'Login'})
}

module.exports = {
    cadastro,
    cadLogin,
    login
}
