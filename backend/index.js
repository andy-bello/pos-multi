// Servidor Express principal para POS Multiandamios
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

const ventasRoutes = require('./routes/ventas');
const proveedoresRoutes = require('./routes/proveedores');
const cajaRoutes = require('./routes/caja');
const nominaRoutes = require('./routes/nomina');
const gastosRoutes = require('./routes/gastos');
const facturasRoutes = require('./routes/facturas');
const calendarioRoutes = require('./routes/calendario');
const configuracionRoutes = require('./routes/configuracion');
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/caja', cajaRoutes);
app.use('/api/nomina', nominaRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/calendario', calendarioRoutes);
app.use('/api/configuracion', configuracionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend POS Multiandamios funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
// Archivo vacío
