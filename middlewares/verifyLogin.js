const yup = require('./validate');

const schemaLogin = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
});

module.exports = schemaLogin