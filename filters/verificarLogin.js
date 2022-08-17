const knex = require('../connection/connection');
const jwt = require('jsonwebtoken');


const validandoLogin = async(req,res,next) =>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json('Não autorizado');

    try {
        const token = authorization.replace(`Bearer`,'');
        const {id} = jwt.verify(token,process.env.DB_SENHA);
        const verificarUsuario = await knex('usuario').where({id}).first();
        if(!verificarUsuario) return res.status(404).json('Usuário não encontrado');

        const {password, ...user} = verificarUsuario;
        req.user = user
            
        next()
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    validandoLogin
}   
