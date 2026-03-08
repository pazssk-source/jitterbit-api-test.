// Importa a camada de serviço responsável por salvar e buscar pedidos
const OrderService = require('../services/OrderService');

class OrderController {

  // Endpoint responsável por criar um novo pedido
  async store(req, res) {
    try {

      // Desestrutura os dados enviados no body da requisição
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      // Validação básica para garantir que os dados obrigatórios existam
      if (!numeroPedido || !valorTotal || !dataCriacao || !items) {
        return res.status(400).json({
          error: "Dados inválidos no corpo da requisição"
        });
      }

      // Realiza o mapeamento dos campos do JSON recebido
      // Convertendo os nomes em português para o formato esperado no banco
      const formattedOrder = {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),

        // Mapeia os itens do pedido
        items: items.map(item => ({
          productId: Number(item.idItem),
          quantity: Number(item.quantidadeItem),
          price: Number(item.valorItem)
        }))
      };

      // Chama a camada de serviço para salvar o pedido no banco de dados
      const order = await OrderService.createOrder(formattedOrder);

      // Retorna sucesso com status HTTP 201
      return res.status(201).json(order);

    } catch (error) {

      // Exibe o erro real no terminal
      console.error("ERRO REAL:", error);

      // Retorna erro para o cliente
      return res.status(400).json({
        error: error.message || "Erro ao processar pedido"
      });
    }
  }

  // Endpoint responsável por buscar um pedido pelo número do pedido
  async show(req, res) {
    try {

      const { id } = req.params;

      const order = await OrderService.getOrderById(id);

      return res.status(200).json(order);

    } catch (error) {

      console.error("ERRO REAL:", error);

      return res.status(404).json({
        error: error.message || "Erro ao buscar pedido"
      });
    }
  }

  // Endpoint responsável por listar todos os pedidos
  async index(req, res) {
    try {

      const orders = await OrderService.listOrders();

      return res.status(200).json(orders);

    } catch (error) {

      console.error("ERRO REAL:", error);

      return res.status(400).json({
        error: error.message || "Erro ao listar pedidos"
      });
    }
  }

}

// Exporta o controller para ser usado nas rotas
module.exports = new OrderController();
