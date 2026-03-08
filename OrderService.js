// Importa os modelos que representam as tabelas do banco
const Order = require('../models/Order');
const Item = require('../models/Item');

// Importa a conexão com o banco de dados
const connection = require('../database');

class OrderService {

  // Método responsável por criar um novo pedido no banco
  async createOrder(orderData) {

    // Cria uma transação no banco
    // Isso garante que todas as operações sejam executadas juntas
    const transaction = await connection.transaction();

    try {

      // Validação básica para garantir que os dados do pedido existem
      if (!orderData || !orderData.items || !Array.isArray(orderData.items)) {
        throw new Error('Dados do pedido inválidos');
      }

      // Cria o pedido no banco de dados
      // O include permite salvar também os itens vinculados ao pedido
      const order = await Order.create(orderData, {
        include: [
          { model: Item, as: 'items' }
        ],
        transaction
      });

      // Se tudo deu certo, confirma a transação
      await transaction.commit();

      // Retorna o pedido criado
      return order;

    } catch (error) {

      // Caso ocorra algum erro, desfaz tudo que foi feito no banco
      await transaction.rollback();

      // Lança o erro novamente para ser tratado no controller
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }
  }

  // buscar um pedido pelo id
  async getOrderById(orderId) {

    const order = await Order.findByPk(orderId, {
      include: [{ model: Item, as: 'items' }]
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }

  // listar todos os pedidos
  async listOrders() {

    const orders = await Order.findAll({
      include: [{ model: Item, as: 'items' }]
    });

    return orders;
  }
  
  }
// Exporta o serviço para ser usado no controller
module.exports = new OrderService();