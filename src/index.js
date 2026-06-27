import express from 'express';
import conectarBanco from './config/dbConnection.js';

import categoriaRoutes from './routes/categoriaRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

const app = express();

conectarBanco();

app.use(express.json());
app.use('/categorias', categoriaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);


app.get('/', (req, res) => {
  res.send('API do E-commerce rodando com sucesso!');
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
});