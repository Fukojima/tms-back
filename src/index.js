const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const routes = require('./routes')
require('dotenv').config()

const app = express()
db.connect()

let corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, token, Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json())
app.use(bodyParser.json())
app.use('/api', routes)

app.all('*', (req, res, next) => {
    return res.status(404).json({
        erro: {
            message: 'Rota não encontrada.',
        },
    })
})

app.use((erro, req, res, next) => {
    return res.status(erro.status || 500).json({
        erro: {
            message: 'Erro interno do Servidor.',
        },
    })
})

app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
    console.log(`Aplicação inicializada. Porta utilizada ${process.env.PORT || 3333}`)
})
