import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CajaNuevo() {
  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      setTimeout(() => navigate('/caja'), 1000);
    } catch {
      setError('No se pudo guardar el movimiento.');
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Nuevo Movimiento de Caja</h2>
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
        <button type="button" className="text-sm text-gray-600 underline mt-2" onClick={() => navigate('/caja')}>Cancelar</button>
      </form>
    </div>
  );
}
