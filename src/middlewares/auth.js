const jwt = require('jsonwebtoken')

module.exports = {
    async verifyJWT(req, res, next) {
        //authorization é o item do header vindo da requisição
        const token = req.headers['authorization']
        if (!token)
            return res.status(401).json({
                auth: false,
                error: {
                    messege: 'Sem autenticação',
                    error: 'Sem autenticação',
                },
            })

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err)
                return res.status(401).json({
                    auth: false,
                    error: {
                        messege: 'Falha na autenticação do token',
                        error: err.message,
                    },
                })
            //decode é o objeto que está dentro do jwt, dentro dela tem o item '_id' no qual eu passo para a proxima requisição utilizando o next();
            const idUser = decoded._id
            req.body._id = idUser
            next()
        })
    },
}
