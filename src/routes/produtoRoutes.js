import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.post('/', ProdutoController.criar);
router.get('/', ProdutoController.listarTodos);
router.post('/lote', ProdutoController.inserirLote);
router.get('/filtro/avancado', ProdutoController.buscarComFiltros);
router.delete('/limpeza/esgotados', ProdutoController.removerEsgotados);
router.patch('/:idProduto/especificacoes/:idEspecificacao', ProdutoController.atualizarEspecificacao);
router.get('/:id', ProdutoController.buscarPorId);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.excluir);

export default router;