
import React, { useEffect, useState } from 'react';

const initialDatos = { nombre: '', direccion: '', telefono: '', email: '' };
const initialPass = { actual: '', nueva: '', repetir: '' };

const Configuracion = () => {
  const [datos, setDatos] = useState(initialDatos);
  const [pass, setPass] = useState(initialPass);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/configuracion');
      const data = await res.json();
      setDatos(data);
    } catch (err) {
      setDatos(initialDatos);
    }
    setLoading(false);
  };

  const handleDatosChange = e => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleDatosSubmit = async e => {
    e.preventDefault();
    await fetch('/api/configuracion', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    setMsg('Datos actualizados');
  };

  const handlePassChange = e => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const handlePassSubmit = async e => {
    e.preventDefault();
    if (pass.nueva !== pass.repetir) {
      setMsg('Las contraseñas no coinciden');
      return;
    }
    const res = await fetch('/api/configuracion/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pass)
    });
    if (res.ok) setMsg('Contraseña actualizada');
    else setMsg('Error al actualizar contraseña');
    setPass(initialPass);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configuración del Sistema</h2>
      {msg && <div className="mb-4 text-blue-600">{msg}</div>}
      <form onSubmit={handleDatosSubmit} className="bg-white rounded shadow p-4 mb-8 flex flex-col gap-4">
        <h3 className="font-semibold mb-2">Datos generales</h3>
        <input name="nombre" value={datos.nombre} onChange={handleDatosChange} placeholder="Nombre del negocio" className="border rounded px-2 py-1" />
        <input name="direccion" value={datos.direccion} onChange={handleDatosChange} placeholder="Dirección" className="border rounded px-2 py-1" />
        <input name="telefono" value={datos.telefono} onChange={handleDatosChange} placeholder="Teléfono" className="border rounded px-2 py-1" />
        <input name="email" value={datos.email} onChange={handleDatosChange} placeholder="Email" className="border rounded px-2 py-1" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar cambios</button>
      </form>
      <form onSubmit={handlePassSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-4">
        <h3 className="font-semibold mb-2">Cambiar contraseña</h3>
        <input name="actual" type="password" value={pass.actual} onChange={handlePassChange} placeholder="Contraseña actual" className="border rounded px-2 py-1" />
        <input name="nueva" type="password" value={pass.nueva} onChange={handlePassChange} placeholder="Nueva contraseña" className="border rounded px-2 py-1" />
        <input name="repetir" type="password" value={pass.repetir} onChange={handlePassChange} placeholder="Repetir nueva contraseña" className="border rounded px-2 py-1" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Actualizar contraseña</button>
      </form>
    </div>
  );
};

export default Configuracion;
