import React from 'react';
import Button from '../Components/Button';
import { fetchIPCAAnual } from '../Services/Api';
import styles from './Home.module.css';

const Home = () => {
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

  if (error) return <p>Erro ao carregar dados. Tente novamente.</p>;
  if (dados.length === 0) {
    return <p>Carregando...</p>;
  }

  //acumulado ultimos 10 anos
  const acumulado = dados.reduce((acc, item) => {
    return acc * (1 + item.percentual / 100);
  }, 1);
  const percentualFinal = (acumulado - 1) * 100;

  //calcular perda de poder de compra
  const valorBase = 1000;
  const poderCompraPassado = Math.round(valorBase / acumulado);

  //media anual
  const anoAtual = new Date().getFullYear();
  const dadosValidos = dados.filter((d) => d.ano && d.ano < anoAtual);
  const acumuladoFechado = dadosValidos.reduce((acc, item) => {
    return acc * (1 + item.percentual / 100);
  }, 1);
  const aux = dadosValidos.length;
  const mediaAnual = (Math.pow(acumuladoFechado, 1 / aux) - 1) * 100;

  //pico e minimo
  const pico = dados.reduce((max, item) => {
    return item.percentual > max.percentual ? item : max;
  }, dados[0]);
  const minimo = dadosValidos.reduce(
    (min, item) => (item.percentual < min.percentual ? item : min),
    dadosValidos[0],
  );

  //acumulado do ano atual
  const ultimoAno = dados[dados.length - 1].ano;
  const ultimoPercentual = dados[dados.length - 1].percentual;

  return (
    <section className={styles.home}>
      <h1 className={styles.tituloHome}>
        Quanto vale o seu <br />{' '}
        <span className={styles.destaque}>dinheiro</span> de verdade?
      </h1>
      <p className={styles.infoHome}>
        A inflação corrói o seu poder de compra silenciosamente. Descubra quanto
        você está perdendo por mês, em reais e em consumo.
      </p>
      <Button />
      <p className={styles.rotulo}>// Perda acumulada nos últimos 10 anos</p>
      <p className={styles.resultado}>-{percentualFinal.toFixed(2)}%</p>
      <p className={styles.info}>
        <strong>R$ {valorBase}</strong> guardados em {dados[0].ano} equivalem a
        apenas <strong>R$ {poderCompraPassado}</strong> hoje em poder de compra
        real.
      </p>
      <ul className={styles.cardsHome}>
        <li className={styles.cardHome}>
          <span>{mediaAnual.toFixed(2)}%</span>// média anual
        </li>
        <li className={styles.cardHome}>
          <span>{pico.percentual}%</span>// pico em {pico.ano}
        </li>
        <li className={styles.cardHome}>
          <span>{minimo.percentual}%</span>// mínimo em {minimo.ano}
        </li>
        <li className={styles.cardHome}>
          <span>{ultimoPercentual}%</span>// acumulado {ultimoAno}
        </li>
      </ul>
    </section>
  );
};

export default Home;
