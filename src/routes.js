const { Router } = require('express')

const PatientController = require('./controller/PatientController')
const ProgramController = require('./controller/ProgramController')
const AttendanceController = require('./controller/AttendanceController')
const UsersController = require('./controller/UsersController')
const AuthController = require('./controller/AuthController')
const HistoryController = require('./controller/HistoryController')
const Auth = require('./middlewares/auth')
const AdmeasurementController = require('./controller/AdmeasurementController')
const routes = Router()

//Rotas de Atendimento
routes.post('/details', AttendanceController.createDetails)
routes.get('/details/:month', AttendanceController.showByMonth)
routes.post('/attendances', AttendanceController.createAttendance)
routes.get('/attendances', AttendanceController.showAttendance)

//Rotas de Paciente
routes.post('/patients', PatientController.create)
routes.get('/patients/:id', PatientController.getById)
routes.put('/patients/:id', PatientController.update)
routes.delete('/patients/:id', PatientController.delete)

//Rotas de Programa
routes.post('/programs', ProgramController.create)
routes.get('/programs/:id', ProgramController.getById)
routes.put('/programs/:id', ProgramController.update)
routes.delete('/programs/:id', ProgramController.delete)

//Rotas de Usuários
routes.post('/users', UsersController.create)
routes.get('/users/:id', UsersController.getById)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

routes.post('/history', HistoryController.create)
routes.get('/history', HistoryController.show)
//Rotas de Autenticação
routes.post('/login', AuthController.login)

//Rotas de Aferição
routes.post('/admeasurements', AdmeasurementController.create)
routes.get('/admeasurements/:id', AdmeasurementController.getById)
routes.put('/admeasurements/:id', AdmeasurementController.update)

module.exports = routes
