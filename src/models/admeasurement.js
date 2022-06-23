const mongoose = require('mongoose')

const AdmeasurementSchema = new mongoose.Schema({
    idPatient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: [true, 'Id do Paciente deve ser preenchido.'],
        comment: 'Id do Paciente.',

    },
    describe: String,
    value: String
}, { versionKey: false })

AdmeasurementSchema.set('timestamps', true)

module.exports = mongoose.model('admeasurement', AdmeasurementSchema)