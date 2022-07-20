const sanitize = require('mongo-sanitize')
const jwt = require('../utils/jwt')

const Users = require('../models/users') // model generico do mongoDB para usuarios

module.exports = {
    async login(req, res) {
        try {
            const body = req.body
            const filter = {email: sanitize(body.email), password: sanitize(body.password)} //filtro dos valores da requisição
            const user = await Users.findOne(filter)// consulta se existe usuario que está tentando login
            if (user) {
                const result = {
                    ...user._doc,
                    token: await jwt.generateTokenPayload({_id: String(user._id)}), // gerando o token
                }
                return res.status(200).json(result)
            } else {
                return res.status(500).json({
                    error: {
                        message: 'Usuário ou senha errada.',
                        error: 'Não foi possível validar o usuário.',
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao fazer login.',
                    error: error.message,
                },
            })
        }
    },
}
