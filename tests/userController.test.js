const request = require('supertest');
const app = require('../app');
const { createUser, deleteUser, updateUser } = require('../services/userService');

const newUser = {
  name: 'John Doe',
  email: 'johndoe@test.com',
  password: 'test123'
};

let authToken = '';

beforeAll(async () => {
  // Criando um usuário de teste para poder logar e obter um token válido
  await createUser(newUser);

  // Fazendo login e obtendo o token de autenticação
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: newUser.email, password: newUser.password });
  authToken = response.body.token;
});

afterAll(async () => {
  // Deletando o usuário de teste criado antes de finalizar os testes
  await deleteUser(newUser.email);
});

describe('GET /api/users', () => {
  test('Deve retornar um status 401 se não houver token de autenticação', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(401);
    expect(response.body.message).toBe('Token não fornecido');
  });

  test('Deve retornar uma lista de usuários se o token de autenticação for válido', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /api/users', () => {
  test('Deve criar um novo usuário com sucesso', async () => {
    const newUser = {
      name: 'Maria Silva',
      email: 'mariasilva@test.com',
      password: 'test123'
    };
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test('Deve retornar um status 400 se o email do novo usuário já estiver cadastrado', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400);
    expect(response.body.message).toBe('Email já cadastrado');
  });
});

describe('DELETE /api/users/:email', () => {
  test('Deve deletar um usuário com sucesso', async () => {
    const emailToDelete = 'mariasilva@test.com';
    const response = await request(app)
      .delete(`/api/users/${emailToDelete}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(response.body.message).toBe(`Usuário com email ${emailToDelete} deletado`);
  });

  test('Deve retornar um status 404 se o email do usuário a ser deletado não existir', async () => {
    const emailToDelete = 'naoexiste@test.com';
    const response = await request(app)
      .delete(`/api/users/${emailToDelete}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
    expect(response.body.message).toBe(`Usuário com email ${emailToDelete} não encontrado`);
  });
});