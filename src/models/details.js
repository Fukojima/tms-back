const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    service: {
        type: String,
    },
    qtd: {
        type:Number,
    },
}, { versionKey: false })

DetailsSchema.set('timestamps', true)

module.exports = mongoose.model('details', DetailsSchema)
