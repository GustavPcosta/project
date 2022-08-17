const yup = require('./validate')

const schemaProdutos = yup.object().shape({
    name: yup.string().required(),
    estoque: yup.string().required(),
    categoria:yup.string().required(),
    preco: yup.string().required(),
    descricao: yup.string().required(),
    image: yup.string().required()
});

module.exports = schemaProdutos;