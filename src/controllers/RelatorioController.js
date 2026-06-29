import Pedido from '../models/Pedido.js';
import Produto from '../models/Produto.js';

const RelatorioController = {
  faturamentoPorCliente: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        { $match: { status: { $ne: 'Cancelado' } } },
        { $group: { _id: "$cliente", totalGasto: { $sum: "$total" }, totalPedidos: { $sum: 1 } } },
        { $lookup: { from: "clientes", localField: "_id", foreignField: "_id", as: "dadosCliente" } },
        { $unwind: "$dadosCliente" },
        { $project: { nomeCliente: "$dadosCliente.nome", totalGasto: 1, totalPedidos: 1, _id: 0 } },
        { $sort: { totalGasto: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  produtosMaisVendidos: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        { $match: { status: { $ne: 'Cancelado' } } },
        { $unwind: "$produtos" },
        { $group: { _id: "$produtos.produto", totalVendido: { $sum: "$produtos.quantidade" } } },
        { $lookup: { from: "produtos", localField: "_id", foreignField: "_id", as: "dadosProduto" } },
        { $unwind: "$dadosProduto" },
        { $project: { nomeProduto: "$dadosProduto.nome", totalVendido: 1, _id: 0 } },
        { $sort: { totalVendido: -1 } },
        { $limit: 5 }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  distribuicaoPorCategoria: async (req, res) => {
    try {
      const relatorio = await Produto.aggregate([
        { $group: { _id: "$categoria", totalDeModelos: { $sum: 1 }, unidadesEmEstoque: { $sum: "$quantidadeEstoque" } } },
        { $lookup: { from: "categorias", localField: "_id", foreignField: "_id", as: "dadosCategoria" } },
        { $unwind: "$dadosCategoria" },
        { $project: { nomeCategoria: "$dadosCategoria.nome", totalDeModelos: 1, unidadesEmEstoque: 1, _id: 0 } },
        { $sort: { totalDeModelos: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  ticketMedioPorStatus: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        { 
          $group: { 
            _id: "$status", 
            ticketMedio: { $avg: "$total" }, 
            volumeTotal: { $sum: "$total" }, 
            quantidadePedidos: { $sum: 1 } 
          } 
        }, 
        { $addFields: { statusDoPedido: "$_id" } },
        { $project: { _id: 0, statusDoPedido: 1, quantidadePedidos: 1, volumeTotal: 1, ticketMedio: { $round: ["$ticketMedio", 2] } } },
        { $sort: { ticketMedio: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  }
};

export default RelatorioController;