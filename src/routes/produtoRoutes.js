import express from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = express.Router();

router.post('/', PedidoController.criar);
router.get('/', PedidoController.listarTodos);
router.get('/:id', PedidoController.buscarPorId);
router.put('/:id', PedidoController.atualizar);
router.delete('/:id', PedidoController.excluir);

export default router;