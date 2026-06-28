import mongoose from 'mongoose';
import Categoria from './models/Categoria.js';
import Cliente from './models/Cliente.js';
import Produto from './models/Produto.js';
import Pedido from './models/Pedido.js';

// Conexão direta com o banco (ajuste o nome do banco se for diferente de 'ecommerce')
const MONGO_URL = 'mongodb://127.0.0.1:27017/ecommerce';

const executarSeed = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('🔌 Conectado ao MongoDB! Iniciando o Seed...');

    // 1. Limpar o banco de dados para evitar duplicações
    await Categoria.deleteMany({});
    await Cliente.deleteMany({});
    await Produto.deleteMany({});
    await Pedido.deleteMany({});
    console.log('🧹 Banco limpo com sucesso.');

    // 2. Gerar 50 Categorias
    const categoriasBase = ['Hardware', 'Monitores', 'Colecionáveis Anime', 'Skins e Jogos', 'Periféricos', 'Livros', 'Música'];
    const categoriasInserir = [];
    for (let i = 1; i <= 50; i++) {
      categoriasInserir.push({
        nome: `${categoriasBase[i % categoriasBase.length]} - Ref ${i}`,
        descricao: `Descrição gerada automaticamente para a categoria ${i}`,
        ativa: i % 5 !== 0, // A cada 5 categorias, 1 fica inativa (para dar variedade)
        tags: ['seed', `tag${i}`, 'teste']
      });
    }
    const categoriasSalvas = await Categoria.insertMany(categoriasInserir);
    console.log('✅ 50 Categorias inseridas!');

    // 3. Gerar 50 Clientes
    const clientesInserir = [];
    for (let i = 1; i <= 50; i++) {
      clientesInserir.push({
        nome: `Cliente Teste ${i}`,
        email: `cliente${i}@teste.com`,
        cpf: `000.000.000-${i.toString().padStart(2, '0')}`, // Gera CPFs como 000.000.000-01
        enderecos: [{ rua: `Rua Principal ${i}`, cidade: 'Santa Teresa', cep: '29650-000' }]
      });
    }
    const clientesSalvos = await Cliente.insertMany(clientesInserir);
    console.log('✅ 50 Clientes inseridos!');

    // 4. Gerar 50 Produtos
    const produtosBase = ['Monitor Mancer 24', 'Fan de Gabinete 120mm', 'Figure Akuma no Mi', 'Figure Luffy', 'Vandal Kuronami', 'Teclado MIDI MIDIPlus', 'Notebook Lumina Pro X'];
    const produtosInserir = [];
    for (let i = 1; i <= 50; i++) {
      // Pega uma categoria aleatória para vincular ao produto
      const categoriaAleatoria = categoriasSalvas[Math.floor(Math.random() * categoriasSalvas.length)];
      produtosInserir.push({
        nome: `${produtosBase[i % produtosBase.length]} V${i}`,
        preco: Math.floor(Math.random() * 900) + 50, // Preço aleatório entre 50 e 950
        quantidadeEstoque: Math.floor(Math.random() * 100), // Estoque até 100
        categoria: categoriaAleatoria._id,
        especificacoes: [{ chave: 'Cor', valor: i % 2 === 0 ? 'Preto' : 'Branco' }]
      });
    }
    const produtosSalvos = await Produto.insertMany(produtosInserir);
    console.log('✅ 50 Produtos inseridos!');

    // 5. Gerar 50 Pedidos
    const statusDisponiveis = ['Pendente', 'Concluído', 'Cancelado'];
    const pedidosInserir = [];
    for (let i = 1; i <= 50; i++) {
      const clienteAleatorio = clientesSalvos[Math.floor(Math.random() * clientesSalvos.length)];
      
      // Sorteia dois produtos aleatórios para o pedido
      const prod1 = produtosSalvos[Math.floor(Math.random() * produtosSalvos.length)];
      const prod2 = produtosSalvos[Math.floor(Math.random() * produtosSalvos.length)];
      
      const qtd1 = Math.floor(Math.random() * 3) + 1; // Compra de 1 a 3 unidades
      const qtd2 = Math.floor(Math.random() * 2) + 1; // Compra de 1 a 2 unidades
      const valorTotal = (prod1.preco * qtd1) + (prod2.preco * qtd2);

      pedidosInserir.push({
        cliente: clienteAleatorio._id,
        produtos: [
          { produto: prod1._id, quantidade: qtd1, precoUnitario: prod1.preco },
          { produto: prod2._id, quantidade: qtd2, precoUnitario: prod2.preco }
        ],
        valorTotal: valorTotal,
        status: statusDisponiveis[Math.floor(Math.random() * statusDisponiveis.length)]
      });
    }
    await Pedido.insertMany(pedidosInserir);
    console.log('✅ 50 Pedidos inseridos!');

    console.log('🚀 --- SEED FINALIZADO COM SUCESSO --- 🚀');
    process.exit(0); // Encerra o script
  } catch (erro) {
    console.error('❌ Erro durante o seed:', erro);
    process.exit(1);
  }
};

executarSeed();