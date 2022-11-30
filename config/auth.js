const LocalStrategy = require('passport-local').Strategy
const bycript = require('bcryptjs')
const { CadModel } = require('../src/model/cadastroUsuariosModel')

module.exports = function(passport){

    passport.use(new LocalStrategy({usernameField: 'emailUser', passwordField: 'passwordUser'}, 
    (email, senha, done)=>{
        //buscando o dado dentro do banco com base no que foi digitado pelo usuário
        CadModel.findOne({emailUser: email}).then(usuario => {
            if(!usuario) {
                return done(null, false, {message: 'E-mail incorreto'})
            }

            //comparação de senha
            bycript.compare(senha, usuario.passwordUser, (err, bate) =>{
                if(bate){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    //setando uma seção para esse usuario
    passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    })

    //tirando a seção do usuário
    passport.deserializeUser((id, done)=>{
        CadModel.findById(id, (err, usuario)=>{
            done(err, usuario)
        })
    })
}