const CATEGORIAS = ['7170', '7445', '7625', '7660', '7766'];

async function getCategorias() {
  const url =
    'https://servicodados.ibge.gov.br/api/v3/agregados/7060/periodos/202412/variaveis/2265?localidades=N1[all]&classificacao=315';
  const res = await fetch(url);
  const dados = await res.json();

  return dados[0].resultados
    .filter((item) => {
      const id = Object.keys(item.classificacoes[0].categoria)[0];
      return CATEGORIAS.includes(id);
    })
    .map((item) => {
      const categoria = Object.values(item.classificacoes[0].categoria)[0];
      const valor = Object.values(item.series[0].serie)[0];
      return {
        nome: categoria.replace(/^\d+\./, '').trim(),
        percentual: parseFloat(valor),
      };
    });
}
module.exports = { getCategorias };
