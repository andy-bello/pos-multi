import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al obtener productos");
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al agregar producto");
      setSuccess("Producto agregado correctamente");
      setForm({ nombre: "", categoria: "", precio: "", stock: "", imagen: "" });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-2 items-end"
      >
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className="border px-2 py-1 rounded"
        />
        <input
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          min="0"
          step="0.01"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          min="0"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="URL Imagen"
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-1 md:col-span-auto"
          disabled={adding}
        >
          {adding ? "Agregando..." : "Agregar"}
        </button>
      </form>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {loading && <div>Cargando productos...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Categoría</th>
              <th className="p-2 border-b">Precio</th>
              <th className="p-2 border-b">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border-b">{p.nombre}</td>
                <td className="p-2 border-b">{p.categoria}</td>
                <td className="p-2 border-b">${p.precio}</td>
                <td className="p-2 border-b">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
