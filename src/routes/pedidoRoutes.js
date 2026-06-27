import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.post('/', ProdutoController.criar);
router.get('/', ProdutoController.listarTodos);
router.get('/:id', ProdutoController.buscarPorId);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.excluir);

export default router;