import express from 'express';
import RelatorioController from '../controllers/RelatorioController.js';

const router = express.Router();

router.get('/faturamento-clientes', RelatorioController.faturamentoPorCliente);
router.get('/produtos-mais-vendidos', RelatorioController.produtosMaisVendidos);
router.get('/distribuicao-categorias', RelatorioController.distribuicaoPorCategoria);
router.get('/ticket-medio', RelatorioController.ticketMedioPorStatus);

export default router;