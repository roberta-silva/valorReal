import { getIPCAAnual } from '../../services/bcb.js';

export default async function handler(req, res) {
  try {
    const dados = await getIPCAAnual();
    res.json(dados);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar dados do BCB' });
  }
}
