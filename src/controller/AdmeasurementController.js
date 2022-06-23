const Admeasurement = require('../models/admeasurement')
const Patient = require('../models/patient')

module.exports = {
    async create(req, res) {
        try {
            const body = req.body
            const PatientExist = await Patient.findById(body.idPatient)

            if (!PatientExist) {
                return res.status(400).json({error: 'Id do paciente não existente.'})
            }

            await Admeasurement.create(body)
            return res.json({message: 'Aferição do paciente criada. '})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Erro ao criar Aferição do paciente.'})
        }
    },
    async update(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const admeasurement = await Admeasurement.findByIdAndUpdate(id, body, {new: true})

            return res.json(admeasurement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Erro ao atualizar aferição.'})
        }
    },
    async getById(req, res) {
        try {
            const {id} = req.params
            const patientExists = await Patient.findById({id})
            const admeasurement = await Admeasurement.find(patientExists)

            if (!patientExists) {
                return res.status(404).json({error: 'Usuário não encontrado ou não existe.'})
            }

            return res.status(200).json(admeasurement)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Erro ao requisitar dados ao Banco.'})
        }
    },
}
