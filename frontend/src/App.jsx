


import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import POS from './pages/POS';
import Ventas from './pages/Ventas';
import Inventario from './pages/Inventario';
import Proveedores from './pages/Proveedores';
import Reportes from './pages/Reportes';
import Configuracion from './pages/Configuracion';
import Facturas from './pages/Facturas';
import Calendario from './pages/Calendario';
import Caja from './pages/Caja';
import Analisis from './pages/Analisis';
import Nomina from './pages/Nomina';
import Gastos from './pages/Gastos';
import NotFound from './pages/NotFound';

const PAGES = {
  dashboard: Dashboard,
  productos: Productos,
  pos: POS,
  ventas: Ventas,
  inventario: Inventario,
  proveedores: Proveedores,
  reportes: Reportes,
  configuracion: Configuracion,
  facturas: Facturas,
  calendario: Calendario,
  caja: Caja,
  analisis: Analisis,
  nomina: Nomina,
  gastos: Gastos,
};

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('token'));
  const [page, setPage] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setPage('dashboard');
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {showRegister ? (
          <RegisterForm onSwitch={() => setShowRegister(false)} />
        ) : (
          <LoginForm onSwitch={() => setShowRegister(true)} onLogin={() => setIsLogged(true)} />
        )}
      </div>
    );
  }

  const PageComponent = PAGES[page] || NotFound;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar current={page} onSelect={setPage} onLogout={handleLogout} />
      <main className="flex-1">
        <PageComponent />
      </main>
    </div>
  );
}

export default App;
