const express = require('express');
const router = express.Router();
const { getCategorias } = require('../services/ibge');

router.get('/', async (req, res) => {
  try {
    const dados = await getCategorias();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar dados do IBGE' });
  }
});

module.exports = router;
