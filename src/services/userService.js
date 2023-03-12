// Importa a conexão com o banco de dados
const db = require('../config/database');

// Importa o módulo de validação
const { validate } = require('../utils/validation');

// Define o serviço para criação de usuário
async function createUser(data) {
  // Verifica se os dados informados são válidos
  const { error } = validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Cria uma conexão com o banco de dados
  const connection = await db.getConnection();

  try {
    // Cria a transação para garantir que todas as operações são executadas ou nenhuma é executada
    await connection.beginTransaction();

    // Insere os dados do usuário na tabela de usuários
    const [results] = await connection.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [data.email, data.password]
    );

    // Insere os dados complementares do usuário na tabela de informações do usuário
    const [infoResults] = await connection.query(
      'INSERT INTO user_info (user_id, cd_cpf_cnpj, is_cpf, cep, residence_number, gender, age, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        results.insertId,
        data.cd_cpf_cnpj,
        data.is_cpf,
        data.cep,
        data.residence_number,
        data.gender,
        data.age,
        JSON.stringify(data.interests)
      ]
    );

    // Commita a transação
    await connection.commit();

    // Retorna os resultados da inserção
    return { id: results.insertId, user_info_id: infoResults.insertId };
  } catch (err) {
    // Se houver algum erro, desfaz a transação e retorna uma mensagem de erro
    await connection.rollback();
    throw new Error('Não foi possível criar o usuário.');
  } finally {
    // Libera a conexão com o banco de dados
    connection.release();
  }
}

// Função que deleta um usuário pelo ID
async function deleteUser(id) {
    try {
      // Executa a query no banco de dados
      const [result] = await pool.promise().query(`DELETE FROM users WHERE id = ?`, [id]);
  
      // Verifica se houve algum registro deletado
      if (result.affectedRows === 0) {
        throw { status: 404, message: 'User not found' };
      }
  
      // Retorna mensagem de sucesso
      return { message: 'User deleted successfully' };
    } catch (error) {
      // Retorna o erro ocorrido
      throw error;
    }
  }
  
  // Função que atualiza um usuário pelo ID
  async function updateUser(id, userData) {
    try {
      // Executa a query no banco de dados
      const [result] = await pool.promise().query(`UPDATE users SET ? WHERE id = ?`, [userData, id]);
  
      // Verifica se houve algum registro atualizado
      if (result.affectedRows === 0) {
        throw { status: 404, message: 'User not found' };
      }
  
      // Retorna mensagem de sucesso
      return { message: 'User updated successfully' };
    } catch (error) {
      // Retorna o erro ocorrido
      throw error;
    }
  }
  
// Exporta o serviço
module.exports = { createUser, updateUser, deleteUser };
