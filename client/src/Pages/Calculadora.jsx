import { useState, useEffect } from 'react';
import { fetchCategoriasAnual } from '../Services/Api';
import styles from './Calculadora.module.css';

const PRODUTOS = [
  { nome: 'kg de arroz', preco: 6.5 },
  { nome: 'dúzias de ovos', preco: 12.5 },
  { nome: 'pacotes de feijão', preco: 8.2 },
  { nome: 'refeições em restaurante', preco: 32 },
];

const Calculadora = () => {
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(false);
  const [valores, setValores] = useState({
    gastoMensal: 500,
    anoReferencia: 2020,
    projecao: 5,
  });
  const [categoria, setCategoria] = useState(['7170']);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    async function buscar() {
      try {
        const resultado = await fetchCategoriasAnual();
        setDados(resultado);
      } catch {
        setError(true);
      }
    }
    buscar();
  }, []);

  useEffect(() => {
    if (categoria.length === 0 || dados.length === 0) return;

    const categoriasSelecionadas = categoria.map((id) =>
      dados.find((cat) => cat.id === id),
    );

    const anoInicio = String(valores.anoReferencia);
    const anosDisponiveis = ['2020', '2021', '2022', '2023', '2024'];
    const anosFiltrados = anosDisponiveis.filter((ano) => ano >= anoInicio);

    const resultadosPorCategoria = categoriasSelecionadas.map((cat) => {
      let valorCorrigido = valores.gastoMensal;
      anosFiltrados.forEach((ano) => {
        const percentual = cat.series[ano];
        if (percentual !== undefined) {
          valorCorrigido *= 1 + percentual / 100;
        }
      });
      return valorCorrigido;
    });

    const media =
      resultadosPorCategoria.reduce((acc, val) => acc + val, 0) /
      resultadosPorCategoria.length;

    const valorHoje = Math.round(media);
    const diferenca = valorHoje - valores.gastoMensal;

    const mediaPercentualUltimoAno =
      categoriasSelecionadas.reduce((acc, cat) => {
        return acc + (cat.series['2024'] || 0);
      }, 0) / categoriasSelecionadas.length;

    let totalPerdaProjecao = 0;
    let valorProjetado = valorHoje;

    for (let i = 1; i <= valores.projecao; i++) {
      valorProjetado *= 1 + mediaPercentualUltimoAno / 100;
      totalPerdaProjecao += Math.round(valorProjetado) - Math.round(valorHoje);
    }

    const equivalentes = PRODUTOS.map((produto) => ({
      nome: produto.nome,
      quantidade: Math.floor(diferenca / produto.preco),
    }));

    setResultado({
      valorOriginal: valores.gastoMensal,
      valorHoje,
      diferenca,
      anoReferencia: valores.anoReferencia,
      totalPerdaProjecao,
      equivalentes,
    });
  }, [valores, categoria, dados, setResultado]);

  function handleChecked({ target }) {
    if (target.checked) {
      setCategoria((prev) => [...prev, target.value]);
    } else {
      setCategoria((prev) => prev.filter((c) => c !== target.value));
    }
  }

  function handleRange({ target }) {
    const { name, value } = target;
    setValores((prev) => ({ ...prev, [name]: Number(value) }));
  }

  if (error) return <p>Erro ao carregar dados. Tente novamente.</p>;

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
          {resultado ? (
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
          ) : (
            <p className={styles.explicacao}>
              Selecione uma categoria e ajuste os valores para ver o impacto.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculadora;
