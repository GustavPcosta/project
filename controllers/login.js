const jwt = require('jsonwebtoken');
const hasPassword = require('../senhaHash');
const knex = require('../../src/connection/connection');
const {comparePassword} = require('../utils/bcrypt');
const login = require('../middlewares/verifyLogin');

const verifyLogin = async (req,res)=>{
    const {email,password} = req.body;

    try {
        await login.validate(req.body);
        const users = await knex('users').where({email}).first();
        if(!users){
            return res.status(400).json({mensagem:"O usuário não foi encontrado"})
        }
        const passwordW = await comparePassword(password,users.password);
        if(!passwordW){
            return res.status(400).json({mensagem:"As senhas não conferem"});
        }
        const token ={
            id:users.id,
            name:users.name
        }
        const tokenTwo = jwt.sign(token,hasPassword,{expiresIn:"1h"});
        const {password:_,...colectionToken} = users;
        return res.status(200).json({
            users:colectionToken,
            tokenTwo
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports ={
    verifyLogin
}