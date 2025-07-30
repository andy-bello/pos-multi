const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');

// Obtener datos de configuración
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM configuracion LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
});

// Actualizar datos de configuración
router.put('/', async (req, res) => {
  const { nombre, direccion, telefono, email } = req.body;
  try {
    const existe = await pool.query('SELECT id FROM configuracion LIMIT 1');
    if (existe.rows.length > 0) {
      await pool.query(
        'UPDATE configuracion SET nombre=$1, direccion=$2, telefono=$3, email=$4 WHERE id=$5',
        [nombre, direccion, telefono, email, existe.rows[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO configuracion (nombre, direccion, telefono, email) VALUES ($1, $2, $3, $4)',
        [nombre, direccion, telefono, email]
      );
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
});

// Cambiar contraseña (requiere tabla usuarios con campo password_hash)
router.put('/password', async (req, res) => {
  const { actual, nueva } = req.body;
  try {
    const user = await pool.query('SELECT * FROM usuarios LIMIT 1');
    if (!user.rows[0]) return res.status(400).json({ error: 'Usuario no encontrado' });
    const match = await bcrypt.compare(actual, user.rows[0].password_hash);
    if (!match) return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    const hash = await bcrypt.hash(nueva, 10);
    await pool.query('UPDATE usuarios SET password_hash=$1 WHERE id=$2', [hash, user.rows[0].id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar contraseña' });
  }
});

module.exports = router;
