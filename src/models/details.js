const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    service: {
        type: String,
    },
    qtd: {
        type:Number,
    },
})

module.exports = mongoose.model('details', DetailsSchema)
