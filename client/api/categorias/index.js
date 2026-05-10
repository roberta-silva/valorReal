import { getCategorias } from '../../services/ibge.js';

export default async function handler(req, res) {
  try {
    const dados = await getCategorias();
    res.json(dados);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar dados do IBGE' });
  }
}