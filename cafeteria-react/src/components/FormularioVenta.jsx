import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FormularioVenta.css';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);
  const fechaInputRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error(err));
    axios.get('http://localhost:3000/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/ventas', formData)
      .then(res => {
        alert(res.data.message);
        setFormData({ estudiante_id: '', producto_id: '', cantidad: '', fecha: '' });
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  return (
    <section className="venta-form-container">
      <div className="venta-form-heading">
        <div>
          <p className="venta-form-eyebrow">Caja escolar</p>
          <h2>Registrar nueva venta</h2>
          <p className="venta-form-description">Completa los datos para guardar una venta.</p>
        </div>
        
      </div>

      <form className="venta-form" onSubmit={handleSubmit}>
        <label>
          <span>Estudiante</span>
          <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required>
            <option value="">Seleccione estudiante</option>
            {estudiantes.map(e => (
              <option key={e.id} value={e.id}>{e.nombre} - {e.grupo}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Producto</span>
          <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
            <option value="">Seleccione producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Cantidad</span>
          <input type="number" name="cantidad" min="1" placeholder="Ej. 1"
            value={formData.cantidad} onChange={handleChange} required />
        </label>

        <label>
          <span>Fecha de venta</span>
          <input
            ref={fechaInputRef}
            type="date"
            name="fecha"
            aria-label="Seleccionar fecha de venta"
            title="Selecciona una fecha en el calendario"
            value={formData.fecha}
            onChange={handleChange}
            onClick={(e) => e.target.showPicker?.()}
            required
          />
        </label>

        <button className="venta-form-button" type="submit">
          Registrar venta <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}

export default FormularioVenta;