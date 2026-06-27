import Produto from '../models/Produto.js';

const ProdutoController = {
  criar: async (req, res) => {
    try {
      const novoProduto = new Produto(req.body);
      const produtoSalvo = await novoProduto.save();
      return res.status(201).json(produtoSalvo);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao criar produto', erro: erro.message });
    }
  },

  listarTodos: async (req, res) => {
    try {
      // Traz os dados da categoria associada
      const produtos = await Produto.find().populate('categoria');
      return res.status(200).json(produtos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: erro.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const produto = await Produto.findById(req.params.id).populate('categoria');
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
      return res.status(200).json(produto);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: erro.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('categoria');
      
      if (!produtoAtualizado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
      return res.status(200).json(produtoAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar produto', erro: erro.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const produtoExcluido = await Produto.findByIdAndDelete(req.params.id);
      if (!produtoExcluido) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
      return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao excluir produto', erro: erro.message });
    }
  }
};

export default ProdutoController;