const knex = require('../connection/connection');
const {encryptPassword} = require('../utils/bcrypt');
const schemaUsuario = require('../middlewares/validateUsuario');

const registrarUsuario = async(req,res) =>{
    const {nome,email,password} = req.body;

    try {
        await schemaUsuario.validate(req.body);
    const verificarEmail = await knex('usuarios').where({email}).first();
    if(verificarEmail){
        return res.status(400).json({mensagem:"Email existente"});
    }
    if(password.length < 5){
        return res.status(400).json({mensagem:"A mensagem precisa possuir mais que 5 caracteres"});
    }
    const passwordCrypt = await encryptPassword(password);
    const newUsuario = await knex('usuario').insert({
        nome,
        password:passwordCrypt,
        email
    }).returning("*");
    if(!newUsuario){
        return res.status(400).json({mensagem:"Não foi possível cadastrar o usuário"});
    }
    return res.status (201).json({mensagem:"Usuário cadastrado com sucesso"})
} catch (error) {
    return res.status(500).json(error.message)

    }
}
const atualizarUsuario = async(req,res) =>{
    const {id} = req.params;
    const {nome,email,password} = req.body;

    try {
        await schemaUsuario.validate(req.body);
        const verificarEmail = await knex('usuario').where({email}).first();
        if(verificarEmail){
            return res.status(400).json({mensagem:"O email já existe"});
        }
        if(password.length < 5){
            return res.status(400).json({mensagem:"A senha precisa possuir mais que 5 caracteres"});
        }
        const ecryptPassword = await encryptPassword(password);
        const atualizar = await knex('usuario').update({nome,email,password:ecryptPassword}).where({id});
        if(!atualizar){
            return res.status(404).json({mensagem:"O usuário não foi encontrado"});
        }
        return res.status(200).json({mensagem:"O usuário foi atualizado com sucesso"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const deleteUsuario = async(req,res)=>{
    const {id} = req.params;

    try {
        const usuario = await knex('usuario').where({id}).first();
        if(!usuario){
            return res.status(404).json({mensagem:"O usuário não foi encontrado"});
        }
        const deleteUsuario = await knex('usuario').delete().where({id});
        if(!deleteUsuario){
            return res.status(400).json({mensagem:"Não foi possível deletar o usuário"});   
        }
        return res.status(200).json({mensagem:"Usuário deletado com sucesso"})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const obterUmUsuario = async(req,res) =>{
    const {id} = req.user;

    try {
        const obterUser = await knex('usuarios').where({id}).first()
        if(!obterUser){
            return res.status(404).json({mensagem:"Usuário não encontrado"}); 
        }
        const {password,...user} = getUser;
            
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
const todosUsuarios = async(req,res) => {
    try {
        const todosUsuarios = await knex('usuarios');
        if(!todosUsuarios){
            return res.status(404).json({mensagem:"Produto não encontrado"});
        }
        return res.status(200).json(todosUsuarios)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



module.exports ={
    registrarUsuario,
    atualizarUsuario,
    deleteUsuario,
    obterUmUsuario,
    todosUsuarios
}

    