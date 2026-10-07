import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete('/ventas/${id}')
        .then(res => {
          alert(res.data.message);
          cargarVentas();
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div>
      <h2>Ventas de la Cafetería</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>[cite: 19, 20]
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>[cite: 17, 19, 20]
              <td>{v.estudiante}</td>[cite: 17, 19, 20]
              <td>{v.producto}</td>[cite: 17, 19, 20]
              <td>{v.cantidad}</td>[cite: 17, 19, 20]
              <td>${v.precio}</td>[cite: 17, 19, 20]               
              <td>${v.total}</td>[cite: 17, 19, 20]
              <td>{v.fecha}</td>[cite: 17, 19, 20]
              <td>
                <button onClick={() => setVentaSeleccionada(v)}>Editar</button>[cite: 19, 20]
                <button onClick={() => eliminarVenta(v.id)}>Eliminar</button>[cite: 20]
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventaSeleccionada && (
        <EditarVenta 
          venta={ventaSeleccionada} 
          onUpdate={() => { 
            setVentaSeleccionada(null);
            cargarVentas(); 
          }} 
        />
      )}
    </div>
  );
}

export default ListaVentas;
