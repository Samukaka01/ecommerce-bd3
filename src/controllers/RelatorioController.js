import Pedido from '../models/Pedido.js';
import Produto from '../models/Produto.js';

const RelatorioController = {
  // 1. Faturamento Total por Cliente
  faturamentoPorCliente: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        // Estágio 1: Filtra apenas pedidos que não foram cancelados
        { $match: { status: { $ne: 'Cancelado' } } },
        // Estágio 2: Agrupa por cliente e soma o valor total
        { $group: { _id: "$cliente", totalGasto: { $sum: "$valorTotal" }, totalPedidos: { $sum: 1 } } },
        // Estágio 3: Faz o JOIN (lookup) com a coleção de clientes para pegar o nome
        { $lookup: { from: "clientes", localField: "_id", foreignField: "_id", as: "dadosCliente" } },
        // Estágio 4: Desestrutura o array gerado pelo lookup
        { $unwind: "$dadosCliente" },
        // Estágio 5: Formata a saída (projeção)
        { $project: { nomeCliente: "$dadosCliente.nome", totalGasto: 1, totalPedidos: 1, _id: 0 } },
        // Estágio 6: Ordena do maior para o menor faturamento
        { $sort: { totalGasto: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  // 2. Ranking dos 5 Produtos Mais Vendidos
  produtosMaisVendidos: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        { $match: { status: { $ne: 'Cancelado' } } },
        // Estágio 2: "Desmonta" o array de produtos embutido nos pedidos
        { $unwind: "$produtos" },
        // Estágio 3: Agrupa pelo ID do produto e soma as quantidades vendidas
        { $group: { _id: "$produtos.produto", totalVendido: { $sum: "$produtos.quantidade" } } },
        // Estágio 4: Busca os dados do produto na coleção 'produtos'
        { $lookup: { from: "produtos", localField: "_id", foreignField: "_id", as: "dadosProduto" } },
        { $unwind: "$dadosProduto" },
        // Estágio 5: Projeção para formatar o JSON de saída
        { $project: { nomeProduto: "$dadosProduto.nome", totalVendido: 1, _id: 0 } },
        // Estágio 6: Ordena e limita aos top 5
        { $sort: { totalVendido: -1 } },
        { $limit: 5 }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  // 3. Distribuição de Produtos por Categoria
  distribuicaoPorCategoria: async (req, res) => {
    try {
      const relatorio = await Produto.aggregate([
        // Estágio 1: Agrupa produtos pela categoria, contando e somando o estoque
        { $group: { _id: "$categoria", totalDeModelos: { $sum: 1 }, unidadesEmEstoque: { $sum: "$quantidadeEstoque" } } },
        // Estágio 2: Traz o nome da categoria com Lookup
        { $lookup: { from: "categorias", localField: "_id", foreignField: "_id", as: "dadosCategoria" } },
        { $unwind: "$dadosCategoria" },
        // Estágio 3: Formata a saída
        { $project: { nomeCategoria: "$dadosCategoria.nome", totalDeModelos: 1, unidadesEmEstoque: 1, _id: 0 } },
        // Estágio 4: Ordena pelas categorias com mais modelos cadastrados
        { $sort: { totalDeModelos: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  },

  // 4. Ticket Médio dos Pedidos por Status
  ticketMedioPorStatus: async (req, res) => {
    try {
      const relatorio = await Pedido.aggregate([
        // Estágio 1: Agrupa pelo status do pedido e usa os acumuladores $avg, $sum e count
        { 
          $group: { 
            _id: "$status", 
            ticketMedio: { $avg: "$valorTotal" }, 
            volumeTotal: { $sum: "$valorTotal" }, 
            quantidadePedidos: { $sum: 1 } 
          } 
        },
        // Estágio 2: Cria um novo campo mais amigável usando $addFields (exigência da rubrica)
        { $addFields: { statusDoPedido: "$_id" } },
        // Estágio 3: Formata a saída arredondando o ticket médio para 2 casas decimais
        { $project: { _id: 0, statusDoPedido: 1, quantidadePedidos: 1, volumeTotal: 1, ticketMedio: { $round: ["$ticketMedio", 2] } } },
        // Estágio 4: Ordena do maior ticket médio para o menor
        { $sort: { ticketMedio: -1 } }
      ]);
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: erro.message });
    }
  }
};

export default RelatorioController;