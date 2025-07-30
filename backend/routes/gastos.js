const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los gastos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, categoria, subcategoria, descripcion, monto, fecha FROM gastos ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

// Crear gasto
router.post('/', async (req, res) => {
  const { categoria, subcategoria, descripcion, monto, fecha } = req.body;
  try {
    await pool.query(
      'INSERT INTO gastos (categoria, subcategoria, descripcion, monto, fecha) VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))',
      [categoria, subcategoria, descripcion, monto, fecha]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear gasto' });
  }
});

module.exports = router;
