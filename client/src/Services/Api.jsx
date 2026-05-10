const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

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

export async function fetchCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  return res.json();
}

export async function fetchCategoriasAnual() {
  const res = await fetch(`${BASE_URL}/categorias/anual`);
  if (!res.ok) throw new Error('Erro ao buscar categorias anuais');
  return res.json();
}
