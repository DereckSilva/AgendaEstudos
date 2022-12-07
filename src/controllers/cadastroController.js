import { Cadastro } from '../model/cadastroUsuariosModel.js'

export const cadastro = (req, res) => {

    res.render('cadastro', {erro: req.flash('erro'), sucesso: req.flash('sucesso'),
    title: 'Cadastro'})
}

export const cadLogin =  async ( req, res) => {
    try{
        const cadastro = new Cadastro(req.body)
        const retorno =  await cadastro.register()// método que será responsável por fazer o registro
        if(cadastro.error.length > 0) {
            req.flash('erro', retorno)
        }else{
            req.flash('sucesso', 'Usuário criado com sucesso')
        }
        await res.redirect('/cadastro')
    }catch(err){
        res.status(500).send({message: err.message})
    }
}  

export const login = async (req, res) => {
    try{
        res.render('login', {erro: res.locals.erro, sucesso: res.locals.sucesso,title: 'Login'})
    }catch(err){
        res.status(500).send({message: err.message})
    }
}
