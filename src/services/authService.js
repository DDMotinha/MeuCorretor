// Importa o módulo jsonwebtoken para criação e verificação de tokens JWT
const jwt = require('jsonwebtoken');

// Importa o módulo bcrypt para criptografia de senhas
const bcrypt = require('bcrypt');

// Importa a pool de conexões com o banco de dados
const pool = require('../config/database')('meu_corretor');

// Função que gera um token JWT
function generateToken(payload) {
  // Gera o token com base no payload informado e na chave secreta definida no arquivo .env
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Retorna o token gerado
  return token;
}

// Função que verifica se a senha informada é válida
async function validatePassword(email, password) {
  try {
    // Realiza a busca do usuário no banco de dados pelo email informado
    const [rows, fields] = await pool.promise().query(`SELECT * FROM users WHERE email='${email}'`);

    // Verifica se o usuário foi encontrado
    if (rows.length === 0) {
      return false;
    }

    // Recupera a senha criptografada do usuário encontrado
    const hashedPassword = rows[0].password;

    // Compara a senha informada com a senha criptografada
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    // Retorna o resultado da comparação de senhas
    return isPasswordValid;
  } catch (error) {
    console.error('Erro ao validar a senha:', error);
    throw new Error('Ocorreu um erro ao validar a senha');
  }
}

// Exporta as funções para que possam ser usadas em outros arquivos
module.exports = {
  generateToken,
  validatePassword,
};