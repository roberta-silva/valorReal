import React from 'react';
import { fetchCategoriasAnual } from '../Services/Api';

export function useCategorias() {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchCategoriasAnual();
        setDados(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    buscar();
  }, []);

  return { dados, error, loading };
}
