import React from 'react';

export default function POSCart({ cart, onChangeQty, onRemove, total, onSubmit, loading }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold mb-4">Carrito</h3>
      {cart.length === 0 ? (
        <div className="text-gray-500">No hay productos en el carrito</div>
      ) : (
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left">Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={e => onChangeQty(idx, Number(e.target.value))}
                    className="w-16 p-1 border rounded"
                  />
                </td>
                <td>${item.precio}</td>
                <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                <td>
                  <button className="text-red-600" onClick={() => onRemove(idx)}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Total:</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded font-bold mt-2"
        onClick={onSubmit}
        disabled={cart.length === 0 || loading}
      >
        {loading ? 'Procesando...' : 'Registrar venta'}
      </button>
    </div>
  );
}
