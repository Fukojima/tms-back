const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    service: {
        type:string,
    },
    qtd: {
        type:number,
    },
})

module.exports = mongoose.model('details', DetailsSchema)
