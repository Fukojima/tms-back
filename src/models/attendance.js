const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    idAttendance:{
        type:String
    },
    gender:{
        type:String
    },
    nmPatient:{
       type:String
    }, service:{
        type:String
    },
    tpAttendance:{
        type:String
    },
    nmEmployee:{
       type:String
    },
})

module.exports = mongoose.model('attendance', AttendanceSchema)
