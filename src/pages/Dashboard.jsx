import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Products from './Products';

const mockData = {
  ventasRecientes: [
    { id: 1, producto: 'Taladro', total: 120, fecha: '2025-07-28' },
    { id: 2, producto: 'Andamio', total: 300, fecha: '2025-07-28' },
  ],
  productosDestacados: [
    { id: 1, nombre: 'Andamio', stock: 5 },
    { id: 2, nombre: 'Taladro', stock: 12 },
  ],
  avisosStock: [
    { id: 1, nombre: 'Cinta', stock: 1 },
  ],
};

function DashboardContent({ current }) {
  if (current === 'Dashboard') {
    return (
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Ventas recientes</h2>
            <ul>
              {mockData.ventasRecientes.map(v => (
                <li key={v.id}>{v.producto} - ${v.total} <span className="text-xs text-gray-500">({v.fecha})</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Productos destacados</h2>
            <ul>
              {mockData.productosDestacados.map(p => (
                <li key={p.id}>{p.nombre} (Stock: {p.stock})</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Avisos de stock</h2>
            <ul>
              {mockData.avisosStock.map(a => (
                <li key={a.id} className="text-red-600">{a.nombre} (Stock: {a.stock})</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 mt-6">
          <h2 className="font-semibold mb-2">Gráficas rápidas (demo)</h2>
          <div className="h-32 flex items-center justify-center text-gray-400">[Aquí irán gráficas de ventas, gastos y caja]</div>
        </div>
      </div>
    );
  }
  if (current === 'Productos') {
    return <Products />;
  }
  // Placeholder para otras secciones
  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">{current}</h1>
      <div className="bg-white rounded shadow p-4">Contenido de {current} próximamente...</div>
    </div>
  );
}

export default function Dashboard() {
  const [current, setCurrent] = useState('Dashboard');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar current={current} setCurrent={setCurrent} />
      <main className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
        <DashboardContent current={current} />
      </main>
    </div>
  );
}
