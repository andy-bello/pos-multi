
import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Analisis = () => {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ventasRes, productosRes, gastosRes] = await Promise.all([
        fetch('/api/ventas'),
        fetch('/api/products'),
        fetch('/api/gastos')
      ]);
      setVentas(await ventasRes.json());
      setProductos(await productosRes.json());
      setGastos(await gastosRes.json());
    } catch (err) {
      setVentas([]);
      setProductos([]);
      setGastos([]);
    }
    setLoading(false);
  };

  // Ventas por día
  const ventasPorDia = {};
  ventas.forEach(v => {
    const fecha = new Date(v.fecha).toLocaleDateString();
    ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + Number(v.total);
  });

  // Productos más vendidos
  const productosVendidos = {};
  ventas.forEach(v => {
    v.productos.forEach(p => {
      productosVendidos[p.nombre] = (productosVendidos[p.nombre] || 0) + p.cantidad;
    });
  });

  // Gastos por día
  const gastosPorDia = {};
  gastos.forEach(g => {
    const fecha = new Date(g.fecha).toLocaleDateString();
    gastosPorDia[fecha] = (gastosPorDia[fecha] || 0) + Number(g.monto);
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Análisis y Métricas</h2>
      {loading ? (
        <div className="text-center py-8">Cargando datos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Ventas por día</h3>
            <Line
              data={{
                labels: Object.keys(ventasPorDia),
                datasets: [
                  {
                    label: 'Ventas ($)',
                    data: Object.values(ventasPorDia),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37,99,235,0.2)'
                  }
                ]
              }}
            />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Productos más vendidos</h3>
            <Bar
              data={{
                labels: Object.keys(productosVendidos),
                datasets: [
                  {
                    label: 'Cantidad vendida',
                    data: Object.values(productosVendidos),
                    backgroundColor: '#22c55e'
                  }
                ]
              }}
            />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Gastos por día</h3>
            <Line
              data={{
                labels: Object.keys(gastosPorDia),
                datasets: [
                  {
                    label: 'Gastos ($)',
                    data: Object.values(gastosPorDia),
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220,38,38,0.2)'
                  }
                ]
              }}
            />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Distribución de ventas</h3>
            <Pie
              data={{
                labels: Object.keys(productosVendidos),
                datasets: [
                  {
                    label: 'Ventas',
                    data: Object.values(productosVendidos),
                    backgroundColor: [
                      '#2563eb', '#22c55e', '#f59e42', '#dc2626', '#a21caf', '#eab308', '#0ea5e9', '#f43f5e'
                    ]
                  }
                ]
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analisis;
