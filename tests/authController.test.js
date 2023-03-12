const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const { createUser, deleteUser } = require('../services/userService');
const { createToken } = require('../services/authService');

describe('Authentication', () => {
  describe('POST /api/login', () => {
    let user;

    beforeEach(async () => {
      // Cria um usuário para ser utilizado nos testes
      const password = await bcrypt.hash('123456', 10);
      user = await createUser({
        name: 'Test User',
        email: 'testuser@test.com',
        password,
      });
    });

    afterEach(async () => {
      // Deleta o usuário criado nos testes
      await deleteUser(user.id);
    });

    it('should return status 200 and token when credentials are correct', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'testuser@test.com', password: '123456' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');

      const tokenPayload = await createToken(res.body.token);
      expect(tokenPayload).toHaveProperty('userId', user.id);
    });

    it('should return status 401 when email is incorrect', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'wrongemail@test.com', password: '123456' });

      expect(res.statusCode).toEqual(401);
    });

    it('should return status 401 when password is incorrect', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'testuser@test.com', password: 'wrongpassword' });

      expect(res.statusCode).toEqual(401);
    });
  });
});