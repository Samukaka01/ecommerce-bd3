import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  descricao: { 
    type: String 
  },
  preco: { 
    type: Number, 
    required: true 
  },
  estoque: { 
    type: Number, 
    default: 0 
  },
  categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Categoria', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Produto', produtoSchema);