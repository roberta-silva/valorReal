import React from 'react';
import { fetchCategorias } from '../Services/Api';
import styles from './Categorias.module.css';
import Loading from '../Components/Helper/Loading';
import ErrorMessage from '../Components/Helper/Error';

function calcularAcumulado(percentuais) {
  if (!percentuais?.length) return 0;
  return percentuais[percentuais.length - 1].percentual;
}

function formatarPeriodo(periodo) {
  const ano = periodo.slice(0, 4);
  const mes = periodo.slice(4, 6);
  const meses = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];
  return `${meses[+mes - 1]}/${ano}`;
}

const Categorias = () => {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchCategorias();
        setDados(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    buscar();
  }, []);

  const dadosComAcumulado = React.useMemo(
    () =>
      dados.map((categoria) => ({
        ...categoria,
        acumulado: calcularAcumulado(categoria.percentuais),
      })),
    [dados],
  );

  const maiorInflacao = React.useMemo(
    () =>
      dadosComAcumulado.length
        ? dadosComAcumulado.reduce((maior, atual) =>
            atual.acumulado > maior.acumulado ? atual : maior,
          )
        : null,
    [dadosComAcumulado],
  );
  const ultimoPeriodo = dadosComAcumulado[0]?.percentuais?.at(-1)?.periodo;

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <Loading />;
  return (
    <section className={`${styles.categorias} animar`}>
      <h1 className="titulos">Onde a inflação dói mais</h1>
      <p className="textos-info">
        Nem tudo sobe igual. Nos últimos 12 meses a maior inflação foi em{' '}
        {maiorInflacao && maiorInflacao.nome}. Veja o impacto pelas principais
        categorias.
      </p>
      <div>
        <ul className='animar'>
          {dadosComAcumulado.map(({ nome, acumulado }) => (
            <li
              key={nome.split(' ')[0]}
              className={styles.cardCategoria}
              id={nome.split(' ')[0]}
            >
              <span
                data-categoria={nome.split(' ')[0]}
                className={styles.iconeCategoria}
              ></span>
              <p className={styles.nomeCategoria}>{nome.split(' ')[0]}</p>
              <span className={styles.percentual}>+ {acumulado} %</span>
              <span className={styles.ano}>
                // até {formatarPeriodo(ultimoPeriodo)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categorias;
