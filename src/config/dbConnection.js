import mongoose from 'mongoose';

const conectarBanco = async () => {
  try {
    // URL local apontando para a base de dados e-commerce
    const urlBanco = 'mongodb://127.0.0.1:27017/e-commerce';
    
    await mongoose.connect(urlBanco);
    console.log('Conectado ao MongoDB com sucesso na base de dados e-commerce!');
  } catch (erro) {
    console.error('Erro crítico ao conectar à base de dados:', erro.message);
    // Encerra a aplicação caso a conexão com o banco falhe
    process.exit(1);
  }
};

export default conectarBanco;