const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las facturas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM facturas ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
});

// Crear factura
router.post('/', async (req, res) => {
  const { folio, cliente, total, fecha } = req.body;
  try {
    await pool.query(
      'INSERT INTO facturas (folio, cliente, total, fecha) VALUES ($1, $2, $3, $4)',
      [folio, cliente, total, fecha]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear factura' });
  }
});

module.exports = router;
