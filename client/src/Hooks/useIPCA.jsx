import React from 'react';
import { fetchIPCAAnual } from '../Services/Api';

export function useIPCA() {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchIPCAAnual();
        setDados(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    buscar();
  }, []);

  if (!dados.length) return { dados: null, error };

  const anoAtual = new Date().getFullYear();
  const dadosValidos = dados.filter((d) => d.ano && d.ano < anoAtual);

  const acumulado = dados.reduce(
    (acc, item) => acc * (1 + item.percentual / 100),
    1,
  );
  const acumuladoFechado = dadosValidos.reduce(
    (acc, item) => acc * (1 + item.percentual / 100),
    1,
  );

  return {
    error,
    loading,
    dados: {
      percentualFinal: (acumulado - 1) * 100,
      poderCompraPassado: Math.round(1000 / acumulado),
      mediaAnual:
        (Math.pow(acumuladoFechado, 1 / dadosValidos.length) - 1) * 100,
      pico: dados.reduce(
        (max, item) => (item.percentual > max.percentual ? item : max),
        dados[0],
      ),
      minimo: dadosValidos.reduce(
        (min, item) => (item.percentual < min.percentual ? item : min),
        dadosValidos[0],
      ),
      ultimoAno: dados[dados.length - 1].ano,
      ultimoPercentual: dados[dados.length - 1].percentual,
      primeiroAno: dados[0].ano,
    },
  };
}
