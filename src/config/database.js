// Importa o módulo mysql2
const mysql = require('mysql2');

// Importa o módulo dotenv para carregar variáveis de ambiente de um arquivo .env
require('dotenv').config();

// Função que cria a conexão com o banco de dados
function createPool(database) {
  // Variável que guarda a configuração da conexão com o banco de dados
  let poolConfig = {};

  // Verifica se o ambiente é de produção
  if (process.env.NODE_ENV === 'production') {
    // Configuração da conexão para ambiente de produção
    poolConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
  } else {
    // Configuração da conexão para ambiente local
    poolConfig = {
      host: 'localhost',
      user: 'root',
      password: '',
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
  }

  // Cria a pool de conexões com base na configuração definida acima
  const pool = mysql.createPool(poolConfig);

  // Retorna a pool de conexões criada
  return pool;
}

// Exporta a função createPool para que possa ser usada em outros arquivos
module.exports = createPool;
