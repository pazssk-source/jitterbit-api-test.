// Importa Model e DataTypes do Sequelize para definir a estrutura da tabela
const { Model, DataTypes } = require('sequelize');

class Order extends Model {

  // Método responsável por inicializar o model Order
  static init(sequelize) {
    super.init({

      // Identificador principal do pedido
      orderId: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      // Valor total do pedido
      value: DataTypes.DECIMAL,

      // Data de criação do pedido
      creationDate: DataTypes.DATE

    }, {
      sequelize,
      tableName: 'orders'
    });
  }

  // Define o relacionamento: um pedido possui vários itens
  static associate(models) {
    this.hasMany(models.Item, {
      foreignKey: 'orderId',
      as: 'items'
    });
  }

}

module.exports = Order;