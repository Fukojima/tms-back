const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O campo Nome de Usuário deve ser preenchido.'],
        comment: 'Campo de nome de usúario.',
    },
    physic_national: {
        type: String,
        required: [true, 'O campo CPF deve ser preenchido.'],
        unique: [true, 'Esse CPF já está cadastrado.'],
        validate: {
            validator: function (v) {
                return /^[0-9]{2,3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/.test(v)
            },
            message: (props) => `${props.value} não é um número de cpf reconhecido.`,
        },
        comment: 'CPF.',
    },
    email: {
        type: String,
        required: [true, 'O e-mail do usuário deve ser preenchido.'],
        unique: [true, 'Esse e-mail já está cadastrado.'],
        comment: 'Campo de e-mail do usuário.',
    },
    password: {
        type: String,
        required: [true, 'O campo da senha deve ser preenchido.'],
        comment: 'Campo de senha do usuário.',
    },
    company: {
        type: String,
        required: [true, 'O nome da Empresa deve ser preenchido.'],
        comment: 'Nome da empresa que o usuário trabalha.',
    },
    active: {
        type: Boolean,
        default: true,
        comment: 'Campo de Status para saber se usuário está ativo.',
    },
    disabled: {
        type: Boolean,
        default: false,
        comment: 'Campo para saber se o usuário foi desativado.',
    },
    grant: {
        type: String,
        enum: {
            values: ['Sem Acesso', 'Somente Leitura', 'Leitura/Escrita', 'Todas as permissões'],
            message: `{VALUE} não é suportado.`,
        },
        comment: 'Campo de permissões de usuário.',
    },
}, { versionKey: false })

UsersSchema.set('timestamps', true)

module.exports = mongoose.model('users', UsersSchema)
