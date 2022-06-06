const Patient = require('../models/patient')
const Details = require('../models/details')
module.exports = {
    async createDetails(req, res) {
        try {
            const body = req.body

            const patient = await Details.create(body)
            return res.status(201).json({message:'Registro efetuado com sucesso!' })
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao criar Paciente.',
                    error: error.message,
                },
            })
        }
    },

    async update(req, res) {
        try {
            const {id} = req.body._id
            const body = req.body
            const patient = await Patient.findByIdAndUpdate(id, body, {new: true})

            if (!patient.body) {
                return res.status(400).json({
                    error: {
                        message: 'Necessário passar os campos com as informações a serem atualizadas.',
                    },
                })
            }

            if (patient.body) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({
                    error: {
                        message: 'Paciente não encontrado.',
                        error: `Não foi possivel encontrar o Paciente com o id ${id}.`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao atualizar Paciente.',
                    error: error.message,
                },
            })
        }
    },

    async delete(req, res) {
        try {
            const {id} = req.params
            const patient = await Patient.findByIdAndDelete(id)
            if (patient) {
                return res.status(204).json({})
            } else {
                return res.status(404).json({
                    error: {
                        message: 'Paciente não encontrado.',
                        error: `Não foi possivel encontrar o Paciente com o id ${id}.`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao deletar o Paciente.',
                    error: error.message,
                },
            })
        }
    },

    async getById(req, res) {
        try {
            const {id} = req.params
            const patient = await Patient.findById(id)
            if (patient) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({
                    error: {
                        messege: 'Paciente não existe',
                        error: `Não foi possivel encontrar o Paciente com o id ${id}`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao deletar o Paciente.',
                    error: error.message,
                },
            })
        }
    },
}
