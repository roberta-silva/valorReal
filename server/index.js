const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ipcaRoutes = require('./routes/ipca');
const ibgeRoutes = require('./routes/categorias');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/ipca', ipcaRoutes);
app.use('/api/categorias', ibgeRoutes);

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
