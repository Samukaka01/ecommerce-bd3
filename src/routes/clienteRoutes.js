import express from 'express';
import ClienteController from '../controllers/ClienteController.js';

const router = express.Router();

router.post('/', ClienteController.criar);
router.get('/', ClienteController.listarTodos);
router.get('/:id', ClienteController.buscarPorId);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.excluir);

export default router;