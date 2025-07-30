

import { useEffect, useState } from 'react';

export default function Reportes() {
  // Simulación de datos (puedes conectar a tu backend real)
  const ingresosTotales = 0;
  const gastosTotales = 0;
  const comprasProveedores = 0;
  const gananciaNeta = 0;

  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#22223B]">Reportes y Análisis Financiero - Datos Reales del Usuario</h2>

      {/* Tarjetas resumen con relieve y color */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#6FC7BE]">
          <div className="text-lg font-semibold">Ingresos Totales</div>
          <div className="text-2xl font-bold text-[#6FC7BE]">${ingresosTotales.toFixed(2)}</div>
          <div className="text-xs mt-1">0 ventas realizadas</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#F87171]">
          <div className="text-lg font-semibold">Gastos Totales</div>
          <div className="text-2xl font-bold text-[#F87171]">${gastosTotales.toFixed(2)}</div>
          <div className="text-xs mt-1">Egresos + Compras Reales</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#548CC4]">
          <div className="text-lg font-semibold">Compras a Proveedores</div>
          <div className="text-2xl font-bold text-[#548CC4]">${comprasProveedores.toFixed(2)}</div>
          <div className="text-xs mt-1">0 pedidos procesados</div>
        </div>
        <div className="bg-[#F7F8FA] text-[#22223B] rounded-xl p-4 flex flex-col items-center shadow-xl border-b-4 border-[#FEFF37]">
          <div className="text-lg font-semibold">Ganancia Neta</div>
          <div className="text-2xl font-bold text-[#FEFF37]">${gananciaNeta.toFixed(2)}</div>
          <div className="text-xs mt-1">0.0% margen</div>
        </div>
      </div>

      {/* Gráficos y análisis con relieve y color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#FEFF37] p-4">
          <div className="font-semibold mb-2 text-[#22223B]">Ventas vs Gastos (Últimos 6 Meses)</div>
          <div className="h-32 flex items-center justify-center text-gray-400">Tendencia Mensual<br />
            {/* Aquí puedes agregar un gráfico real */}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#6FC7BE] p-4">
          <div className="font-semibold mb-2 text-[#22223B]">Distribución de Gastos</div>
          <div className="h-32 flex items-center justify-center text-gray-400">$0<br />
            {/* Aquí puedes agregar un gráfico de pastel real */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#548CC4] p-4">
          <div className="font-semibold mb-2 text-[#22223B]">Productos Más Vendidos</div>
          <div className="flex flex-col items-center justify-center h-20 text-gray-400">No hay datos de ventas disponibles</div>
        </div>
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#FEFF37] p-4">
          <div className="font-semibold mb-2 text-[#22223B]">Ventas por Categoría</div>
          <div className="flex flex-col items-center justify-center h-20 text-gray-400">No hay datos de categorías disponibles</div>
        </div>
        <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#F87171] p-4">
          <div className="font-semibold mb-2 text-[#22223B]">Resumen del Mes Actual</div>
          <div className="flex flex-col items-center justify-center h-20 text-gray-400">$0 Ventas del Mes<br />0 transacciones<br />$0 Gastos del Mes</div>
        </div>
      </div>
    </div>
  );
}
