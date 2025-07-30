const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password, password2 } = req.body;
  if (!nombre || !email || !password || password !== password2) {
    return res.status(400).json({ error: 'Datos inválidos o contraseñas no coinciden' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email', [nombre, email, hashed]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en registro:', err); // Log detallado
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Endpoint temporal para probar la conectividad a la base de datos
router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
    res.status(500).json({ success: false, error: 'Error al conectar con la base de datos' });
  }
});

module.exports = router;
