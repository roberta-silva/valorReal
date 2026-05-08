import Button from '../Components/Button';
import ErrorMessage from '../Components/Helper/Error';
import { useIPCA } from '../Hooks/useIPCA';
import useCountUp from '../Hooks/useCountUp';
import styles from './Home.module.css';

const Stat = ({ valor, rotulo }) => (
  <li className={styles.cardHome}>
    <span>{valor ?? '--'}</span>
    {rotulo}
  </li>
);

const Home = () => {
  const { dados, error } = useIPCA();
  const percentualAnimado = useCountUp(dados?.percentualFinal ?? null, 1400, 2);

  if (error) return <ErrorMessage message={error} />;
  return (
    <section className={`${styles.home} conteudo animar`}>
      <h1 className={styles.tituloHome}>
        Quanto vale o seu <br />
        <span className={styles.destaque}>dinheiro</span> de verdade?
      </h1>
      <p className={styles.infoHome}>
        A inflação corrói o seu poder de compra silenciosamente. Descubra quanto
        você está perdendo por mês, em reais e em consumo.
      </p>
      <Button />
      <p className={styles.rotulo}>// Perda acumulada nos últimos 10 anos</p>
      <p className={`${styles.resultado} ${dados ? styles.animar : ''}`}>
        -{dados ? percentualAnimado.toFixed(2) : '00.00'}%
      </p>
      <p className={styles.info}>
        <strong>R$ 1000</strong> guardados em {dados?.primeiroAno ?? '--'}{' '}
        equivalem a apenas{' '}
        <strong>R$ {dados?.poderCompraPassado ?? '--'}</strong> hoje em poder de
        compra real.
      </p>
      <ul className={styles.cardsHome}>
        <Stat
          valor={dados ? `${dados.mediaAnual.toFixed(2)}%` : '--'}
          rotulo="// média anual"
        />
        <Stat
          valor={dados ? `${dados.pico.percentual}%` : '--'}
          rotulo={`// pico em ${dados?.pico.ano ?? '--'}`}
        />
        <Stat
          valor={dados ? `${dados.minimo.percentual}%` : '--'}
          rotulo={`// mínimo em ${dados?.minimo.ano ?? '--'}`}
        />
        <Stat
          valor={dados ? `${dados.ultimoPercentual}%` : '--'}
          rotulo={`// acumulado ${dados?.ultimoAno ?? '--'}`}
        />
      </ul>
    </section>
  );
};

export default Home;
