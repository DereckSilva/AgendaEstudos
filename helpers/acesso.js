export default {
    acesso:  (req, res, next) => {
        //verificando se está autenticado via passaport
        if(req.isAuthenticated()){
            return next()
        }

        res.redirect('/login')
    }
}