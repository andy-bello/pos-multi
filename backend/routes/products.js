const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

// Middleware de autenticación (ejemplo básico)
function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const payload = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Listar productos
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar producto
router.post('/', auth, async (req, res) => {
  const { nombre, categoria, precio, stock, imagen } = req.body;
  try {
    const result = await pool.query('INSERT INTO productos (nombre, categoria, precio, stock, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, categoria, precio, stock, imagen]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Editar producto
router.put('/:id', auth, async (req, res) => {
  const { nombre, categoria, precio, stock, imagen } = req.body;
  try {
    const result = await pool.query('UPDATE productos SET nombre=$1, categoria=$2, precio=$3, stock=$4, imagen=$5 WHERE id=$6 RETURNING *', [nombre, categoria, precio, stock, imagen, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

// Eliminar producto
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
