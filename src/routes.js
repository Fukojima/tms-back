const {Router} = require('express')

const PatientController = require('./controller/PatientController')
const ProgramController = require('./controller/ProgramController')
const AttendanceController = require('./controller/AttendanceController')
const UsersController = require('./controller/UsersController')
const AuthController = require('./controller/AuthController')
const Auth = require('./middlewares/auth')
const routes = Router()

//Rotas de Atendimento
routes.post('/details', AttendanceController.createDetails)
routes.get('/details/:month', AttendanceController.showByMonth)
routes.post('/attendance', AttendanceController.createAttendance)
routes.get('/attendance', AttendanceController.showAttendance)

//Rotas de Paciente
routes.post('/patients', Auth.verifyJWT, PatientController.create)
routes.get('/patients/:id', Auth.verifyJWT, PatientController.getById)
routes.put('/patients/:id', Auth.verifyJWT, PatientController.update)
routes.delete('/patients/:id', Auth.verifyJWT, PatientController.delete)

//Rotas de Programa
routes.post('/programs', Auth.verifyJWT, ProgramController.create)
routes.get('/programs/:id', Auth.verifyJWT, ProgramController.getById)
routes.put('/programs/:id', Auth.verifyJWT, ProgramController.update)
routes.delete('/programs/:id', Auth.verifyJWT,ProgramController.delete)

//Rotas de Usuários
routes.post('/users', Auth.verifyJWT, UsersController.create)
routes.get('/users/:id', Auth.verifyJWT, UsersController.getById)
routes.put('/users/:id', Auth.verifyJWT, UsersController.update)
routes.delete('/users/:id', Auth.verifyJWT, UsersController.delete)

//Rotas de Autenticação
routes.post('/login', AuthController.login)

module.exports = routes
