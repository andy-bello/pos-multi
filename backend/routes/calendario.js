const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM calendario ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// Crear evento
router.post('/', async (req, res) => {
  const { titulo, descripcion, fecha } = req.body;
  try {
    await pool.query(
      'INSERT INTO calendario (titulo, descripcion, fecha) VALUES ($1, $2, $3)',
      [titulo, descripcion, fecha]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

module.exports = router;
// Actualizar evento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha } = req.body;
  try {
    await pool.query(
      'UPDATE calendario SET titulo=$1, descripcion=$2, fecha=$3 WHERE id=$4',
      [titulo, descripcion, fecha, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar evento' });
  }
});

// Eliminar evento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM calendario WHERE id=$1', [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
});
