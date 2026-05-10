import { getIPCAMensal } from '../../services/bcb.js';

export default async function handler(req, res) {
  try {
    const dados = await getIPCAMensal();
    res.json(dados);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar dados do BCB' });
  }
}