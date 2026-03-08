// Importa Model e DataTypes do Sequelize para definir a estrutura da tabela
const { Model, DataTypes } = require('sequelize');

class Item extends Model {

  // Método responsável por inicializar o model Item
  static init(sequelize) {
    super.init({
      // Chave que relaciona o item ao pedido
      orderId: DataTypes.STRING,

      // ID do produto recebido no item do pedido
      productId: DataTypes.INTEGER,

      // Quantidade do produto
      quantity: DataTypes.INTEGER,

      // Preço unitário do item
      price: DataTypes.FLOAT
    }, {
      sequelize,
      tableName: 'items'
    });
  }

  // Define o relacionamento: muitos itens pertencem a um pedido
  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    });
  }

}

module.exports = Item;