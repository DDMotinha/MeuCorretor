// Importa o express e cria uma instância do Router
const express = require('express');
const router = express.Router();

// Importa o controller de usuário
const userController = require('../controllers/userController');

// Importa o middleware de autenticação
const authenticate = require('../middlewares/authenticate');

// Rota para criar um usuário
router.post('/users', userController.create);

// Rota para buscar um usuário por ID (somente para usuários autenticados)
router.get('/users/:id', authenticate, userController.findById);

// Rota para buscar todos os usuários (somente para usuários autenticados)
router.get('/users', authenticate, userController.findAll);

// Rota para atualizar um usuário (somente para usuários autenticados)
router.put('/users/:id', authenticate, userController.update);

// Rota para remover um usuário (somente para usuários autenticados)
router.delete('/users/:id', authenticate, userController.remove);

// Exporta as rotas de usuário
module.exports = router;