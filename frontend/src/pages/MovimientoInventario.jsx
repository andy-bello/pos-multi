import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovimientoInventario() {
  const [productoId, setProductoId] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/inventario/movimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productoId, tipo, cantidad, motivo })
      });
      if (!res.ok) throw new Error('Error al registrar movimiento');
      setMsg('Movimiento registrado');
      setTimeout(() => navigate('/inventario'), 1000);
    } catch (err) {
      setError(err.message || 'Error al registrar movimiento');
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#22223B]">Registrar Movimiento de Inventario</h2>
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID de Producto</label>
          <input value={productoId} onChange={e => setProductoId(e.target.value)} required className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Movimiento</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)} className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full">
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cantidad</label>
          <input type="number" min="1" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} required className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motivo</label>
          <input value={motivo} onChange={e => setMotivo(e.target.value)} className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" />
        </div>
        <button type="submit" className="bg-[#FEFF37] text-[#22223B] px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#F7F8AA] transition outline-none focus:outline-none">Registrar</button>
        <button type="button" className="text-sm text-gray-600 underline mt-2" onClick={() => navigate('/inventario')}>Cancelar</button>
      </form>
    </div>
  );
}
