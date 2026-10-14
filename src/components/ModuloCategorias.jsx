import React, { useState } from 'react';
import { CATEGORIAS, AREAS, CATEGORIAS_INICIALES, etiqueta } from './categoriasData';

const VACIO = { nombre: CATEGORIAS[0], descripcion: '', area_responsable: AREAS[0] };

export const ModuloCategorias = () => {
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const avisar = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => setMensajeExito(''), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const abrirNueva = () => {
    setEditandoId(null);
    setForm(VACIO);
    setError('');
    setMostrarForm(true);
  };

  const abrirEditar = (c) => {
    setEditandoId(c.id);
    setForm({ nombre: c.nombre, descripcion: c.descripcion, area_responsable: c.area_responsable });
    setError('');
    setMostrarForm(true);
  };

  const cancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setError('');
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const descripcion = form.descripcion.trim();
    const repetida = categorias.some(
      (c) => c.nombre === form.nombre && c.id !== editandoId
    );
    if (repetida) return setError('Esa categoría ya está registrada.');

    if (editandoId) {
      setCategorias(categorias.map((c) =>
        c.id === editandoId ? { ...c, ...form, descripcion } : c
      ));
      avisar('✓ ¡Categoría actualizada exitosamente!');
    } else {
      setCategorias([...categorias, { id: crypto.randomUUID(), ...form, descripcion }]);
      avisar('✓ ¡Categoría agregada exitosamente!');
    }
    cancelar();
  };

  const eliminar = (id) => {
    setCategorias(categorias.filter((c) => c.id !== id));
    avisar('✓ Categoría eliminada.');
  };

  return (
    <div>
      <div className="profile-card-header">
        <div>
          <span className="modulo-tag">Tabla: Categoria · Administración</span>
          <h3 className="profile-title">Áreas temáticas de los retos</h3>
        </div>
        {!mostrarForm && (
          <button type="button" onClick={abrirNueva} className="btn-edit-perfil">
            ➕ Nueva categoría
          </button>
        )}
      </div>

      {mensajeExito && <div className="alert-success">{mensajeExito}</div>}

      {mostrarForm && (
        <form onSubmit={handleGuardar} className="form-perfil-empresa">
          <div className="form-grid-empresa">
            <div className="form-group">
              <label>Categoría</label>
              <select name="nombre" value={form.nombre} onChange={handleChange} className="select-sector">
                {CATEGORIAS.map((n) => (
                  <option key={n} value={n}>{etiqueta(n)}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Área Responsable</label>
              <select name="area_responsable" value={form.area_responsable} onChange={handleChange} className="select-sector">
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p>{error}</p>}

          <div className="form-buttons-perfil">
            <button type="submit" className="btn-guardar-perfil">
              {editandoId ? 'Guardar Cambios' : 'Agregar Categoría'}
            </button>
            <button type="button" onClick={cancelar} className="btn-cancelar-perfil">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="perfil-datos-grid">
        {categorias.map((c) => (
          <div className="dato-item" key={c.id}>
            <span className="dato-label">{etiqueta(c.nombre)}:</span>
            <span className="dato-valor">{c.descripcion}</span>
            <span className="dato-valor sector-badge">{c.area_responsable}</span>
            <div className="form-buttons-perfil">
              <button type="button" onClick={() => abrirEditar(c)} className="btn-edit-perfil">
                ✏️ Editar
              </button>
              <button type="button" onClick={() => eliminar(c.id)} className="btn-cancelar-perfil">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuloCategorias;