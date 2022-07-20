const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    patientId: {
        type: String,
       

    },
    patientName: {
        type: String,

    },
    motherName: {
        type: String,

    },
    gender: {
        type: String,

    },uf: {
        type: String,

    },
    city: {
        type: String,

    },birthDate: {
        type: Date,

    },
    cardId: {
        type: String,

    },
    expireDate: {
        type: Date,

    },
    admeasurements:[],
    exams:[]

})

module.exports = mongoose.model('history', HistorySchema)
