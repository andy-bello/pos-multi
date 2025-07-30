

import { useState, useEffect } from 'react';

const GASTOS_CATEGORIAS = [
  {
    titulo: 'GASTOS FAMILIA',
    subcategorias: [
      'Mercado e insumos',
      'Hijos',
      'Servicios',
      'Gastos varios',
    ],
  },
  {
    titulo: 'OFICINA',
    subcategorias: [
      'Nómina',
      'Gastos oficina',
      'Combustible y peajes',
      'Impuestos: Dian, predial, vehicular',
    ],
  },
  {
    titulo: 'PANAMA',
    subcategorias: [
      'Gastos mantenimiento',
      'Construcción bodega',
    ],
  },
  {
    titulo: 'CABAÑA',
    subcategorias: [
      'Gastos cabaña',
    ],
  },
];

export default function Gastos() {
  const [showForm, setShowForm] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGastos();
  }, []);

  const fetchGastos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gastos');
      const data = await res.json();
      setGastos(data);
    } catch (err) {
      setGastos([]);
    }
    setLoading(false);
  };

  const handleOpenForm = (cat, subcat) => {
    setCategoria(cat);
    setSubcategoria(subcat);
    setShowForm(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      await fetch('/api/gastos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria, subcategoria, descripcion, monto })
      });
      setMsg('Gasto registrado');
      setDescripcion('');
      setMonto('');
      setTimeout(() => setShowForm(false), 1000);
      fetchGastos();
    } catch {
      setError('No se pudo guardar el gasto.');
    }
  };

  const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0);

  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Gastos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {GASTOS_CATEGORIAS.map(cat => (
          <div key={cat.titulo} className="bg-[#F5F6FA] rounded-xl p-4 shadow-lg border border-[#E0E0E0]">
            <h3 className="text-lg font-semibold mb-2 text-[#548CC4]">{cat.titulo}</h3>
            <ul className="space-y-2">
              {cat.subcategorias.map(subcat => (
                <li key={subcat} className="flex items-center justify-between">
                  <span className="text-[#22223B]">{subcat}</span>
                  <button
                    className="bg-[#E9ECEF] text-[#22223B] px-3 py-1 rounded-md font-semibold hover:bg-[#F1F3F6] transition outline-none focus:outline-none text-xs"
                    style={{border:'none', boxShadow:'none'}}
                    onClick={() => handleOpenForm(cat.titulo, subcat)}
                  >
                    + Agregar gasto
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Apartado para agregar gasto libre */}
        <div className="bg-[#F5F6FA] rounded-xl p-4 shadow-lg border border-[#E0E0E0] flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2 text-[#548CC4]">+ Agregar gasto</h3>
          <button
            className="bg-[#E9ECEF] text-[#22223B] px-3 py-2 rounded-md font-semibold hover:bg-[#F1F3F6] transition outline-none focus:outline-none"
            style={{border:'none', boxShadow:'none'}}
            onClick={() => handleOpenForm('Otro', '')}
          >
            Nuevo gasto libre
          </button>
        </div>
      </div>
      {showForm && (
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-2">Nuevo Gasto</h3>
          {msg && <div className="text-green-600 mb-2">{msg}</div>}
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <input value={categoria} readOnly className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" style={{border:'none'}} />
            </div>
            {subcategoria && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategoría</label>
                <input value={subcategoria} readOnly className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" style={{border:'none'}} />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input value={descripcion} onChange={e => setDescripcion(e.target.value)} required className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" style={{border:'none'}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monto</label>
              <input type="number" min="0" step="0.01" value={monto} onChange={e => setMonto(e.target.value)} required className="bg-[#F7F8FA] rounded-md px-2 py-1 w-full" style={{border:'none'}} />
            </div>
            <button type="submit" className="bg-[#548CC4] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#6FC7BE] transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}}>Registrar</button>
            <button type="button" className="text-sm text-gray-600 underline mt-2" style={{border:'none', background:'none'}} onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
      <div className="mb-4 text-lg font-semibold">Total de gastos: <span className="text-red-600">${total.toFixed(2)}</span></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Categoría</th>
              <th className="py-2 px-4">Subcategoría</th>
              <th className="py-2 px-4">Descripción</th>
              <th className="py-2 px-4">Monto</th>
              <th className="py-2 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-4">Cargando...</td></tr>
            ) : gastos.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Sin gastos registrados</td></tr>
            ) : (
              gastos.map(g => (
                <tr key={g.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{g.id}</td>
                  <td className="py-2 px-4">{g.categoria || ''}</td>
                  <td className="py-2 px-4">{g.subcategoria || ''}</td>
                  <td className="py-2 px-4">{g.descripcion}</td>
                  <td className="py-2 px-4">${g.monto}</td>
                  <td className="py-2 px-4">{g.fecha ? new Date(g.fecha).toLocaleDateString() : ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
