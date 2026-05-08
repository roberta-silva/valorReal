import Head from '../Components/Helper/Head';
import styles from './ComoFunciona.module.css';
const ComoFunciona = () => {
  return (
    <section className={`${styles.comoFunciona} conteudo animar`}>
      <Head
        title="Como Funciona"
        description="Como funciona a calculadora de inflação: uso de dados do Banco Central (IPCA) e IBGE SIDRA em tempo real para simular impacto da inflação por categoria de gasto sem cadastro."
      />
      <h1 className="titulos">Dados reais, em tempo real</h1>
      <p className="textos-info">
        Nada de números inventados. Tudo vem direto das APIs oficiais do governo
        brasileiro.
      </p>
      <ul className={`${styles.cardsComoFunciona} animar`}>
        <li>
          <span>#01</span>Diga quanto gasta por mês em cada categoria:
          alimentação, transporte, saúde, habitação. Sem cadastro, sem dados
          pessoais.
        </li>
        <li>
          <span>#02</span>Os dados são obtidos em tempo real por meio da API do
          Banco Central (série 433 — IPCA) e do IBGE SIDRA para a inflação por
          categoria de gasto.
          <span>api.bcb.gov.br · sidra.ibge.gov.br</span>
        </li>
        <li>
          <span>#03</span>A apresentação não se limita a percentuais; a perda é
          convertida em produtos concretos, como quilos de arroz, dúzias de ovos
          e refeições.
        </li>
      </ul>
    </section>
  );
};

export default ComoFunciona;
