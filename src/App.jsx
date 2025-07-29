import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');
  return token ? <Dashboard /> : <AuthPage />;
}

export default App;
