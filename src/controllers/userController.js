// Importa o módulo de serviço de usuário
const userService = require('../services/userService');

// Exporta um objeto com os métodos que serão utilizados pelas rotas
module.exports = {
  // Método para criar um novo usuário
  async createUser(req, res, next) {
    try {
      // Extrai as informações do corpo da requisição
      const { email, password, cd_cpf_cnpj, is_cpf, cep, address_number, gender, age, interests } = req.body;

      // Chama o método de criação de usuário do serviço
      const newUser = await userService.createUser({ email, password, cd_cpf_cnpj, is_cpf, cep, address_number, gender, age, interests });

      // Retorna o novo usuário criado
      res.json(newUser);
    } catch (err) {
      // Passa o erro para o middleware de tratamento de erros
      return next(err);
    }
  },

  // Método para atualizar as informações de um usuário
  async updateUser(req, res, next) {
    try {
      // Extrai as informações do corpo da requisição e o ID do usuário
      const { email, cd_cpf_cnpj, is_cpf, cep, address_number, gender, age, interests } = req.body;
      const { userId } = req.params;

      // Chama o método de atualização de usuário do serviço
      const updatedUser = await userService.updateUser(userId, { email, cd_cpf_cnpj, is_cpf, cep, address_number, gender, age, interests });

      // Retorna o usuário atualizado
      res.json(updatedUser);
    } catch (err) {
      // Passa o erro para o middleware de tratamento de erros
      return next(err);
    }
  },

  // Método para deletar um usuário
  async deleteUser(req, res, next) {
    try {
      // Extrai o ID do usuário
      const { userId } = req.params;

      // Chama o método de remoção de usuário do serviço
      await userService.deleteUser(userId);

      // Retorna uma mensagem de sucesso
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      // Passa o erro para o middleware de tratamento de erros
      return next(err);
    }
  }
};