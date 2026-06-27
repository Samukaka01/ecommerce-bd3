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
  },

  // 1. Create em Lote
  inserirLote: async (req, res) => {
    try {
      const produtosSalvos = await Produto.insertMany(req.body);
      return res.status(201).json(produtosSalvos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao inserir lote', erro: erro.message });
    }
  },

  // 2. Read com Filtro e Projeção (Filtra por estoque mínimo, retorna nome e preço)
  buscarComFiltros: async (req, res) => {
    try {
      const { estoqueMin } = req.query;
      const filtro = estoqueMin ? { quantidadeEstoque: { $gte: Number(estoqueMin) } } : {};
      
      const produtos = await Produto.find(filtro, 'nome preco');
      return res.status(200).json(produtos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro na busca avançada', erro: erro.message });
    }
  },

  // 3. Update de Array Embutido (Atualiza o valor de uma especificação técnica embutida)
  atualizarEspecificacao: async (req, res) => {
    try {
      const { idProduto, idEspecificacao } = req.params;
      const { novoValor } = req.body;

      const produtoAtualizado = await Produto.findOneAndUpdate(
        { _id: idProduto, "especificacoes._id": idEspecificacao },
        { $set: { "especificacoes.$.valor": novoValor } },
        { new: true }
      );

      if (!produtoAtualizado) return res.status(404).json({ mensagem: 'Produto ou especificação não encontrada' });
      return res.status(200).json(produtoAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar array', erro: erro.message });
    }
  },

  // 4. Delete com Filtro (Deletar produtos com estoque zerado)
  removerEsgotados: async (req, res) => {
    try {
      const resultado = await Produto.deleteMany({ quantidadeEstoque: 0 });
      return res.status(200).json({ mensagem: `${resultado.deletedCount} produtos esgotados foram removidos.` });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao remover esgotados', erro: erro.message });
    }
  }
};

export default ProdutoController;