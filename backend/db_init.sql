-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL
);
-- Tabla de configuración
CREATE TABLE IF NOT EXISTS configuracion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  direccion TEXT,
  telefono VARCHAR(30),
  email VARCHAR(100)
);
-- Tabla de calendario
CREATE TABLE IF NOT EXISTS calendario (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL
);
-- Tabla de facturas
CREATE TABLE IF NOT EXISTS facturas (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(50) NOT NULL,
  cliente VARCHAR(100) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  fecha DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS gastos (
  id SERIAL PRIMARY KEY,
  categoria VARCHAR(100),
  subcategoria VARCHAR(100),
  descripcion TEXT NOT NULL,
  monto NUMERIC(12,2) NOT NULL,
  fecha DATE NOT NULL
);
-- Tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  puesto VARCHAR(100),
  salario NUMERIC(12,2) NOT NULL
);

-- Tabla de pagos de nómina
CREATE TABLE IF NOT EXISTS pagos_nomina (
  id SERIAL PRIMARY KEY,
  empleado_id INTEGER REFERENCES empleados(id) ON DELETE CASCADE,
  monto NUMERIC(12,2) NOT NULL,
  fecha DATE NOT NULL
);
-- Tabla de caja
CREATE TABLE IF NOT EXISTS caja (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(10) NOT NULL, -- ingreso o egreso
  descripcion TEXT NOT NULL,
  monto NUMERIC(12,2) NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  precio NUMERIC(12,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  imagen TEXT
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
  id SERIAL PRIMARY KEY,
  productos JSONB NOT NULL, -- [{id, nombre, cantidad, precio}]
  total NUMERIC(12,2) NOT NULL,
  cliente VARCHAR(100),
  fecha TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabla de proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  telefono VARCHAR(30),
  email VARCHAR(100)
);
