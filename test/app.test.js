const request = require('supertest');
const { app, sumar } = require('../src/app');

describe('API demo-devsec', () => {
  test('sumar() suma dos numeros', () => {
    expect(sumar(2, 3)).toBe(5);
  });

  test('GET / responde con mensaje', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBeDefined();
  });

  test('GET /health responde UP', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('UP');
  });

  test('POST /sumar valida la entrada', async () => {
    const ok = await request(app).post('/sumar').send({ a: 1, b: 2 });
    expect(ok.body.resultado).toBe(3);
    const mal = await request(app).post('/sumar').send({ a: 'x', b: 2 });
    expect(mal.statusCode).toBe(400);
  });
});
