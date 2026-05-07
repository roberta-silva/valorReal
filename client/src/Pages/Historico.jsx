import Head from '../Components/Helper/Head';
import HistoricoGraphs from '../Components/HistoricoGraphs';
import styles from './Historico.module.css';

const Historico = () => {
  return (
    <section className={`${styles.historico} animar`}>
      <Head title='Histórico' description='Histórico da inflação no Brasil: evolução anual dos últimos 10 anos com dados do Banco Central, exibidos em gráfico de inflação acumulada.' />
      <h1 className="titulos">IPCA ano a ano</h1>
      <p className="textos-info">
        (Índice Nacional de Preços ao Consumidor Amplo) <br/>
        Dados oficiais do Banco Central do Brasil. Atualizados automaticamente
        via API.
      </p>
      <div className={`${styles.grafico} animar`}>
        <HistoricoGraphs />
      </div>
      <div className={styles.legenda}>
        <span>
          <span
            className={styles.bolinha}
            style={{ background: 'var(--green)' }}
          ></span>
          Baixa  (abaixo de 4%)
        </span>
        <span>
          <span
            className={styles.bolinha}
            style={{ background: 'var(--yellow)' }}
          ></span>
          Moderada  (entre 4% e 8%)
        </span>
        <span>
          <span className={styles.bolinha} style={{ background: 'var(--red)' }}></span>
          Alta  (acima de 8%)
        </span>
      </div>
    </section>
  );
};

export default Historico;
