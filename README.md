# Stox API 🚀

A **Stox API** é o motor por trás do ecossistema Stox, um sistema robusto de gerenciamento de estoque e controle empresarial multi-tenant. Construída com foco em escalabilidade e tempo real, a API gerencia desde o controle rigoroso de lotes e validades até a comunicação interna entre colaboradores através de WebSockets.

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express](https://expressjs.com/pt-br/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
- **Real-time:** [Socket.io](https://socket.io/)
- **Comunicação:** [Nodemailer](https://nodemailer.com/)

## ✨ Funcionalidades Principais

- **Multi-tenancy:** Isolamento completo de dados por empresa.
- **Gestão de Inventário:** Controle de produtos, estoques mínimos/máximos e localização.
- **Rastreabilidade de Lotes:** Monitoramento de números de lote e datas de validade.
- **Campos Customizados:** Flexibilidade para adicionar metadados específicos a produtos.
- **Logs de Auditoria:** Histórico detalhado de criações, edições e exclusões (quem, quando e o quê).
- **Chat em Tempo Real:** Comunicação instantânea global (empresa) ou privada entre usuários.
- **Gestão de Fornecedores e Categorias:** Organização estruturada do catálogo.
- **RBAC (Role-Based Access Control):** Diferentes níveis de acesso para Administradores e Colaboradores.

## 📂 Estrutura do Projeto

```text
src/
├── controllers/    # Lógica de controle das requisições
├── lib/            # Configurações de bibliotecas (Prisma, etc)
├── routes/         # Definição dos endpoints da API
├── services/       # Regras de negócio e integrações
├── generated/      # Código gerado pelo Prisma
├── app.ts          # Configuração do Express e Middlewares
└── server.ts       # Inicialização do servidor e WebSockets
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18+)
- MongoDB (Local ou Atlas)
- Yarn ou NPM

### Instalação

1. Clone o repositório e acesse a pasta:
   ```bash
   cd stox-api
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz seguindo o exemplo abaixo:
   ```env
   DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/stox?retryWrites=true&w=majority"
   ```

4. Gere o cliente do Prisma:
   ```bash
   npx prisma generate
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   yarn dev
   ```
   A API estará disponível em `http://localhost:3333`.

## 🔌 Endpoints de WebSocket

A API utiliza Sockets para funcionalidades de chat:
- `join_company`: Associa o socket a uma empresa e usuário específico.
- `send_message`: Envia mensagens globais ou privadas.
- `receive_message`: Evento disparado para os clientes ao receber uma nova mensagem.

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

---
Desenvolvido por [WorkDantas](https://github.com/workdantas)
