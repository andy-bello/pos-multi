
import React, { useEffect, useState } from 'react';

const initialForm = { nombre: '', contacto: '', telefono: '', email: '' };

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/proveedores');
      const data = await res.json();
      setProveedores(data);
    } catch (err) {
      setProveedores([]);
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/proveedores/${editId}` : '/api/proveedores';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm(initialForm);
    setEditId(null);
    fetchProveedores();
  };

  const handleEdit = prov => {
    setForm({ nombre: prov.nombre, contacto: prov.contacto, telefono: prov.telefono, email: prov.email });
    setEditId(prov.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar proveedor?')) return;
    await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
    fetchProveedores();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Proveedores</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Contacto</label>
          <input name="contacto" value={form.contacto} onChange={handleChange} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="border rounded px-2 py-1" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setForm(initialForm); setEditId(null); }} className="ml-2 text-sm text-gray-600 underline">Cancelar</button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Contacto</th>
              <th className="py-2 px-4">Teléfono</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-4">Cargando...</td></tr>
            ) : proveedores.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Sin proveedores</td></tr>
            ) : (
              proveedores.map(prov => (
                <tr key={prov.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{prov.id}</td>
                  <td className="py-2 px-4">{prov.nombre}</td>
                  <td className="py-2 px-4">{prov.contacto}</td>
                  <td className="py-2 px-4">{prov.telefono}</td>
                  <td className="py-2 px-4">{prov.email}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleEdit(prov)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(prov.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;
