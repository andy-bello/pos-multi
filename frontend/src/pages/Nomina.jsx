
import React, { useEffect, useState } from 'react';
// Para PDF
import jsPDF from 'jspdf';

const initialEmpleado = { nombre: '', puesto: '', salario: '' };
const initialPago = { empleado_id: '', monto: '', fecha: '' };

const DEDUCCION_SALUD = 0.04; // 4%
const DEDUCCION_PENSION = 0.04; // 4%
const PRESTACION = 0.0833; // 8.33% (prima, cesantías, etc. aprox)

const Nomina = () => {
  const [empleados, setEmpleados] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [empleadoForm, setEmpleadoForm] = useState(initialEmpleado);
  const [pagoForm, setPagoForm] = useState(initialPago);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmpleados();
    fetchPagos();
  }, []);

  const fetchEmpleados = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/nomina/empleados');
      const data = await res.json();
      setEmpleados(data);
    } catch (err) {
      setEmpleados([]);
    }
    setLoading(false);
  };

  const fetchPagos = async () => {
    try {
      const res = await fetch('/api/nomina/pagos');
      const data = await res.json();
      setPagos(data);
    } catch (err) {
      setPagos([]);
    }
  };

  const handleEmpleadoChange = e => {
    setEmpleadoForm({ ...empleadoForm, [e.target.name]: e.target.value });
  };

  const handleEmpleadoSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setError('');
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/nomina/empleados/${editId}` : '/api/nomina/empleados';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleadoForm)
      });
      if (!res.ok) throw new Error('Error al guardar empleado');
      setMsg(editId ? 'Empleado actualizado' : 'Empleado agregado');
      setEmpleadoForm(initialEmpleado);
      setEditId(null);
      await fetchEmpleados();
    } catch (err) {
      setError('No se pudo guardar el empleado.');
    }
  };

  const handleEdit = emp => {
    setEmpleadoForm({ nombre: emp.nombre, puesto: emp.puesto, salario: emp.salario });
    setEditId(emp.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar empleado?')) return;
    await fetch(`/api/nomina/empleados/${id}`, { method: 'DELETE' });
    fetchEmpleados();
  };

  const handlePagoChange = e => {
    setPagoForm({ ...pagoForm, [e.target.name]: e.target.value });
  };

  const handlePagoSubmit = async e => {
    e.preventDefault();
    await fetch('/api/nomina/pagos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pagoForm)
    });
    setPagoForm(initialPago);
    fetchPagos();
  };

  // Procesar nómina para todos los empleados (con deducciones y prestaciones)
  const procesarNomina = async () => {
    if (!window.confirm('¿Procesar nómina para todos los empleados?')) return;
    const fecha = new Date().toISOString().slice(0, 10);
    for (const emp of empleados) {
      const salud = emp.salario * DEDUCCION_SALUD;
      const pension = emp.salario * DEDUCCION_PENSION;
      const prestacion = emp.salario * PRESTACION;
      const neto = emp.salario - salud - pension;
      await fetch('/api/nomina/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empleado_id: emp.id, monto: neto, fecha })
      });
      // Aquí podrías guardar prestaciones en otra tabla si lo deseas
    }
    fetchPagos();
    setMsg('Nómina procesada con deducciones y prestaciones.');
  };

  // Resumen de nómina
  const resumenNomina = empleados.map(emp => {
    const salud = emp.salario * DEDUCCION_SALUD;
    const pension = emp.salario * DEDUCCION_PENSION;
    const prestacion = emp.salario * PRESTACION;
    const neto = emp.salario - salud - pension;
    return {
      ...emp,
      salud,
      pension,
      prestacion,
      neto
    };
  });

  // Generar recibo PDF básico
  const generarRecibo = (emp) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Recibo de Nómina', 20, 20);
    doc.setFontSize(12);
    doc.text(`Empleado: ${emp.nombre}`, 20, 35);
    doc.text(`Puesto: ${emp.puesto}`, 20, 43);
    doc.text(`Salario: $${Number(emp.salario).toFixed(2)}`, 20, 51);
    doc.text(`Salud (4%): $${(emp.salario * DEDUCCION_SALUD).toFixed(2)}`, 20, 59);
    doc.text(`Pensión (4%): $${(emp.salario * DEDUCCION_PENSION).toFixed(2)}`, 20, 67);
    doc.text(`Prestación (8.33%): $${(emp.salario * PRESTACION).toFixed(2)}`, 20, 75);
    doc.text(`Neto a pagar: $${(emp.salario - emp.salario * DEDUCCION_SALUD - emp.salario * DEDUCCION_PENSION).toFixed(2)}`, 20, 83);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 91);
    doc.save(`recibo_nomina_${emp.nombre}.pdf`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Nómina</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold">Gestión de Nómina</h2>
        <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded font-bold hover:bg-blue-800" onClick={procesarNomina}>
          Procesar Nómina
        </button>
      </div>
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleEmpleadoSubmit} className="bg-white rounded shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input name="nombre" value={empleadoForm.nombre} onChange={handleEmpleadoChange} required className="bg-[#F7F8FA] rounded-md px-2 py-1" style={{border:'none'}} />
        </div>
        <div>
          <label className="block text-sm font-medium">Puesto</label>
          <input name="puesto" value={empleadoForm.puesto} onChange={handleEmpleadoChange} className="bg-[#F7F8FA] rounded-md px-2 py-1" style={{border:'none'}} />
        </div>
        <div>
          <label className="block text-sm font-medium">Salario</label>
          <input name="salario" type="number" min="0" step="0.01" value={empleadoForm.salario} onChange={handleEmpleadoChange} required className="bg-[#F7F8FA] rounded-md px-2 py-1" style={{border:'none'}} />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}}>
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEmpleadoForm(initialEmpleado); setEditId(null); }} className="ml-2 text-sm text-gray-600 underline" style={{border:'none', background:'none'}}>Cancelar</button>
        )}
      </form>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-xl shadow-sm">
          <thead>
            <tr className="bg-[#F7F8FA]">
              <th className="py-2 px-4 text-[#22223B] font-medium">ID</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Nombre</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Puesto</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Salario</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Salud</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Pensión</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Prestación</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Neto</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="text-center py-4">Cargando...</td></tr>
            ) : empleados.length === 0 ? (
              <tr><td colSpan="9" className="text-center py-4">Sin empleados</td></tr>
            ) : (
              resumenNomina.map(emp => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{emp.id}</td>
                  <td className="py-2 px-4">{emp.nombre}</td>
                  <td className="py-2 px-4">{emp.puesto}</td>
                  <td className="py-2 px-4">${Number(emp.salario).toFixed(2)}</td>
                  <td className="py-2 px-4">${emp.salud.toFixed(2)}</td>
                  <td className="py-2 px-4">${emp.pension.toFixed(2)}</td>
                  <td className="py-2 px-4">${emp.prestacion.toFixed(2)}</td>
                  <td className="py-2 px-4">${emp.neto.toFixed(2)}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:underline">Eliminar</button>
                    <button onClick={() => generarRecibo(emp)} className="text-green-600 hover:underline">Recibo PDF</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <form onSubmit={handlePagoSubmit} className="bg-white rounded shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Empleado</label>
          <select name="empleado_id" value={pagoForm.empleado_id} onChange={handlePagoChange} required className="border rounded px-2 py-1">
            <option value="">Selecciona</option>
            {empleados.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Monto</label>
          <input name="monto" type="number" min="0" step="0.01" value={pagoForm.monto} onChange={handlePagoChange} required className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input name="fecha" type="date" value={pagoForm.fecha} onChange={handlePagoChange} required className="border rounded px-2 py-1" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Registrar Pago</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Empleado</th>
              <th className="py-2 px-4">Monto</th>
              <th className="py-2 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-4">Sin pagos registrados</td></tr>
            ) : (
              pagos.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{p.id}</td>
                  <td className="py-2 px-4">{empleados.find(e => e.id === p.empleado_id)?.nombre || '-'}</td>
                  <td className="py-2 px-4">${p.monto}</td>
                  <td className="py-2 px-4">{new Date(p.fecha).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nomina;
