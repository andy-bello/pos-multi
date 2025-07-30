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

// Listar ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ventas ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Registrar nueva venta
router.post('/', async (req, res) => {
  const { productos, total, cliente } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ventas (productos, total, cliente, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [JSON.stringify(productos), total, cliente]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

// Detalle de venta
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ventas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener venta' });
  }
});

module.exports = router;
