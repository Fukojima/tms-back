const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    idAttendance: {
        type: String,
    },
    gender: {
        type: String,
    },
    nmPatient: {
        type: String,
    },
    service: {
        type: String,
    },
    tpAttendance: {
        type: String,
    },
    nmEmployee: {
        type: String,
    },
}, { versionKey: false })

AttendanceSchema.set('timestamps', true)

module.exports = mongoose.model('attendance', AttendanceSchema)
