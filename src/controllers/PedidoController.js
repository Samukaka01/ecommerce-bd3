import Pedido from '../models/Pedido.js';

const PedidoController = {
  criar: async (req, res) => {
    try {
      const novoPedido = new Pedido(req.body);
      const pedidoSalvo = await novoPedido.save();
      return res.status(201).json(pedidoSalvo);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao criar pedido', erro: erro.message });
    }
  },

  listarTodos: async (req, res) => {
    try {
      const pedidos = await Pedido.find()
        .populate('cliente')
        .populate('produtos.produto');
      return res.status(200).json(pedidos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao listar pedidos', erro: erro.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id)
        .populate('cliente')
        .populate('produtos.produto');
        
      if (!pedido) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' });
      }
      return res.status(200).json(pedido);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar pedido', erro: erro.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const pedidoAtualizado = await Pedido.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('cliente').populate('produtos.produto');

      if (!pedidoAtualizado) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' });
      }
      return res.status(200).json(pedidoAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar pedido', erro: erro.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const pedidoExcluido = await Pedido.findByIdAndDelete(req.params.id);
      if (!pedidoExcluido) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' });
      }
      return res.status(200).json({ mensagem: 'Pedido excluído com sucesso' });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao excluir pedido', erro: erro.message });
    }
  },

  // 1. Create em Lote
  inserirLote: async (req, res) => {
    try {
      const pedidosSalvos = await Pedido.insertMany(req.body);
      return res.status(201).json(pedidosSalvos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao inserir lote', erro: erro.message });
    }
  },

  // 2. Read com Filtro e Projeção (Filtra por status, retorna cliente e valor total)
  buscarComFiltros: async (req, res) => {
    try {
      const { status } = req.query;
      const filtro = status ? { status: status } : {};
      
      const pedidos = await Pedido.find(filtro, 'cliente valorTotal status').populate('cliente', 'nome');
      return res.status(200).json(pedidos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro na busca avançada', erro: erro.message });
    }
  },

  // 3. Update de Array Embutido (Altera a quantidade de um produto dentro da lista do pedido)
  atualizarItemPedido: async (req, res) => {
    try {
      const { idPedido, idProduto } = req.params;
      const { novaQuantidade } = req.body;

      const pedidoAtualizado = await Pedido.findOneAndUpdate(
        { _id: idPedido, "produtos.produto": idProduto },
        { $set: { "produtos.$.quantidade": novaQuantidade } },
        { new: true }
      );

      if (!pedidoAtualizado) return res.status(404).json({ mensagem: 'Pedido ou produto não encontrado' });
      return res.status(200).json(pedidoAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar array', erro: erro.message });
    }
  },

  // 4. Delete com Filtro (Deletar pedidos com status "Cancelado")
  removerCancelados: async (req, res) => {
    try {
      const resultado = await Pedido.deleteMany({ status: 'Cancelado' });
      return res.status(200).json({ mensagem: `${resultado.deletedCount} pedidos cancelados foram excluídos.` });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao remover cancelados', erro: erro.message });
    }
  }
};

export default PedidoController;