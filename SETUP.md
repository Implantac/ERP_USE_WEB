# 🚀 Guia de Configuração - ERP USE WEB

## 📋 Pré-requisitos

- Node.js 22+ instalado
- Conta no [Supabase](https://supabase.com)
- Git (opcional)

## 🔧 Configuração do Projeto

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

#### 2.1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Preencha os dados:
   - **Name:** ERP USE WEB
   - **Database Password:** (escolha uma senha forte)
   - **Region:** South America (São Paulo) - para melhor performance no Brasil
5. Aguarde a criação do projeto (pode levar alguns minutos)

#### 2.2. Executar Migration do Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `/supabase/migrations/20251007174802_initial_erp_schema.sql`
4. Cole no editor SQL
5. Clique em **Run** para executar a migration
6. Verifique se todas as tabelas foram criadas com sucesso

#### 2.3. Obter Credenciais do Supabase

1. No painel do Supabase, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (exemplo: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ mantenha esta chave em segredo!)

### 3. Configurar Variáveis de Ambiente

1. Edite o arquivo `.env` na raiz do projeto
2. Substitua os valores pelas suas credenciais do Supabase:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui

# Database Configuration
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.seu-projeto.supabase.co:5432/postgres

# Node Environment
NODE_ENV=development
```

### 4. Executar o Projeto

#### Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em: **http://localhost:5000**

#### Build para Produção

```bash
npm run build
npm start
```

## 📚 Estrutura do Projeto

```
/vercel/sandbox/
├── client/              # Frontend React
│   └── src/
│       ├── components/  # Componentes reutilizáveis
│       ├── contexts/    # Contextos React (Auth, etc)
│       ├── hooks/       # Custom hooks
│       ├── lib/         # Utilitários e configurações
│       └── pages/       # Páginas do sistema
├── server/              # Backend Express
│   ├── index.ts         # Servidor principal
│   ├── routes.ts        # Rotas da API
│   ├── supabase.ts      # Cliente Supabase
│   └── storage-supabase.ts  # Camada de dados
├── shared/              # Código compartilhado
│   └── schema.ts        # Schemas e tipos
└── supabase/            # Migrations do banco
    └── migrations/
```

## 🔐 Primeiro Acesso

Após configurar o Supabase e executar o projeto:

1. Acesse **http://localhost:5000**
2. Você será redirecionado para a tela de login
3. Como ainda não há usuários, você precisará criar um usuário diretamente no Supabase:
   - Vá em **Authentication** > **Users** no painel do Supabase
   - Clique em **Add User**
   - Preencha email e senha
   - Após criar, insira um registro na tabela `users` com os dados do usuário

Ou execute este SQL no SQL Editor do Supabase (substitua os valores):

```sql
-- Criar usuário na tabela users
INSERT INTO users (id, username, nome, email, perfil, ativo)
VALUES (
  'uuid-do-usuario-criado-no-auth',
  'admin',
  'Administrador',
  'admin@usesistemas.com.br',
  'admin',
  true
);
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia servidor de produção
- `npm run check` - Verifica tipos TypeScript
- `npm run db:push` - Sincroniza schema com banco (Drizzle)

## 📞 Suporte

**USE Sistemas**  
📧 comercial@usesistemas.com.br  
📞 +55 (43) 99858-1400

## 🐛 Problemas Comuns

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe e está configurado corretamente
- Certifique-se de que as variáveis estão sem espaços extras

### Erro de conexão com banco de dados
- Verifique se a migration foi executada corretamente no Supabase
- Confirme se a URL do banco está correta no `.env`

### Página em branco após login
- Verifique o console do navegador para erros
- Certifique-se de que o usuário existe na tabela `users`
