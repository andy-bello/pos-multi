

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Facturas() {
  const navigate = useNavigate();
  // Simulación de datos (puedes conectar a tu backend real)
  const totalFacturado = 0;
  const totalCobrado = 0;
  const pendientesCobro = 0;
  const facturasVencidas = 0;

  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#22223B]">Gestión de Facturas</h2>
        <div className="space-x-2">
          <button className="bg-[#F7F8FA] text-[#22223B] px-4 py-2 rounded-md font-semibold hover:bg-[#E9ECEF] transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}} onClick={() => {/* TODO: implementar exportación real */ window.print();}}>Exportar Excel</button>
          <button className="bg-[#E9ECEF] text-[#22223B] px-4 py-2 rounded-md font-semibold hover:bg-[#F1F3F6] transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}} onClick={() => navigate('/facturas/nueva')}>+ Nueva Factura</button>
        </div>
      </div>

      {/* Tarjetas resumen con relieve y color */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#FEFF37]">
          <div className="text-lg font-semibold">Total Facturado</div>
          <div className="text-2xl font-bold text-[#548CC4]">${totalFacturado.toFixed(2)}</div>
          <div className="text-xs mt-1">0 facturas emitidas</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#6FC7BE]">
          <div className="text-lg font-semibold">Total Cobrado</div>
          <div className="text-2xl font-bold text-[#6FC7BE]">${totalCobrado.toFixed(2)}</div>
          <div className="text-xs mt-1">0 facturas pagadas</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#FEFF37]">
          <div className="text-lg font-semibold">Pendientes de Cobro</div>
          <div className="text-2xl font-bold text-[#FEFF37]">${pendientesCobro.toFixed(2)}</div>
          <div className="text-xs mt-1">0 facturas pendientes</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#F87171]">
          <div className="text-lg font-semibold">Facturas Vencidas</div>
          <div className="text-2xl font-bold text-[#F87171]">{facturasVencidas}</div>
          <div className="text-xs mt-1">Requieren seguimiento</div>
        </div>
      </div>

      {/* Tabla de facturas con relieve y color */}
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto border-t-4 border-[#FEFF37]">
        <div className="flex items-center justify-between p-4 border-b border-[#F1F3F6] bg-[#F7F8FA] rounded-t-xl">
          <span className="font-semibold text-lg text-[#22223B]">Lista de Facturas</span>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#FEFF37]/20">
              <th className="px-4 py-2 text-[#22223B] font-medium">Número</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Cliente</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Fecha Emisión</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Fecha Vencimiento</th>
              <th className="px-4 py-2 text-[#22223B] font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-8 text-[#548CC4]">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-[#6FC7BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4H8V3" /></svg>
                  No hay datos
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
