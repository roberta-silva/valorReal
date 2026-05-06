const dataAtual = new Date();

const dataInicialObj = new Date(
  dataAtual.getFullYear() - 10,
  0, // janeiro
  1, // dia 1
);

const formatador = new Intl.DateTimeFormat('pt-BR');

const dataInicial = formatador.format(dataInicialObj);
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

  const porAno = {};

  dados.forEach(({ data, valor }) => {
    const ano = data.split('/')[2];
    const taxa = parseFloat(valor) / 100;

    if (!porAno[ano]) porAno[ano] = 1;

    porAno[ano] *= 1 + taxa;
  });

  return Object.entries(porAno).map(([ano, fator]) => ({
    ano: parseInt(ano),
    percentual: parseFloat(((fator - 1) * 100).toFixed(2)),
  }));
}
module.exports = { getIPCAMensal, getIPCAAnual };

// getIPCAAnual();
