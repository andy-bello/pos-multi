import React from 'react';
import Logo from './components/Logo';

const menu = [
  { name: 'Dashboard', key: 'dashboard' },
  { name: 'Productos', key: 'productos' },
  { name: 'POS', key: 'pos' },
  { name: 'Inventario', key: 'inventario' },
  { name: 'Proveedores', key: 'proveedores' },
  { name: 'Reportes', key: 'reportes' },
  { name: 'Configuración', key: 'configuracion' },
  { name: 'Facturas', key: 'facturas' },
  { name: 'Calendario', key: 'calendario' },
  { name: 'Caja', key: 'caja' },
  { name: 'Análisis', key: 'analisis' },
  { name: 'Nómina', key: 'nomina' },
  { name: 'Gastos', key: 'gastos' },
];

export default function Sidebar({ current, onSelect, onLogout }) {
  return (
    <aside className="h-screen w-72 min-w-[18rem] bg-gradient-to-b from-[#FEFF37] via-[#F7F8FA] to-[#F7F8FA] text-[#22223B] flex flex-col py-6 px-3 shadow-xl border-r border-[#E0E0E0]">
      <div className="mb-8 flex flex-col items-center w-full">
        <Logo size={80} />
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map(item => (
            <li key={item.key}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition font-medium outline-none focus:outline-none ${current === item.key ? 'bg-[#FEFF37] text-[#22223B] shadow' : 'hover:bg-[#FEFF37] hover:text-[#22223B] hover:shadow'}`}
                style={{ boxShadow: 'none', border: 'none', background: 'none' }}
                onClick={() => onSelect(item.key)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full flex items-center justify-start mt-8 mb-2">
        <button
          className="flex items-center gap-2 text-[#22223B] font-semibold px-4 py-2 rounded-md hover:bg-[#FEFF37] hover:shadow transition outline-none focus:outline-none"
          style={{ boxShadow: 'none', border: 'none', background: 'none' }}
          onClick={onLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
