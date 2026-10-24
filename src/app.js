const express = require('express');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

function sumar(a, b) {
  return a + b;
}

app.get('/', (req, res) => {
  res.json({ mensaje: 'API DevSecOps funcionando' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.post('/sumar', (req, res) => {
  const { a, b } = req.body || {};
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a y b deben ser numeros' });
  }
  return res.json({ resultado: sumar(a, b) });
});

module.exports = { app, sumar };
