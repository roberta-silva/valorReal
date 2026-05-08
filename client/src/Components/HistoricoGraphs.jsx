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
import Loading from './Helper/Loading';
import ErrorMessage from './Helper/Error';

const HistoricoGraphs = () => {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 800);

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

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 800);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function definirCor(percentual) {
    if (percentual <= 4) return 'var(--green)';
    if (percentual <= 8) return 'var(--yellow)';
    return 'var(--red)';
  }

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <Loading height="24rem" />;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={dados}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="ano" />
        <YAxis unit="%" />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar
          dataKey="percentual"
          radius={[4, 4, 0, 0]}
          label={
            isMobile
              ? {
                  position: 'top',
                  formatter: (value) => `${value.toFixed(0)}%`,
                  fontSize: 8,
                  fontWeight: 800,
                }
              : {
                  position: 'top',
                  formatter: (value) => `${value}%`,
                  fontSize: 12,
                  fontWeight: 800,
                }
          }
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
