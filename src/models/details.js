const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    month:{
        type:String,
        default:"3"
    },
    services:{
        type:Object
    }
})

module.exports = mongoose.model('details', DetailsSchema)
