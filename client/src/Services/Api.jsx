const BASE_URL = 'http://localhost:3001/api';

export async function fetchIPCAAnual() {
  const res = await fetch(`${BASE_URL}/ipca/anual`);
  if (!res.ok) throw new Error('Erro ao buscar IPCA anual');
  return res.json();
}

export async function fetchIPCAMensal() {
  const res = await fetch(`${BASE_URL}/ipca/mensal`);
  if (!res.ok) throw new Error('Erro ao buscar IPCA mensal');
  return res.json();
}
