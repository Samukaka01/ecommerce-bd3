import Categoria from '../models/Categoria.js';

const CategoriaController = {
  // Criar uma nova categoria
  criar: async (req, res) => {
    try {
      const novaCategoria = new Categoria(req.body);
      const categoriaSalva = await novaCategoria.save();
      return res.status(201).json(categoriaSalva);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao criar categoria', erro: erro.message });
    }
  },

  // Listar todas as categorias
  listarTodas: async (req, res) => {
    try {
      const categorias = await Categoria.find();
      return res.status(200).json(categorias);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao listar categorias', erro: erro.message });
    }
  },

  // Buscar uma categoria por ID
  buscarPorId: async (req, res) => {
    try {
      const categoria = await Categoria.findById(req.params.id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
      return res.status(200).json(categoria);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar categoria', erro: erro.message });
    }
  },

  // Atualizar uma categoria por ID
  atualizar: async (req, res) => {
    try {
      // new: true retorna o documento já atualizado
      const categoriaAtualizada = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!categoriaAtualizada) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
      return res.status(200).json(categoriaAtualizada);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar categoria', erro: erro.message });
    }
  },

  // Excluir uma categoria por ID
  excluir: async (req, res) => {
    try {
      const categoriaExcluida = await Categoria.findByIdAndDelete(req.params.id);
      if (!categoriaExcluida) {
        return res.status(404).json({ refinement: 'Categoria não encontrada' });
      }
      return res.status(200).json({ mensagem: 'Categoria excluída com sucesso' });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao excluir categoria', erro: erro.message });
    }
  }
};

export default CategoriaController;