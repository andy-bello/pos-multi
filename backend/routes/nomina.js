const express = require('express');
const router = express.Router();
const pool = require('../db');

// Empleados
router.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

router.post('/empleados', async (req, res) => {
  const { nombre, puesto, salario } = req.body;
  try {
    await pool.query(
      'INSERT INTO empleados (nombre, puesto, salario) VALUES ($1, $2, $3)',
      [nombre, puesto, salario]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear empleado' });
  }
});

router.put('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, puesto, salario } = req.body;
  try {
    await pool.query(
      'UPDATE empleados SET nombre=$1, puesto=$2, salario=$3 WHERE id=$4',
      [nombre, puesto, salario, id]
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
});

router.delete('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM empleados WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});

// Pagos de nómina
router.get('/pagos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pagos_nomina ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
});

router.post('/pagos', async (req, res) => {
  const { empleado_id, monto, fecha } = req.body;
  try {
    await pool.query(
      'INSERT INTO pagos_nomina (empleado_id, monto, fecha) VALUES ($1, $2, $3)',
      [empleado_id, monto, fecha]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar pago' });
  }
});

module.exports = router;
