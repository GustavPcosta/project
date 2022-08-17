const yup = require('./validate');

const schemaUsuario = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

module.exports = schemaUsuario