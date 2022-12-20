
import { buscaFilter, buscaAll, paginationBd, count } from  '../model/agendaModel.js'
import { buscaUser } from '../model/cadastroUsuariosModel.js'

export const homeUser = async (req, res) => {
    try{
        let { limit, offset } = req.query
        const currentUrl = req.baseUrl != '' ? req.baseUrl : '/'
        
        limit = Number(limit)
        offset = Number(offset)
        
        if(!limit) limit = 5
        if(!offset) offset = 0
        
        const users = await paginationBd(limit, offset)
        const countInfo = await count()
        //console.log(countInfo)
        const next = offset + limit
        const nextUrl = next < countInfo ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        console.log({
            nextUrl: nextUrl,
            previousUrl: previousUrl,
            countInfo: countInfo,
            users
        })

        const dias = await buscaAll(req.session.passport.user)
        const user = await buscaUser(req.session.passport.user)
    
        /*organizando informações */
        const diasOrg = new Set()
        ajusta(dias, diasOrg)
        const valoresAle = new Set()
        if(req.session.valoresAle != undefined) ajusta(req.session.valoresAle, valoresAle)
        
        let data = req.session.valoresAle != undefined ? valoresAle : diasOrg
        res.render('home', {title: 'Home', valores: data, diass: diasOrg, user: user});
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const ajusta = (oldArray, newArray) => {
    const week = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']
    week.forEach((week) => {
        ajustaArray(newArray, oldArray, week)
    })
}

const ajustaArray = (newArray, oldArray, descSem) =>{
    oldArray.forEach((element) => {
        if(element.diaSemana == descSem) newArray.add(element)
    })
}

export const filtro = async (req, res) => {
    try{
        const dias =  await buscaFilter(req.session.passport.user, req.query['diaSemana'])
        req.session.valoresAle = dias
        res.redirect('back')
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const logout = (req, res) => {
    req.logout((err) => {
        if(err) return console.log('Erro ' + err);

        res.redirect('/login');
    });
};