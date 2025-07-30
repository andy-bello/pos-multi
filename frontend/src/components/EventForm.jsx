import { useState, useEffect } from 'react';

export default function EventForm({ onSave, onCancel, evento }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (evento) {
      setTitulo(evento.titulo || '');
      setDescripcion(evento.descripcion || '');
      setFecha(evento.fecha || '');
    } else {
      setTitulo('');
      setDescripcion('');
      setFecha('');
    }
  }, [evento]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !fecha) {
      setError('Título y fecha son obligatorios');
      return;
    }
    setError('');
    await onSave({ titulo, descripcion, fecha });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border-t-4 border-[#FEFF37]" onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-4 text-[#22223B]">{evento ? 'Editar Evento' : 'Nuevo Evento'}</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="block text-[#22223B] font-medium mb-1">Título*</label>
          <input type="text" className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#FEFF37]" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-[#22223B] font-medium mb-1">Descripción</label>
          <textarea className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#FEFF37]" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-[#22223B] font-medium mb-1">Fecha*</label>
          <input type="date" className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#FEFF37]" value={fecha} onChange={e => setFecha(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 rounded bg-gray-200 text-[#22223B] font-semibold hover:bg-gray-300" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-[#FEFF37] text-[#22223B] font-semibold shadow-md hover:bg-[#F7F8AA]">Guardar</button>
        </div>
      </form>
    </div>
  );
}
