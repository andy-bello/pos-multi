
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockAdjustForm from '../components/StockAdjustForm';

export default function Inventario() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [productoSel, setProductoSel] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProductos(data);
        setError('');
      } else {
        setProductos([]);
        setError(data.message || 'No autorizado. Inicia sesión.');
      }
    } catch {
      setError('Error al cargar productos');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Cálculos para tarjetas resumen
  const totalProductos = productos.length;
  const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  const stockBajo = productos.filter(p => p.stock <= 5 && p.stock > 0).length;
  const sinStock = productos.filter(p => p.stock === 0).length;

  // Placeholder para historial de movimientos
  const movimientos = [];

  const handleAjuste = async ({ cantidad, tipo }) => {
    setMsg('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const nuevoStock = tipo === 'entrada'
        ? productoSel.stock + cantidad
        : productoSel.stock - cantidad;
      if (nuevoStock < 0) throw new Error('Stock insuficiente');
      const res = await fetch(`http://localhost:5000/api/products/${productoSel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...productoSel, stock: nuevoStock })
      });
      if (!res.ok) throw new Error('Error al ajustar stock');
      setShowForm(false);
      setProductoSel(null);
      setMsg('Stock actualizado');
      fetchProductos();
    } catch (err) {
      setError(err.message || 'Error al ajustar stock');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Inventario</h2>
        <div className="space-x-2">
          <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-50" onClick={() => {/* TODO: implementar exportación real */ window.print();}}>Exportar Inventario</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700" onClick={() => navigate('/inventario/movimiento')}>+ Registrar Movimiento</button>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center border-t-4 border-blue-500">
          <div className="text-2xl font-bold">{totalProductos}</div>
          <div className="text-gray-500">Productos registrados</div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center border-t-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">${valorTotal.toFixed(2)}</div>
          <div className="text-gray-500">Valor en almacén</div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center border-t-4 border-orange-400">
          <div className="text-2xl font-bold text-orange-500">{stockBajo}</div>
          <div className="text-gray-500">Necesitan reposición</div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center border-t-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{sinStock}</div>
          <div className="text-gray-500">Agotados</div>
        </div>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {msg && <div className="text-green-600 mb-4">{msg}</div>}
      {showForm && productoSel && (
        <div className="mb-6">
          <StockAdjustForm
            producto={productoSel}
            onSave={handleAjuste}
            onCancel={() => { setShowForm(false); setProductoSel(null); }}
          />
        </div>
      )}

      {/* Tabla de productos */}
      <div className="bg-white rounded shadow mb-8 overflow-x-auto">
        <h3 className="text-lg font-bold p-4">Inventario de Productos</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Stock Actual</th>
              <th className="px-4 py-2">Precio Unitario</th>
              <th className="px-4 py-2">Valor en Stock</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4H8V3" /></svg>
                    No hay datos
                  </div>
                </td>
              </tr>
            ) : (
              productos.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    {p.imagen ? <img src={p.imagen} alt="img" className="h-10 w-10 object-cover rounded" /> : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.nombre}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">${p.precio}</td>
                  <td className="px-4 py-2">${(p.precio * p.stock).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {p.stock === 0 ? <span className="text-red-600 font-bold">Agotado</span> : p.stock <= 5 ? <span className="text-orange-500 font-bold">Bajo</span> : <span className="text-green-600 font-bold">OK</span>}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => { setProductoSel(p); setShowForm(true); }}>
                      Ajustar stock
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Historial de movimientos */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <h3 className="text-lg font-bold p-4">Historial de Movimientos de Inventario</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4H8V3" /></svg>
                    No hay datos
                  </div>
                </td>
              </tr>
            ) : (
              movimientos.map((m, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{m.producto}</td>
                  <td className="px-4 py-2">{m.tipo}</td>
                  <td className="px-4 py-2">{m.cantidad}</td>
                  <td className="px-4 py-2">{m.fecha}</td>
                  <td className="px-4 py-2">{m.motivo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
