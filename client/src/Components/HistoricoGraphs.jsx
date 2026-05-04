import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { fetchIPCAAnual } from '../Services/api';

const HistoricoGraphs = () => {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchIPCAAnual();
        setDados(resultado);
      } catch {
        setError(true);
      }
    }
    buscar();
  }, []);

  function definirCor(percentual) {
    if (percentual <= 4) return 'var(--green)';
    if (percentual <= 8) return 'var(--yellow)';
    return 'var(--red)';
  }

  if (error) return <p>Erro ao carregar dados.</p>;
  if (!dados.length) return <p>Carregando...</p>;

  return (
    <ResponsiveContainer width="98%" height={400}>
      <BarChart data={dados}>
        <XAxis dataKey="ano" />
        <YAxis unit="%" />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar
          dataKey="percentual"
          radius={[4, 4, 0, 0]}
          label={{
            position: 'top',
            formatter: (value) => `${value}%`,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {dados.map((item) => (
            <Cell key={item.ano} fill={definirCor(item.percentual)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistoricoGraphs;
