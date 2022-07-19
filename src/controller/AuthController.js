const sanitize = require('mongo-sanitize')
const jwt = require('../utils/jwt')
const Users = require('../models/users')

module.exports = {
    async login(req, res) {
        try {
            const body = req.body
            const filter = { email: sanitize(body.email), password: sanitize(body.password) }
            const user = await Users.findOne(filter)
            if (user) {
                const result = {
                    ...user._doc,
                    token: await jwt.generateTokenPayload({ _id: String(user._id) }),
                }
                return res.status(200).json(result)
            } else {
                return res.status(500).json({ error: 'Usuário ou senha errada.' })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao fazer login.' })
        }
    },
}
