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
  },

  // Inserir várias categorias de uma vez
  // 1. Create em Lote
  inserirLote: async (req, res) => {
    try {
      const categoriasSalvas = await Categoria.insertMany(req.body);
      return res.status(201).json(categoriasSalvas);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao inserir lote', erro: erro.message });
    }
  },

  // 2. Read com Filtro e Projeção (Busca por nome usando Regex, retorna apenas nome)
  buscarComFiltros: async (req, res) => {
    try {
      const { termo } = req.query;
      const filtro = termo ? { nome: new RegExp(termo, 'i') } : {};
      
      const categorias = await Categoria.find(filtro, 'nome -_id');
      return res.status(200).json(categorias);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro na busca avançada', erro: erro.message });
    }
  },

  // 3. Update de Array Embutido (Atualizando o nome de uma 'tag' embutida)
  atualizarTag: async (req, res) => {
    try {
      const { idCategoria, tagAntiga } = req.params;
      const { novaTag } = req.body;

      const categoriaAtualizada = await Categoria.findOneAndUpdate(
        { _id: idCategoria, tags: tagAntiga },
        { $set: { "tags.$": novaTag } },
        { new: true }
      );

      if (!categoriaAtualizada) return res.status(404).json({ mensagem: 'Categoria ou tag não encontrada' });
      return res.status(200).json(categoriaAtualizada);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar array', erro: erro.message });
    }
  },

  // 4. Delete com Filtro (Deletar categorias marcadas como inativas)
  removerInativas: async (req, res) => {
    try {
      const resultado = await Categoria.deleteMany({ ativa: false });
      return res.status(200).json({ mensagem: `${resultado.deletedCount} categorias inativas removidas.` });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao remover inativas', erro: erro.message });
    }
  }
};

export default CategoriaController;