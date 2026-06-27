import express from 'express';
import CategoriaController from '../controllers/CategoriaController.js';

const router = express.Router();

// O caminho base será definido no index.js (ex: /categorias)
router.post('/', CategoriaController.criar);
router.get('/', CategoriaController.listarTodas);
router.get('/:id', CategoriaController.buscarPorId);
router.put('/:id', CategoriaController.atualizar);
router.delete('/:id', CategoriaController.excluir);

export default router;