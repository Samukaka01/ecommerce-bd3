import Cliente from '../models/Cliente.js';

const ClienteController = {
  criar: async (req, res) => {
    try {
      const novoCliente = new Cliente(req.body);
      const clienteSalva = await novoCliente.save();
      return res.status(201).json(clienteSalva);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao criar cliente', erro: erro.message });
    }
  },

  listarTodos: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      return res.status(200).json(clientes);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao listar clientes', erro: erro.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id);
      if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
      }
      return res.status(200).json(cliente);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar cliente', erro: erro.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const clienteAtualizado = await Cliente.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!clienteAtualizado) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
      }
      return res.status(200).json(clienteAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar cliente', erro: erro.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id);
      if (!clienteExcluido) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
      }
      return res.status(200).json({ mensagem: 'Cliente excluído com sucesso' });
    } catch (erro) {
      return res.status(500).json({ message: 'Erro ao excluir cliente', erro: erro.message });
    }
  },

  inserirLote: async (req, res) => {
    try {
      const clientesSalvos = await Cliente.insertMany(req.body);
      return res.status(201).json(clientesSalvos);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao inserir lote', erro: erro.message });
    }
  },

  buscarComFiltros: async (req, res) => {
    try {
      const { cidade } = req.query;
      const filtro = cidade ? { "enderecos.cidade": cidade } : {};
      
      const clientes = await Cliente.find(filtro, 'nome email');
      return res.status(200).json(clientes);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro na busca avançada', erro: erro.message });
    }
  },

  atualizarEndereco: async (req, res) => {
    try {
      const { idCliente, idEndereco } = req.params;
      const { novoCep } = req.body;

      const clienteAtualizado = await Cliente.findOneAndUpdate(
        { _id: idCliente, "enderecos._id": idEndereco },
        { $set: { "enderecos.$.cep": novoCep } },
        { new: true }
      );

      if (!clienteAtualizado) return res.status(404).json({ mensagem: 'Cliente ou endereço não encontrado' });
      return res.status(200).json(clienteAtualizado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar array', erro: erro.message });
    }
  },

  removerSemEmail: async (req, res) => {
    try {
      const resultado = await Cliente.deleteMany({ email: { $exists: false } });
      return res.status(200).json({ mensagem: `${resultado.deletedCount} clientes sem email removidos.` });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao remover clientes', erro: erro.message });
    }
  }
};

export default ClienteController;