import { useState } from 'react';


export default function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error en el registro');
      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <input
        className="w-full mb-4 p-2 border rounded"
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
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
        className="w-full mb-4 p-2 border rounded"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-6 p-2 border rounded"
        type="password"
        name="password2"
        placeholder="Repetir contraseña"
        value={form.password2}
        onChange={handleChange}
        required
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition mb-4"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      <div className="text-center">
        <span>¿Ya tienes cuenta? </span>
        <button type="button" className="text-blue-600 underline" onClick={onSwitch}>
          Inicia sesión
        </button>
      </div>
    </form>
  );
}
