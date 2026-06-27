import express from 'express';
import ClienteController from '../controllers/ClienteController.js';

const router = express.Router();

router.post('/', ClienteController.criar);
router.get('/', ClienteController.listarTodos);
router.post('/lote', ClienteController.inserirLote);
router.get('/filtro/avancado', ClienteController.buscarComFiltros);
router.delete('/limpeza/sem-email', ClienteController.removerSemEmail);
router.patch('/:idCliente/enderecos/:idEndereco', ClienteController.atualizarEndereco);
router.get('/:id', ClienteController.buscarPorId);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.excluir);

export default router;