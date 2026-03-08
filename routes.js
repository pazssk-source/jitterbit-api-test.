// Importa o Router do Express
const { Router } = require('express');

// Importa o controller responsável por lidar com pedidos
const OrderController = require('./controllers/OrderController');

// Cria uma instância do Router
const routes = Router();

// Define uma rota HTTP do tipo POST para criar um pedido
routes.post('/order', OrderController.store);

// Define uma rota HTTP do tipo GET para listar todos os pedidos
routes.get('/orders', OrderController.index);

// Define uma rota HTTP do tipo GET para buscar um pedido pelo número do pedido
routes.get('/orders/:id', OrderController.show);

// Exporta as rotas para serem usadas no server.js
module.exports = routes;