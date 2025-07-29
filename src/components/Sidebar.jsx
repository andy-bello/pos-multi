const menu = [
  { label: 'Dashboard', icon: '🏠' },
  { label: 'Productos', icon: '🛍' },
  { label: 'POS', icon: '🧾' },
  { label: 'Inventario', icon: '📦' },
  { label: 'Proveedores', icon: '🤝' },
  { label: 'Reportes', icon: '📈' },
  { label: 'Configuración', icon: '⚙️' },
  { label: 'Facturas', icon: '🧾' },
  { label: 'Calendario', icon: '📅' },
  { label: 'Caja', icon: '💰' },
  { label: 'Análisis', icon: '🧠' },
  { label: 'Nómina', icon: '👥' },
  { label: 'Gastos', icon: '💸' },
];

export default function Sidebar({ current, setCurrent }) {
  return (
    <aside className="bg-blue-900 text-white w-56 min-h-screen flex flex-col">
      <div className="font-bold text-2xl p-6 border-b border-blue-800">Multiandamios</div>
      <nav className="flex-1">
        {menu.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-blue-800 transition ${current === item.label ? 'bg-blue-800' : ''}`}
            onClick={() => setCurrent(item.label)}
          >
            <span className="text-xl">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
