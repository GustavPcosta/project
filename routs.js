const express = require('express');
const routes = express();
const {deleteUsuario,atualizarUsuario,registrarUsuario,obterUmUsuario, todosUsuarios } = require ('./controllers/usuarios');
const {registrarProdutos,listarProdutos,produtoUnico,atualizarProduto,deletarProduto} = require ('./controllers/produtos');
const { validandoLogin } = require('./filters/verificarLogin');
const token = require('./controllers/token');
const login = require ('./filters/verificarLogin');

routes.post('/token',token);
routes.use(validandoLogin);


routes.delete('/delete-produto/:id',deletarProduto);
routes.post('/produtos',registrarProdutos);
routes.get('/produtos',listarProdutos);
routes.get('produtos/:id',produtoUnico);
routes.put('/produtos/:id',atualizarProduto);



routes.delete('/usuario/:id',deleteUsuario);
routes.put('/usuario/:id',atualizarUsuario);
routes.post('/usuario',registrarUsuario);
routes.get('/usuario/:id',obterUmUsuario);
routes.get('/usuario',todosUsuarios);


module.exports = routes;