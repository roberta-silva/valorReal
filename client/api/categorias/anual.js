import { getCategoriasAnual } from '../../services/ibge.js';

export default async function handler(req, res) {
  try {
    const dados = await getCategoriasAnual();
    res.json(dados);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar categorias anuais' });
  }
}
