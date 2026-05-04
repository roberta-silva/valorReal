const express = require('express');
const router = express.Router();
const { getIPCAAnual, getIPCAMensal } = require('../services/bcb');

router.get('/anual', async (req, res) => {
  try {
    const dados = await getIPCAAnual();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar dados do BCB' });
  }
});

router.get('/mensal', async (req, res) => {
  try {
    const dados = await getIPCAMensal();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar dados do BCB' });
  }
});

module.exports = router;
