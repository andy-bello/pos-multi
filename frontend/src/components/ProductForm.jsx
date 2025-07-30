import { useState } from 'react';

export default function ProductForm({ onSave, initial, onCancel }) {
  const [form, setForm] = useState(
    initial || { nombre: '', categoria: '', precio: '', stock: '', imagen: '' }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <input className="w-full p-2 border rounded" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input className="w-full p-2 border rounded" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
      <input className="w-full p-2 border rounded" name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={handleChange} required />
      <input className="w-full p-2 border rounded" name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <input className="w-full p-2 border rounded" name="imagen" placeholder="URL de imagen" value={form.imagen} onChange={handleChange} />
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
