import express from 'express';
import CategoriaController from '../controllers/CategoriaController.js';

const router = express.Router();

router.post('/', CategoriaController.criar);
router.get('/', CategoriaController.listarTodas);
router.post('/lote', CategoriaController.inserirLote);
router.get('/filtro/avancado', CategoriaController.buscarComFiltros);
router.delete('/limpeza/inativas', CategoriaController.removerInativas);
router.patch('/:idCategoria/tags/:tagAntiga', CategoriaController.atualizarTag);
router.get('/:id', CategoriaController.buscarPorId);
router.put('/:id', CategoriaController.atualizar);
router.delete('/:id', CategoriaController.excluir);

export default router;