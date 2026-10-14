import React, { useState } from 'react';
import { CATEGORIAS, etiqueta } from './categoriasData';

export const FiltroCategorias = ({ onChange }) => {
  const [categoria, setCategoria] = useState('');

  const handleCategoria = (e) => {
    setCategoria(e.target.value);
    // Avisa al módulo de Retos: null = todas, o el nombre (ej. "Tecnologia")
    if (onChange) onChange(e.target.value || null);
  };

  return (
    <select
      value={categoria}
      onChange={handleCategoria}
      style={{
        padding: '10px 16px',
        borderRadius: '999px',
        border: '1px solid #e5e7eb',
        background: '#fff',
        fontWeight: 600,
        minWidth: '240px',
      }}
    >
      <option value="">Todas las categorías</option>
      {CATEGORIAS.map((nombre) => (
        <option key={nombre} value={nombre}>{etiqueta(nombre)}</option>
      ))}
    </select>
  );
};

export default FiltroCategorias;