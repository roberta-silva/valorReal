const dataAtual = new Date();
const dataReferencia = new Date(dataAtual);
dataReferencia.setFullYear(dataAtual.getFullYear() - 10);
const formatador = new Intl.DateTimeFormat('pt-BR');
const dataInicial = formatador.format(dataReferencia);
const dataFinal = formatador.format(dataAtual);

async function getIPCAMensal() {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
  const response = await fetch(url);
  const dados = await response.json();
  return dados;
  // [{ data: '01/06/2025', valor: '0.24' }]
}
// getIPCAMensal().then((dados) => console.log(dados));

async function getIPCAAnual() {
  const dados = await getIPCAMensal();

  //agrupar por ano e somar
  const porAno = {};
  dados.forEach(({ data, valor }) => {
    const ano = data.split('/')[2];

    if (!porAno[ano]) porAno[ano] = 0;
    porAno[ano] += parseFloat(valor);
  });

  return Object.entries(porAno).map(([ano, percentual]) => ({
    ano: parseInt(ano),
    percentual: parseFloat(percentual.toFixed(2)),
  }));
}
module.exports = { getIPCAMensal, getIPCAAnual };

// getIPCAAnual();
