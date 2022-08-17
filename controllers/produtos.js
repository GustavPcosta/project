const knex = require('../connection/connection');
const schemaProdutos = require('../middlewares/verifyProdutos');

const registrarProdutos = async(req,res) =>{
    const {name,estoque,usuario_id,categoria,preco,descricao,image} = req.body;
    try {
        await schemaProdutos.validate(req.body);
        const verifyUsers = await knex('produtos').where({usuario_id}).first();
        if(verifyUsers){
            return res.status(400).json({mensagem:"Usuário já cadastrado"}); 
        }
        const newProducts = await knex('produtos').insert({
            name,
            estoque,
            descricao,
            categoria,
            preco,
            image                       
        }).returning('*');
        if(!newProducts){
            return res.status(404).json({mensagem:"O produto não foi encontrado"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const listarProdutos = async (req,res) =>{
    try {
        const listarProdutos = await knex('produtos');
        if(!listarProdutos){
            return res.status(404).json({mensagem:"Produto não encontrado"});
        }
        return res.status(200).json(listarProdutos)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const produtoUnico = async(req,res) =>{
    const {usuario_id} = req.params;

    try {
        const produtoUnitario = await knex('produtos').where({usuario_id}).first();
        if(!produtoUnitario){
            return res.status(404).json({mensagem:"O produto não foi encontrado"});
        }
        return res.status(200).json(produtoUnitario)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const atualizarProduto = async(req,res) =>{
   const  {usuario_id} = req.params;
   const {name,estoque,categoria,preco,descricao,image,} = req.body;
   try {
    await schemaProdutos.validate(req.body);
    const usersVerificar = await knex('produtos').where({usuario_id}).first();
    if(usersVerificar){
        return res.status(400).json({mensagem:"O produto já existe"})
    }
    const atualizar = await knex('produtos').where({usuario_id}).update
    ({
        name,
        estoque,
        categoria,
        preco,
        descricao,
        image
    });
    if(!atualizar){
        return res.status(400).json({mensagem:"Não foi possível atualizar o produto"})
    }
    return res.status(200).json({mensagem:"O produto foi atualizado com sucesso"})
   } catch (error) {
    return res.status(500).json(error.message)
   }
}

const deletarProduto = async(req,res) =>{
    const {usuario_id} = req.params;

    try {
        const produtoD = await knex('produto').where({usuario_id}).first()
        if(!produtoD){
            return res.status(400).json({mensagem:"não foi possível excluir a conta"});
        }
        const deleteProduto = await knex('produto').where({usuario_id}).delete('*');

        if(!deleteProduto){
            return res.status(404).json({mensagem:"O produto não foi encontrado"});
        }
        return res.status(200).json({mensagem:"Cobrança excluída com sucesso"})
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports ={
    registrarProdutos,
    listarProdutos,
    produtoUnico,
    atualizarProduto,
    deletarProduto

}