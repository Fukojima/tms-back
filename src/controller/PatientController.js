const Patient = require('../models/patient')
const { cpfIsValid } = require('../utils/commons')

module.exports = {
    async create(req, res) {
        try {
            const body = req.body
            let patientCpf = body.physic_national

            if (patientCpf) {
                if (!cpfIsValid(patientCpf)) {
                    return res.status(400).json({ message: 'Número de CPF inválido.' })
                }
            }

            const patient = await Patient.create(body)
            return res.status(201).json(patient)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao criar Paciente.' })
        }
    },

    async update(req, res) {
        try {
            const { id } = req.body._id
            const body = req.body
            const patient = await Patient.findByIdAndUpdate(id, body, { new: true })

            if (!patient.body) {
                return res
                    .status(400)
                    .json({ error: 'Necessário passar os campos com as informações a serem atualizadas.' })
            }

            if (patient.body) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({ error: 'Paciente não encontrado.' })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar Paciente.' })
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params
            const patient = await Patient.findByIdAndDelete(id)

            if (patient) {
                return res.status(204).json({})
            } else {
                return res.status(404).json({ error: 'Paciente não encontrado.' })
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
            const { id } = req.params
            const patient = await Patient.findById(id)
            if (patient) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({ error: 'Paciente não existe' })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o Paciente.' })
        }
    },
}
