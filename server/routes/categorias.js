const express = require('express');
const router = express.Router();
const { getCategorias, getCategoriasAnual } = require('../services/ibge');

router.get('/', async (req, res) => {
  try {
    const dados = await getCategorias();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar dados do IBGE' });
  }
});

router.get('/anual', async (req, res) => {
  try {
    const dados = await getCategoriasAnual();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar categorias anuais' });
  }
});

module.exports = router;
