import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    unique: true 
  },
  descricao: { 
    type: String 
  }
}, { timestamps: true }); 

export default mongoose.model('Categoria', categoriaSchema);