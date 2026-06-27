import express from 'express';
import conectarBanco from './config/dbConnection.js'; // Repare no ./ e no .js no final

const app = express();

// Executa a função que faz a ligação ao MongoDB
conectarBanco();

// Configurações para o Express entender JSON (útil para o e-commerce)
app.use(express.json());

// Uma rota de teste simples apenas para ver se está tudo a funcionar
app.get('/', (req, res) => {
  res.send('API do E-commerce a funcionar!');
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor a rodar na porta http://localhost:${PORTA}`);
});