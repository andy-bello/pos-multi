import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MonthlyCalendar({ eventos, onSelectDate }) {
  // Mapear fechas de eventos a un Set para marcar días
  const eventDates = new Set(eventos.map(e => e.fecha));

  // Personalizar tiles para resaltar días con eventos
  function tileClassName({ date, view }) {
    if (view === 'month') {
      const d = date.toISOString().slice(0, 10);
      if (eventDates.has(d)) {
        return 'bg-[#FEFF37] font-bold rounded-full text-[#22223B]';
      }
    }
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 mb-8 border-t-4 border-[#FEFF37]">
      <h3 className="font-semibold text-lg text-[#22223B] mb-2">Vista Mensual</h3>
      <Calendar
        className="w-full"
        tileClassName={tileClassName}
        onClickDay={onSelectDate}
        locale="es-ES"
      />
      <style>{`
        .react-calendar__tile.bg-\[\#FEFF37\] {
          background: #FEFF37 !important;
          color: #22223B !important;
        }
      `}</style>
    </div>
  );
}
