const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// Crear cliente Redis
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379
});

app.use(express.json());

// Insertar valor con una clave
app.post('/set', (req, res) => {
  const { key, value } = req.body;
  redisClient.set(key, value, 'EX', 3600); // Expiracion en 1 hora
  res.send('Valor insertado');
});

// Leer valor con una clave
app.get('/get/:key', (req, res) => {
  const { key } = req.params;
  redisClient.get(key, (err, value) => {
    if (err) throw err;
    res.send(value);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
