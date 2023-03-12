// Importa os módulos express e cors
const express = require('express');
const cors = require('cors');

// Importa as rotas definidas nos arquivos authRoutes e userRoutes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Cria uma instância do aplicativo express
const app = express();

// Define a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;

// Define os middlewares utilizados pelo aplicativo
app.use(cors());
app.use(express.json());

// Define as rotas do aplicativo
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Define o middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;