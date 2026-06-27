import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nome: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  cpf: { 
    type: String, 
    required: true, 
    unique: true 
  },
  telefone: { 
    type: String 
  },
  endereco: { 
    type: String 
  },
    
}, { timestamps: true }
);

export const Cliente = mongoose.model('Cliente', clienteSchema);