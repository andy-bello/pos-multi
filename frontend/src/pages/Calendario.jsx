

import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import MonthlyCalendar from '../components/MonthlyCalendar';

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Cálculos resumen
  const today = new Date().toISOString().slice(0, 10);
  const eventosHoy = eventos.filter(e => e.fecha === today).length;
  const eventosProximos = eventos.filter(e => e.fecha > today).length;
  const totalEventos = eventos.length;

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/calendario', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEventos(data);
        setError('');
      } else {
        setError('Error al cargar eventos');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleSave = async (evento) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/calendario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(evento)
      });
      setShowForm(false);
      await fetchEventos();
    } catch (err) {
      setError('Error al guardar evento');
    }
  };

  // Filtrar eventos por día seleccionado
  let eventosFiltrados = eventos;
  if (selectedDate) {
    eventosFiltrados = eventos.filter(e => e.fecha === selectedDate);
  }

  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#22223B]">Calendario de Eventos</h2>
        <button className="bg-[#FEFF37] text-[#22223B] px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#F7F8AA] transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}} onClick={() => setShowForm(true)}>+ Nuevo Evento</button>
      </div>
      {showForm && (
        <EventForm onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {error && <div className="text-red-600 mb-2 shadow-sm">{error}</div>}

      {/* Tarjetas resumen con relieve y color */}
      {/* Vista mensual */}
      <MonthlyCalendar eventos={eventos} onSelectDate={date => setSelectedDate(date.toISOString().slice(0, 10))} />

      {/* Tarjetas resumen con relieve y color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#FEFF37]">
          <div className="text-lg font-semibold">Eventos Hoy</div>
          <div className="text-2xl font-bold text-[#548CC4]">{eventosHoy}</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#6FC7BE]">
          <div className="text-lg font-semibold">Próximos Eventos</div>
          <div className="text-2xl font-bold text-[#6FC7BE]">{eventosProximos}</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#FEFF37]">
          <div className="text-lg font-semibold">Total Eventos</div>
          <div className="text-2xl font-bold text-[#FEFF37]">{totalEventos}</div>
        </div>
      </div>

      {/* Tabla de eventos con relieve y color */}
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto border-t-4 border-[#FEFF37]">
        <div className="flex items-center justify-between p-4 border-b border-[#F1F3F6] bg-[#F7F8FA] rounded-t-xl">
          <span className="font-semibold text-lg text-[#22223B]">Lista de Eventos</span>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#FEFF37]/20">
              <th className="px-4 py-2 text-[#22223B] font-medium">Título</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Descripción</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Cargando...</td></tr>
            ) : eventosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-[#548CC4]">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-[#6FC7BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    No hay eventos
                  </div>
                </td>
              </tr>
            ) : (
              eventosFiltrados.map(ev => (
                <tr key={ev.id} className="hover:bg-[#FEFF37]/30 transition-shadow shadow-sm">
                  <td className="py-2 px-4">{ev.titulo}</td>
                  <td className="py-2 px-4">{ev.descripcion}</td>
                  <td className="py-2 px-4">{ev.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
