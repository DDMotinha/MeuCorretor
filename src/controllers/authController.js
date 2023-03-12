const authService = require('../services/authService');

/**
 * Controlador para a rota de login.
 * 
 * @param {*} req Requisição HTTP
 * @param {*} res Resposta HTTP
 * @param {*} next Função para passar para o próximo middleware
 */
async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    // Verifica se o email e senha foram informados
    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    // Chama o serviço de autenticação para verificar as credenciais
    const token = await authService.authenticate(email, senha);

    // Retorna o token de autenticação
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login
};