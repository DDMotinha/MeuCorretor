// Importa o módulo Router do express
const { Router } = require('express');

// Importa o controlador de autenticação
const authController = require('../controllers/authController');

// Cria o objeto router do express
const router = Router();

// Rota para fazer login
router.post('/login', authController.login);

// Rota para fazer logout
router.post('/logout', authController.logout);

// Exporta o objeto router criado
module.exports = router;