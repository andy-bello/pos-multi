import { useState } from 'react';

export default function StockAdjustForm({ producto, onSave, onCancel }) {
  const [cantidad, setCantidad] = useState(0);
  const [tipo, setTipo] = useState('entrada');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSave({ cantidad: Number(cantidad), tipo });
    } catch (err) {
      setError(err.message || 'Error al ajustar stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="block mb-1 font-bold">Tipo de movimiento</label>
        <select className="w-full p-2 border rounded" value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-bold">Cantidad</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          min={1}
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        {onCancel && (
          <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
