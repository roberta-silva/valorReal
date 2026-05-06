import React from 'react';
import { useCategorias } from '../Hooks/useCategorias';
import styles from './Calculadora.module.css';
import Loading from '../Components/Helper/Loading';
import ErrorMessage from '../Components/Helper/Error';

const PRODUTOS = [
  { nome: 'kg de arroz', preco: 6.5 },
  { nome: 'dúzias de ovos', preco: 12.5 },
  { nome: 'pacotes de feijão', preco: 8.2 },
  { nome: 'refeições em restaurante', preco: 32 },
];

const Calculadora = () => {
  const { dados, error, loading } = useCategorias();
  const [valores, setValores] = React.useState({
    gastoMensal: 500,
    anoReferencia: 2020,
    projecao: 5,
  });
  const [categoria, setCategoria] = React.useState(['7170']);

  const resultado = React.useMemo(() => {
    if (!dados.length || !categoria.length) return null;

    const categoriasSelecionadas = categoria.map((id) =>
      dados.find((cat) => cat.id === id),
    );

    const anosFiltrados = ['2020', '2021', '2022', '2023', '2024'].filter(
      (ano) => ano >= String(valores.anoReferencia),
    );

    const resultadosPorCategoria = categoriasSelecionadas.map((cat) =>
      anosFiltrados.reduce((val, ano) => {
        const percentual = cat.series[ano];
        return percentual !== undefined ? val * (1 + percentual / 100) : val;
      }, valores.gastoMensal),
    );

    const media =
      resultadosPorCategoria.reduce((acc, val) => acc + val, 0) /
      resultadosPorCategoria.length;
    const valorHoje = Math.round(media);
    const diferenca = valorHoje - valores.gastoMensal;

    const mediaPercentualUltimoAno =
      categoriasSelecionadas.reduce(
        (acc, cat) => acc + (cat.series['2024'] || 0),
        0,
      ) / categoriasSelecionadas.length;

    let valorProjetado = valorHoje;
    let totalPerdaProjecao = 0;
    for (let i = 1; i <= valores.projecao; i++) {
      valorProjetado *= 1 + mediaPercentualUltimoAno / 100;
      totalPerdaProjecao += Math.round(valorProjetado) - valorHoje;
    }

    return {
      valorOriginal: valores.gastoMensal,
      valorHoje,
      diferenca,
      anoReferencia: valores.anoReferencia,
      totalPerdaProjecao,
      equivalentes: PRODUTOS.map((p) => ({
        nome: p.nome,
        quantidade: Math.floor(diferenca / p.preco),
      })),
    };
  }, [dados, categoria, valores]);

  function handleChecked({ target }) {
    setCategoria((prev) =>
      target.checked
        ? [...prev, target.value]
        : prev.filter((c) => c !== target.value),
    );
  }

  function handleRange({ target: { name, value } }) {
    setValores((prev) => ({ ...prev, [name]: Number(value) }));
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <section className={styles.calculadora}>
      <div className={styles.calculadoraInfo}>
        <h1 className="titulos">Qual é o tamanho do seu déficit?</h1>
        <p className="textos-info">
          Informe seu gasto mensal em qualquer categoria e veja exatamente
          quanto você está pagando a mais por causa da inflação.
        </p>
      </div>
      <div className={styles.calculadoraCards}>
        <div className={styles.calculadoraEntrada}>
          <p className={styles.rotulo}>// Entrada</p>
          <form>
            <div className={styles.groupForm}>
              <p className={styles.subtitulo}>Categoria de gastos</p>
              {dados.map((cat) => (
                <label key={cat.id} htmlFor={cat.id}>
                  <input
                    type="checkbox"
                    id={cat.id}
                    name={cat.id}
                    value={cat.id}
                    onChange={handleChecked}
                    defaultChecked={cat.id === '7170'}
                  />
                  {cat.nome}
                </label>
              ))}
            </div>
            <div className={styles.groupRange}>
              <label className={styles.inputRange} htmlFor="gastoMensal">
                Gasto mensal
              </label>
              <input
                type="range"
                id="gastoMensal"
                name="gastoMensal"
                min="100"
                max="10000"
                step="100"
                value={valores.gastoMensal}
                onChange={handleRange}
              />
              <span className={styles.valorSelecionado}>
                {valores.gastoMensal}
              </span>
            </div>
            <div className={styles.groupRange}>
              <label className={styles.inputRange} htmlFor="anoReferencia">
                Ano de referência
              </label>
              <input
                type="range"
                id="anoReferencia"
                name="anoReferencia"
                min="2020"
                max="2025"
                step="1"
                value={valores.anoReferencia}
                onChange={handleRange}
              />
              <span className={styles.valorSelecionado}>
                {valores.anoReferencia}
              </span>
            </div>
            <div className={styles.groupRange}>
              <label className={styles.inputRange} htmlFor="projecao">
                Horizonte de projeção
              </label>
              <input
                type="range"
                id="projecao"
                name="projecao"
                min="1"
                max="5"
                step="1"
                value={valores.projecao}
                onChange={handleRange}
              />
              <span className={styles.valorSelecionado}>
                {valores.projecao}
              </span>
            </div>
          </form>
        </div>
        <div className={styles.calculadoraResultado}>
          <p className={styles.rotulo}>// Resultado</p>
          {loading || !resultado ? (
            <Loading height="29rem" />
          ) : (
            <div className={styles.resultadoInfo}>
              <span className={styles.tag}>impacto mensal estimado</span>
              <p className={styles.resultado}>+ R$ {resultado.diferenca}/mês</p>
              <p className={styles.explicacao}>
                Você pagava <strong>R$ {resultado.valorOriginal}</strong> em{' '}
                {resultado.anoReferencia}. Hoje precisaria de{' '}
                <strong>R$ {resultado.valorHoje}</strong> para comprar o mesmo.
                Em {valores.projecao} anos, a perda acumulada será de{' '}
                <strong>R$ {resultado.totalPerdaProjecao}.</strong>
              </p>
              <ul>
                {resultado.equivalentes.map((item) => (
                  <li key={item.nome}>
                    você deixa de comprar{' '}
                    <span className={styles.tag}>
                      {item.quantidade} {item.nome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculadora;
