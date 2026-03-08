// Importa a classe Sequelize para criar a conexão com o banco
const { Sequelize } = require('sequelize');

// Importa os models da aplicação
const Order = require('../models/Order');
const Item = require('../models/Item');

// Cria a conexão com o PostgreSQL
const connection = new Sequelize('teste_jitterbit', 'postgres', '61049809', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    // Desabilita colunas automáticas createdAt e updatedAt
    timestamps: false
  },
  logging: false
});

// Inicializa os models na conexão
Order.init(connection);
Item.init(connection);

// Cria os relacionamentos entre os models
Order.associate(connection.models);
Item.associate(connection.models);

// Sincroniza os models com o banco de dados
// Isso cria as tabelas automaticamente caso elas ainda não existam
connection.sync({ alter: true })
  .then(() => {
    console.log('Banco conectado e tabelas criadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco:', error);
  });

// Exporta a conexão para ser usada em outras partes do sistema
module.exports = connection;