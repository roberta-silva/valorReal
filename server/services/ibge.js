const CATEGORIAS = ['7170', '7445', '7625', '7660', '7766'];

const anoAtual = new Date().getFullYear();
const anoInicio = anoAtual - 5;

const anos = [];
for (let ano = anoInicio; ano <= anoAtual; ano++) {
  anos.push(`${ano}12`);
}

const periodos = anos.join('|');

async function getCategorias() {
  const url = `https://servicodados.ibge.gov.br/api/v3/agregados/7060/periodos/-12/variaveis/2265?localidades=N1[all]&classificacao=315`;
  const res = await fetch(url);
  const dados = await res.json();

  return dados[0].resultados
    .filter((item) => {
      const id = Object.keys(item.classificacoes[0].categoria)[0];
      return CATEGORIAS.includes(id);
    })
    .map((item) => {
      const categoria = Object.values(item.classificacoes[0].categoria)[0];
      const serie = item.series[0].serie;
      const percentuais = Object.entries(serie).map(([periodo, valor]) => ({
        periodo,
        percentual: parseFloat(valor),
      }));
      return {
        nome: categoria.replace(/^\d+\./, '').trim(),
        percentuais,
      };
    });
}
const CATEGORIASANUAL = {
  7170: 'Alimentação e bebidas',
  7445: 'Habitação',
  7625: 'Transportes',
  7660: 'Saúde e cuidados pessoais',
  7766: 'Educação',
};

async function getCategoriasAnual() {
  const url = `https://servicodados.ibge.gov.br/api/v3/agregados/7060/periodos/${periodos}/variaveis/2265?localidades=N1[all]&classificacao=315`;
  const res = await fetch(url);
  const dados = await res.json();

  return dados[0].resultados
    .filter((item) => {
      const id = Object.keys(item.classificacoes[0].categoria)[0];
      return Object.keys(CATEGORIASANUAL).includes(id);
    })
    .map((item) => {
      const id = Object.keys(item.classificacoes[0].categoria)[0];
      const series = item.series[0].serie;

      // transforma "202012" em "2020", "202112" em "2021"...
      const seriesFormatadas = {};
      Object.entries(series).forEach(([periodo, valor]) => {
        const ano = periodo.slice(0, 4);
        seriesFormatadas[ano] = parseFloat(valor);
      });

      return {
        id,
        nome: CATEGORIASANUAL[id],
        series: seriesFormatadas,
      };
    });
}

module.exports = { getCategorias, getCategoriasAnual };
