const Users = require('../models/users')
const validator = require('email-validator')
const {cpfIsValid, setEmptyToNull} = require('../utils/commons')

module.exports = {
    async create(req, res) {
        try {
            let body = setEmptyToNull(req.body)
            let usersCpf = body.physic_national
            let emailExists = body.email

            if (emailExists) {
                if (!validator.validate(body.email)) {
                    return res.status(401).json({error: 'E-mail inválido.'})
                }
            } else {
                return res.status(400).json({error: 'E-mail é obrigado para realizar login.'})
            }

            if (usersCpf) {
                if (!cpfIsValid(usersCpf)) {
                    return res.status(400).json({error: 'Número de CPF inválido.'})
                }
            }

            const users = await Users.create(body)
            return res.status(201).json(users)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao criar usuário.'})
        }
    },

    async update(req, res) {
        try {
            const {id} = req.params
            const body = req.body
            const users = await Users.findByIdAndUpdate(id, body, {new: true})

            if (!users.body) {
                return res
                    .status(400)
                    .json({error: 'Necessário passar os campos com as informações a serem atualizadas.'})
            }
            if (users.body) {
                return res.status(200).json(users)
            } else {
                return res.status(404).json({error: 'Usuário não encontrado.'})
            }
        } catch (error) {
            return res.status(500).json({error: 'Erro ao atualizar usuário.'})
        }
    },

    async delete(req, res) {
        try {
            const {id} = req.params
            const users = await Users.findByIdAndDelete(id)
            if (users) {
                return res.status(204).json({
                    message: `Usuário deletado com sucesso ${users.email}`,
                })
            } else {
                return res.status(404).json({error: 'Usuário não encontrado.'})
            }
        } catch (error) {
            return res.status(500).json({error: 'Erro ao deletar o usuário.'})
        }
    },

    async getById(req, res) {
        try {
            const {id} = req.params
            const users = await Users.findById(id, 'name company active grant')
            if (!users) {
                return res.status(404).json({error: 'Usuário não encontrado ou não existe.'})
            }

            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar o usuário.'})
        }
    },
}
