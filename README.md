# E-commerce BD3

API RESTful de um e-commerce para gerenciamento de categorias, clientes, produtos, pedidos e relatórios.

## Tecnologias

- Node.js
- Express
- MongoDB com Mongoose
- Nodemon (desenvolvimento)

## Visão geral

A aplicação expõe uma API para cadastro e operação de um e-commerce. Ela conecta-se a um banco MongoDB local e possui recursos para:

- Cadastro e consulta de categorias
- Cadastro e consulta de clientes
- Cadastro e consulta de produtos
- Gestão de pedidos
- Relatórios de faturamento, produtos mais vendidos e distribuição por categoria

## Estrutura do projeto

- `src/index.js`: ponto de entrada da API
- `src/config/dbConnection.js`: configuração da conexão MongoDB
- `src/routes/`: define as rotas para cada recurso
- `src/controllers/`: contém a lógica de negócio para cada rota
- `src/models/`: define os esquemas Mongoose
- `scripts/seed.js`: script para popular a base de dados com dados de exemplo

## Configuração e execução

### Pré-requisitos

- Node.js instalado
- MongoDB em execução localmente

### Instalação

```bash
npm install
```

### Executar a API

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

### Seed de dados

O projeto inclui um script de seed para popular a base com categorias, clientes, produtos e pedidos.

```bash
node scripts/seed.js
```

> O script de seed usa a URL de conexão `mongodb://127.0.0.1:27017/e-commerce`.

## Rotas da API

### Health check

- `GET /` - Retorna uma mensagem simples de funcionamento da API.

### Categorias

- `POST /categorias` - Criar categoria
- `GET /categorias` - Listar todas as categorias
- `GET /categorias/:id` - Buscar categoria por ID
- `PUT /categorias/:id` - Atualizar categoria por ID
- `DELETE /categorias/:id` - Excluir categoria por ID
- `POST /categorias/lote` - Inserir várias categorias de uma vez
- `GET /categorias/filtro/avancado?termo=<texto>` - Buscar categorias por termo
- `DELETE /categorias/limpeza/inativas` - Remover categorias inativas
- `PATCH /categorias/:idCategoria/tags/:tagAntiga` - Atualizar tag de categoria

### Clientes

- `POST /clientes` - Criar cliente
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:id` - Buscar cliente por ID
- `PUT /clientes/:id` - Atualizar cliente por ID
- `DELETE /clientes/:id` - Excluir cliente por ID
- `POST /clientes/lote` - Inserir vários clientes de uma vez
- `GET /clientes/filtro/avancado?cidade=<cidade>` - Buscar clientes por cidade
- `DELETE /clientes/limpeza/sem-email` - Remover clientes sem e-mail
- `PATCH /clientes/:idCliente/enderecos/:idEndereco` - Atualizar CEP de um endereço do cliente

### Produtos

- `POST /produtos` - Criar produto
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID
- `PUT /produtos/:id` - Atualizar produto por ID
- `DELETE /produtos/:id` - Excluir produto por ID
- `POST /produtos/lote` - Inserir vários produtos de uma vez
- `GET /produtos/filtro/avancado?estoqueMin=<valor>` - Buscar produtos por estoque mínimo
- `DELETE /produtos/limpeza/esgotados` - Remover produtos com estoque zerado
- `PATCH /produtos/:idProduto/especificacoes/:idEspecificacao` - Atualizar especificação do produto

### Pedidos

- `POST /pedidos` - Criar pedido
- `GET /pedidos` - Listar todos os pedidos
- `GET /pedidos/:id` - Buscar pedido por ID
- `PUT /pedidos/:id` - Atualizar pedido por ID
- `DELETE /pedidos/:id` - Excluir pedido por ID
- `POST /pedidos/lote` - Inserir vários pedidos de uma vez
- `GET /pedidos/filtro/avancado?status=<status>` - Buscar pedidos por status
- `DELETE /pedidos/limpeza/cancelados` - Remover pedidos cancelados
- `PATCH /pedidos/:idPedido/itens/:idProduto` - Atualizar quantidade de um item em um pedido

### Relatórios

- `GET /relatorios/faturamento-clientes` - Faturamento total por cliente
- `GET /relatorios/produtos-mais-vendidos` - Top 5 produtos mais vendidos
- `GET /relatorios/distribuicao-categorias` - Distribuição de produtos por categoria
- `GET /relatorios/ticket-medio` - Ticket médio por status de pedido

## Modelos de dados

### Categoria

- `nome` (String, obrigatório)
- `descricao` (String)
- `ativa` (Boolean, padrão `true`)
- `tags` (Array de Strings)
- `createdAt`, `updatedAt`

### Cliente

- `nome` (String, obrigatório)
- `email` (String, obrigatório, único)
- `cpf` (String, obrigatório, único)
- `telefone` (String)
- `endereco` (String)
- `createdAt`, `updatedAt`

### Produto

- `nome` (String, obrigatório)
- `descricao` (String)
- `preco` (Number, obrigatório)
- `estoque` (Number, padrão `0`)
- `categoria` (ObjectId referenciando `Categoria`, obrigatório)
- `createdAt`, `updatedAt`

### Pedido

- `cliente` (ObjectId referenciando `Cliente`, obrigatório)
- `produtos` (Array de itens com `produto`, `quantidade`, `precoUnitario`)
- `total` (Number, obrigatório)
- `status` (String, enum: `Pendente`, `Aprovado`, `Enviado`, `Entregue`, `Cancelado`)
- `createdAt`, `updatedAt`

## Observações

- A conexão com o MongoDB é feita em `src/config/dbConnection.js` usando o banco local `e-commerce`.
- O servidor inicia na porta `3000`.
- O projeto não possui testes automatizados configurados atualmente.
- Alguns controladores referenciam campos como `quantidadeEstoque`, `valorTotal` e `enderecos`, que podem não corresponder exatamente aos modelos definidos. Ajustes podem ser necessários para sincronizar os modelos com a lógica dos controladores.

## Contato

- Repositório: https://github.com/Samukaka01/ecommerce-bd3
