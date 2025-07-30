
import { useEffect, useState } from 'react';
import POSCart from '../components/POSCart';

export default function POS() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cart, setCart] = useState([]);
  const [cliente, setCliente] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setProductos(data);
          setError('');
        } else {
          setProductos([]);
          setError(data.message || 'No autorizado. Inicia sesión.');
        }
      } catch {
        setError('Error al cargar productos');
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    const idx = cart.findIndex(i => i.id === producto.id);
    if (idx >= 0) {
      const nuevo = [...cart];
      nuevo[idx].cantidad += 1;
      setCart(nuevo);
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  const cambiarCantidad = (idx, cantidad) => {
    if (cantidad < 1) return;
    const nuevo = [...cart];
    nuevo[idx].cantidad = cantidad;
    setCart(nuevo);
  };

  const quitarDelCarrito = (idx) => {
    const nuevo = [...cart];
    nuevo.splice(idx, 1);
    setCart(nuevo);
  };

  const total = cart.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  const registrarVenta = async () => {
    setLoading(true);
    setMsg('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productos: cart, total, cliente })
      });
      if (!res.ok) throw new Error('Error al registrar venta');
      setMsg('¡Venta registrada!');
      setCart([]);
      setCliente('');
    } catch {
      setError('Error al registrar venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Punto de Venta</h2>
        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productosFiltrados.map(p => (
            <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              {p.imagen && <img src={p.imagen} alt="img" className="h-20 w-20 object-cover mb-2 rounded" />}
              <div className="font-bold">{p.nombre}</div>
              <div className="text-gray-500">{p.categoria}</div>
              <div className="text-blue-600 font-bold mb-2">${p.precio}</div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded font-bold" onClick={() => agregarAlCarrito(p)}>
                Agregar
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <POSCart
          cart={cart}
          onChangeQty={cambiarCantidad}
          onRemove={quitarDelCarrito}
          total={total}
          onSubmit={registrarVenta}
          loading={loading}
        />
        <input
          className="w-full p-2 border rounded mt-4"
          placeholder="Cliente (opcional)"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
        {msg && <div className="text-green-600 mt-2">{msg}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}
