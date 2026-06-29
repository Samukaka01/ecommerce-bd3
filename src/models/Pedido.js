import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', 
    required: true 
  },
  produtos: [{
    produto: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Produto', 
      required: true 
    },
    quantidade: { 
      type: Number, 
      required: true, 
      default: 1 
    },
    precoUnitario: { 
      type: Number, 
      required: true 
    }
  }],
  total: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pendente', 'Aprovado', 'Enviado', 'Entregue', 'Cancelado'], 
    default: 'Pendente' 
  }
}, { timestamps: true });

export default mongoose.model('Pedido', pedidoSchema);