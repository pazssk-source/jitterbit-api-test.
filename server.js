// Importa a biblioteca Express, responsável por criar o servidor da API
const express = require('express');

// Importa a configuração do banco de dados
// Esse arquivo realiza a conexão com o PostgreSQL usando Sequelize
require('./database');

// Importa o arquivo de rotas da aplicação
// Nele estão definidas as rotas da API (como POST /order)
const routes = require('./routes');

// Cria a aplicação utilizando o Express
// Essa variável representa o servidor da API
const app = express();

// Permite que o servidor receba dados no formato JSON nas requisições
// Isso é necessário para ler o corpo (body) das requisições POST
app.use(express.json());

// Registra as rotas da aplicação
// Todas as rotas definidas em routes.js passam a funcionar aqui
app.use(routes);

// Inicia o servidor na porta 3000
// Quando o servidor iniciar corretamente, exibirá uma mensagem no terminal
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});