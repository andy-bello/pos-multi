
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProductos(data);
        setError("");
      } else {
        setError("Error al cargar productos");
      }
    } catch (err) {
      setError("Error de conexión");
    }
    setLoading(false);
  };
  // ...existing code...

  // Manejo de guardado de producto
  const handleSave = async () => {
    setShowForm(false);
    setEditProduct(null);
    await fetchProductos();
  };

  // Manejo de eliminación de producto
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchProductos();
    } catch (err) {
      setError('Error al eliminar producto');
    }
  };

  // Render principal del componente
  return (
    <div className="p-8 bg-[#FFFFFF] min-h-screen">
      <div className="flex justify-between items-center mb-6 drop-shadow-xl">
        <h2 className="text-2xl font-bold text-[#22223B]">Gestión de Productos</h2>
        <button className="bg-[#FEFF37] text-[#22223B] px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#F7F8AA] transition outline-none focus:outline-none" style={{border:'none', boxShadow:'none'}} onClick={() => setShowForm(true)}>+ Nuevo Producto</button>
      </div>
      {showForm && (
        <ProductForm producto={editProduct} onSave={handleSave} onCancel={() => { setShowForm(false); setEditProduct(null); }} />
      )}
      {error && <div className="text-red-600 mb-2 shadow-sm">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-xl">
          <thead>
            <tr className="bg-[#F7F8FA]">
              <th className="py-2 px-4 text-[#22223B] font-medium">ID</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Nombre</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Categoría</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Precio</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Stock</th>
              <th className="py-2 px-4 text-[#22223B] font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-4">Cargando...</td></tr>
            ) : productos.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Sin productos</td></tr>
            ) : (
              productos.map(prod => (
                <tr key={prod.id} className="hover:bg-[#FEFF37]/30 transition-shadow shadow-sm">
                  <td className="py-2 px-4">{prod.id}</td>
                  <td className="py-2 px-4">{prod.nombre}</td>
                  <td className="py-2 px-4">{prod.categoria}</td>
                  <td className="py-2 px-4">${prod.precio}</td>
                  <td className="py-2 px-4">{prod.stock}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => { setEditProduct(prod); setShowForm(true); }} className="text-blue-600 hover:underline bg-transparent border-none p-0">Editar</button>
                    <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:underline bg-transparent border-none p-0">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
