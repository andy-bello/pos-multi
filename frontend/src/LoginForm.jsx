import { useState } from 'react';

export default function LoginForm({ onSwitch, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
      // Guardar token
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input
        className="w-full mb-4 p-2 border rounded"
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-6 p-2 border rounded"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition mb-4"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>
      <div className="text-center">
        <span>¿No tienes cuenta? </span>
        <button type="button" className="text-blue-600 underline" onClick={onSwitch}>
          Regístrate
        </button>
      </div>
    </form>
  );
}
