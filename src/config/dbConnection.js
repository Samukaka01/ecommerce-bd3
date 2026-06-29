import mongoose from 'mongoose';

const conectarBanco = async () => {
  try {
    const urlBanco = 'mongodb://127.0.0.1:27017/ecommerce';
    
    await mongoose.connect(urlBanco);
    console.log('Conectado ao MongoDB com sucesso na base de dados ecommerce!');
  } catch (erro) {
    console.error('Erro crítico ao conectar à base de dados:', erro.message);
    process.exit(1);
  }
};

export default conectarBanco;