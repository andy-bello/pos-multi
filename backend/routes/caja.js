const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los movimientos de caja
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM caja ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener movimientos de caja' });
  }
});

// Crear movimiento de caja
router.post('/', async (req, res) => {
  const { tipo, descripcion, monto } = req.body;
  try {
    await pool.query(
      'INSERT INTO caja (tipo, descripcion, monto) VALUES ($1, $2, $3)',
      [tipo, descripcion, monto]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear movimiento de caja' });
  }
});

module.exports = router;
