const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// Crear proveedor
router.post('/', async (req, res) => {
  const { nombre, contacto, telefono, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES ($1, $2, $3, $4)',
      [nombre, contacto, telefono, email]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
});

// Actualizar proveedor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email } = req.body;
  try {
    await pool.query(
      'UPDATE proveedores SET nombre=$1, contacto=$2, telefono=$3, email=$4 WHERE id=$5',
      [nombre, contacto, telefono, email, id]
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
});

// Eliminar proveedor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM proveedores WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
});

module.exports = router;
