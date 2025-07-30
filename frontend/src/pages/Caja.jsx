
import { useState } from 'react';

export default function Caja() {
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  // Simulación de datos (puedes conectar a tu backend real)
  const ingresos = 0;
  const egresos = 0;
  const saldo = 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await fetch('/api/caja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, descripcion, monto })
      });
      if (!res.ok) throw new Error('Error al guardar movimiento');
      setMsg('Movimiento registrado');
      setTimeout(() => setShowForm(false), 1000);
    } catch {
      setError('No se pudo guardar el movimiento.');
    }
  };

  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#000000]">Caja</h2>
        <button className="bg-[#FEFF37] text-[#000000] px-4 py-2 rounded font-bold shadow hover:bg-[#f7f75a]" style={{border:'none'}} onClick={() => setShowForm(true)}>+ Nuevo Movimiento</button>
      </div>
      {showForm && (
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-xl font-bold mb-2">Nuevo Movimiento</h3>
          {msg && <div className="text-green-600 mb-2">{msg}</div>}
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} className="border rounded px-2 py-1 w-full">
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input value={descripcion} onChange={e => setDescripcion(e.target.value)} required className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monto</label>
              <input type="number" min="0" step="0.01" value={monto} onChange={e => setMonto(e.target.value)} required className="border rounded px-2 py-1 w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">Registrar</button>
            <button type="button" className="text-sm text-gray-600 underline mt-2" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#6FC7BE] text-[#000000] rounded-xl shadow-sm p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Ingresos</div>
          <div className="text-2xl font-bold">${ingresos.toFixed(2)}</div>
        </div>
        <div className="bg-[#6754C4] text-[#FFFFFF] rounded-xl shadow-sm p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Egresos</div>
          <div className="text-2xl font-bold">${egresos.toFixed(2)}</div>
        </div>
        <div className="bg-[#E9ECEF] text-[#22223B] rounded-xl shadow-sm p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Saldo</div>
          <div className="text-2xl font-bold">${saldo.toFixed(2)}</div>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <div className="bg-[#FFFFFF] rounded shadow overflow-x-auto border border-[#000000]">
        <div className="flex items-center justify-between p-4">
          <span className="font-bold text-lg text-[#22223B]">Movimientos de Caja</span>
        </div>
        <table className="min-w-full bg-white rounded-xl shadow-sm">
          <thead>
            <tr className="bg-[#F7F8FA]">
              <th className="px-4 py-2 text-[#22223B] font-medium">Fecha</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Tipo</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Descripción</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center py-8 text-[#548CC4]">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-[#6FC7BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                  No hay movimientos
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}



