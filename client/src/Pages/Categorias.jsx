import React from 'react';
import { fetchCategorias } from '../Services/Api';
import styles from './Categorias.module.css';
import Loading from '../Components/Helper/Loading';
import ErrorMessage from '../Components/Helper/Error';

const Categorias = () => {
  const [dados, setDados] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchCategorias();
        setDados(resultado);
      } catch (err) {
        setError(err.message);
      }
    }
    buscar();
  }, []);

  if (error) return <ErrorMessage message={error} />;

  return (
    <section className={styles.categorias}>
      <h1 className="titulos">Onde a inflação dói mais</h1>
      <p className="textos-info">
        Nem tudo sobe igual. A inflação de alimentos costuma ser o dobro da
        média. Veja o impacto pelas principais categorias.
      </p>
      <div>
        <ul>
          {!dados.length ? (
            <Loading height="12rem" />
          ) : (
            dados.map(({ nome, percentual }) => (
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
                <span className={styles.percentual}>+ {percentual} %</span>
                <span className={styles.ano}>// 2025</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default Categorias;
