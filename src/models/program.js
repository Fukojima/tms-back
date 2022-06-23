const mongoose = require('mongoose')

const ProgramSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true,
        comment: 'Campo para indicar se o programa está ativo.',
    },
    name: {
        type: String,
        required: [true, 'O nome do Programa deve ser inserido.'],
        unique: [true, 'O nome desse Programa já está cadastrado.'],
        comment: 'Nome do Programa.',
    },
    describe: {
        type: String,
        required: [true, 'Deve ser adicionada uma descrição para o Programa.'],
        comment: 'Descrição do Programa.',
    },
    age_group: {
        type: Number,
        min: 1,
        max: 200,
        required: [true, 'O campo da Faixa Etária Inicial deve ser preenchido.'],
        comment: 'Campo de Faixa Etária Inicial do programa.',
    },
    date_inative: {
        type: Date,
        comment: 'Campo de data da inativação do cadastro.',
    },
    disabled: {
        type: Boolean,
        default: false,
        comment: 'Campo para confirmar se Programa está desativado.',
    },
}, { versionKey: false })

ProgramSchema.set('timestamps', true)

module.exports = mongoose.model('program', ProgramSchema)
