import { useState } from "react";

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ nombre: "", email: "", password: "", password2: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!validateEmail(form.email)) return "Email inválido";
    if (!form.password || form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    if (!isLogin) {
      if (!form.nombre) return "El nombre es obligatorio";
      if (form.password !== form.password2) return "Las contraseñas no coinciden";
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      if (isLogin) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        setIsLogin(true);
        setForm({ nombre: "", email: "", password: "", password2: "" });
        setError("Registro exitoso. Ahora puedes iniciar sesión.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registro de Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="password2"
              placeholder="Confirmar Contraseña"
              value={form.password2}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          )}
          {error && <div className={`text-sm ${error.includes('exitoso') ? 'text-green-600' : 'text-red-500'}`}>{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Procesando..." : isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
          >
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
