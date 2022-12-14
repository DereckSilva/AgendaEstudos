import { check, validationResult } from 'express-validator'
import { CadModel } from '../db/schemaCad.js';
import { AgendaModel } from '../model/agendaModel.js'

/*validação do cadastro */
export const schemaRegister = [
    check("emailUser")
    .custom((email) => {
        //retorna promise, dentro dela fazemos a verificasção do email
        return new Promise((res, rej) =>{
            CadModel.findOne({emailUser: email}).then(user => {
                if(user){
                    //caso encontre usuário
                    rej(new Error('Email já cadastrado'))
                }else{
                    //para quando o email não existe na base
                    res()
                }
            })
        })
    }),
    check("nameUser")
        .isLength({ min: 10})
        .withMessage("Insira o seu nome completo"),
    check("passwordUser")
        .trim()
        .matches(/[A-Z0-9a-z]/gi)
        .withMessage("A senha precisa ter letras maiúsculas, minúsculas e números.")
        .isLength({min:8})
        .withMessage('Sua senha precisa conter mais do que 8 caracteres.'),
    check("confirmPassword")
    //customização para comparar os valores das senhas
    .custom((value, {req}) => {
        if(value != req.body.passwordUser){
            //criamos um erro que será lançado dentro do array de erro
            throw new Error("As senhas não podem ser diferentes.");
        }
        return true
    }),
    check("emailUser")
        .exists()
        .isEmail()
        .withMessage("O e-mail inserido não é válido"),
    
    check("telUser")    
        .matches(/\(\d{2}\)\d{9}/g)
        .withMessage("Número de Telefone inválido"),
    check('cepUser')
        .matches(/\d{5}-\d{3}/g)
        .withMessage('CEP inválido'),
    check("dataNascimento")
        .isDate()
        .withMessage("Data de Nascimento Inválida")
    ]


export const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const [{msg}] = errors.array()
        req.flash('erro', msg) // enviando mensagem de erro
        return res.redirect('back')
    }
    next() 
}

export const agendaEmail = [
    check("diaSemana")
    .custom(({req}) => {
        return new Promise((res, rej) =>{
            AgendaModel.find({id_user: req.session.passport.user }).then(userR => {
                let [user] = userR
                if(user != null && user.horaIni == req.body.horaIni && user.diaSemana == req.body.diaSemana 
                    && user.horaFim == req.body.horaFim){
                    rej(new Error("Dados já cadastrados"))
                }else{
                    res(user)
                }
            })
        })
    })
]

/*validação de criação de agenda */
export const agendaV = [
    check('diaSemana')
        .custom(diaSemana => {
            //verificando se o dia da semana é válido
            const diasValidos = ['segunda', 'terça', 'quarta', 'quinta', 'sexta',
            'segunda-feira', 'terça-feira', 'quarta-feira','quinta-feira', 'sexta-feira']
            if(!diasValidos.includes(diaSemana.toLowerCase())) {
                throw new Error('Dia da Semana Inválido.')
            }
            return true
        }),

    check('horaIni')
        .custom((horaIni, {req}) => {
            if(horaIni > req.body.horaFim){
                throw new Error('Hora Inicial maior que Hora Final.')
            }
            return true
        }),
    check('conteudo')
        .isLength({max: 25})
        .withMessage("O seu conteúdo deve ser menor que 25 caracteres")
]

export const agendaError = (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        const [{msg}] = error.array()
        req.flash('erro', msg)
        return res.redirect('back') 
    }
    next()
}

export const middleware = (req, res, next)=>{
    res.locals.erro = req.flash('error')
    res.locals.user = req.user || null
    next()
}
