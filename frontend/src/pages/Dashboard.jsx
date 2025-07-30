

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const navigate = useNavigate();
  // Simulación de datos (puedes conectar a tu backend real)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Puedes traer estos datos de la API
  const totalProductos = 0;
  const ventasTotales = 0;
  const ingresosTotales = 0;
  const valorInventario = 0;
  const stockBajo = 0;
  const facturasPendientes = 0;
  const eventosHoy = 0;
  const pedidosProcesados = 0;
  const ventasMes = 0;
  const metaMensual = 10000;
  const porcentajeMeta = 0;
  const ventaPromedio = 0;

  // Datos demo para las gráficas
  const lineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ventas',
        data: [1200, 1900, 3000, 2500, 3200, 2800, 3500],
        borderColor: '#548CC4',
        backgroundColor: 'rgba(84,140,196,0.2)',
        tension: 0.4,
        pointBackgroundColor: '#FEFF37',
        pointBorderColor: '#000',
      },
    ],
  };
  const pieData = {
    labels: ['Productos', 'Servicios', 'Otros'],
    datasets: [
      {
        label: 'Ingresos',
        data: [3500, 1200, 800],
        backgroundColor: ['#FEFF37', '#6FC7BE', '#548CC4'],
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Dashboard Empresarial</h2>
        <span className="text-gray-400 text-sm">Última actualización: {new Date().toLocaleString()}</span>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-600 text-white rounded shadow p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Total Productos</div>
          <div className="text-2xl font-bold">{totalProductos}</div>
          <div className="text-xs mt-1">0 con stock bajo</div>
        </div>
        <div className="bg-green-600 text-white rounded shadow p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Ventas Totales</div>
          <div className="text-2xl font-bold">{ventasTotales}</div>
          <div className="text-xs mt-1">0 ventas hoy</div>
        </div>
        <div className="bg-purple-600 text-white rounded shadow p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Ingresos Totales</div>
          <div className="text-2xl font-bold">${ingresosTotales.toFixed(2)}</div>
          <div className="text-xs mt-1">Ganancia: $0.00</div>
        </div>
        <div className="bg-orange-500 text-white rounded shadow p-4 flex flex-col items-center">
          <div className="text-lg font-bold">Valor Inventario</div>
          <div className="text-2xl font-bold">${valorInventario.toFixed(2)}</div>
          <div className="text-xs mt-1">0 clientes activos</div>
        </div>
      </div>

      {/* Alertas del sistema */}
      <div className="bg-white rounded shadow p-4 mb-4 border-l-4 border-red-400">
        <div className="font-bold text-red-500 mb-2 flex items-center">
          <span className="mr-2">🎉</span> Alertas del Sistema
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-100 rounded p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-red-500">{stockBajo}</div>
            <div className="text-xs">Productos con Stock Bajo</div>
            <button onClick={() => navigate('/inventario')} className="text-blue-600 text-xs mt-1 underline">Ver Inventario</button>
          </div>
          <div className="bg-yellow-100 rounded p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-yellow-500">{facturasPendientes}</div>
            <div className="text-xs">Facturas Pendientes</div>
            <button onClick={() => navigate('/facturas')} className="text-blue-600 text-xs mt-1 underline">Ver Facturas</button>
          </div>
          <div className="bg-blue-100 rounded p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-blue-500">{eventosHoy}</div>
            <div className="text-xs">Eventos Hoy</div>
            <button onClick={() => navigate('/calendario')} className="text-blue-600 text-xs mt-1 underline">Ver Calendario</button>
          </div>
          <div className="bg-green-100 rounded p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-green-500">{pedidosProcesados}</div>
            <div className="text-xs">Pedidos Procesados</div>
            <button onClick={() => navigate('/proveedores')} className="text-blue-600 text-xs mt-1 underline">Ver Proveedores</button>
          </div>
        </div>
      </div>

      {/* Resto de secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Gráfica de Línea */}
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Ventas Mensuales</span>
            <button className="text-[#548CC4] text-xs border px-2 py-1 rounded border-[#548CC4]" onClick={() => navigate('/reportes')}>Ver Reportes</button>
          </div>
          <div className="h-56 w-full">
            <Line data={lineData} options={{
              responsive: true,
              plugins: { legend: { display: true, labels: { color: '#000' } } },
              scales: { x: { ticks: { color: '#000' } }, y: { ticks: { color: '#000' } } }
            }} />
          </div>
        </div>
        {/* Gráfica de Pastel */}
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Distribución de Ingresos</span>
            <button className="text-[#6FC7BE] text-xs border px-2 py-1 rounded border-[#6FC7BE]" onClick={() => navigate('/reportes')}>Ver Detalle</button>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <Pie data={pieData} options={{
              responsive: true,
              plugins: { legend: { display: true, labels: { color: '#000' } } }
            }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Productos con Stock Bajo */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Productos con Stock Bajo</span>
            <button className="text-blue-600 text-xs border px-2 py-1 rounded" onClick={() => navigate('/inventario')}>Gestionar Inventario</button>
          </div>
          <div className="flex flex-col items-center justify-center h-16">
            <div className="text-gray-400">No hay productos disponibles</div>
          </div>
        </div>
        {/* Actividad Reciente */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Actividad Reciente</span>
            <button className="text-blue-600 text-xs border px-2 py-1 rounded" onClick={() => navigate('/pos')}>Ir al POS</button>
          </div>
          <div className="flex flex-col items-center justify-center h-16">
            <div className="text-gray-400">No hay actividad reciente</div>
          </div>
        </div>
      </div>
    </div>
  );
}
