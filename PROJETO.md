# 📋 Informações do Projeto - ERP USE WEB

## 🎯 Status Atual

O projeto **ERP USE WEB** está estruturado e pronto para ser executado, mas **requer configuração do Supabase** para funcionar completamente.

### ✅ O que está pronto:

1. **Estrutura completa do projeto**
   - Frontend React com TypeScript
   - Backend Express com TypeScript
   - Integração com Supabase
   - Sistema de autenticação
   - Todos os módulos principais implementados

2. **Módulos implementados:**
   - 📊 Dashboard com métricas
   - 👥 CRM (Gestão de Clientes)
   - 📦 Produtos e Estoque
   - 💰 Vendas
   - 💳 Financeiro
   - 🏪 PDV (Ponto de Venda)
   - 🏭 Produção
   - 🏢 Ativos Fixos
   - 📋 Fiscal
   - 📈 Relatórios
   - 👤 Usuários

3. **Banco de dados:**
   - Schema completo definido
   - Migration SQL pronta para execução
   - Tabelas: users, customers, products, sales_orders, sales_order_items, financial_transactions
   - Row Level Security (RLS) configurado
   - Índices para performance

4. **Documentação:**
   - README.md completo
   - SETUP.md com guia de instalação
   - .env.example com template de configuração
   - Script de verificação de ambiente

### ⚠️ O que precisa ser configurado:

1. **Criar projeto no Supabase** (gratuito)
2. **Executar a migration SQL** no banco de dados
3. **Configurar variáveis de ambiente** no arquivo .env
4. **Criar primeiro usuário** para acesso ao sistema

## 🚀 Como Executar o Projeto

### Passo 1: Verificar Dependências

As dependências já estão instaladas. Se precisar reinstalar:

```bash
npm install
```

### Passo 2: Configurar Supabase

#### 2.1. Criar Conta e Projeto

1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Clique em "New Project"
4. Preencha:
   - **Name:** ERP USE WEB
   - **Database Password:** (escolha uma senha forte e anote)
   - **Region:** South America (São Paulo)
5. Aguarde a criação (2-3 minutos)

#### 2.2. Executar Migration

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie o conteúdo de: `/vercel/sandbox/supabase/migrations/20251007174802_initial_erp_schema.sql`
4. Cole no editor e clique em **Run**
5. Verifique se apareceu "Success" e as tabelas foram criadas

#### 2.3. Obter Credenciais

1. No Supabase, vá em **Settings** > **API**
2. Copie:
   - **Project URL** (ex: https://xxxxx.supabase.co)
   - **anon public** key
   - **service_role** key (⚠️ secreta!)

### Passo 3: Configurar Variáveis de Ambiente

Edite o arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui
DATABASE_URL=postgresql://postgres:sua-senha@db.seu-projeto.supabase.co:5432/postgres
NODE_ENV=development
```

### Passo 4: Verificar Configuração

```bash
npm run check:env
```

Este comando verifica se todas as variáveis estão configuradas corretamente.

### Passo 5: Executar o Projeto

```bash
npm run dev
```

O servidor será iniciado em: **http://localhost:5000**

### Passo 6: Criar Primeiro Usuário

Como ainda não há interface de cadastro, crie o primeiro usuário no Supabase:

1. No Supabase, vá em **Authentication** > **Users**
2. Clique em **Add User** > **Create new user**
3. Preencha:
   - **Email:** admin@usesistemas.com.br
   - **Password:** (escolha uma senha)
   - **Auto Confirm User:** ✅ Marque esta opção
4. Clique em **Create User**
5. Copie o **UUID** do usuário criado

Agora execute este SQL no **SQL Editor**:

```sql
INSERT INTO users (id, username, nome, email, perfil, ativo)
VALUES (
  'cole-o-uuid-aqui',
  'admin',
  'Administrador',
  'admin@usesistemas.com.br',
  'admin',
  true
);
```

### Passo 7: Fazer Login

1. Acesse http://localhost:5000
2. Faça login com:
   - **Email:** admin@usesistemas.com.br
   - **Senha:** (a senha que você definiu)

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### users
- Usuários do sistema
- Perfis: admin, usuario, vendedor
- Controle de acesso e permissões

#### customers
- Cadastro de clientes
- Dados completos: nome, documento, endereço, contato
- Status ativo/inativo

#### products
- Cadastro de produtos
- Controle de estoque
- Preço, custo, categoria
- Alertas de estoque mínimo

#### sales_orders
- Pedidos de venda
- Vinculado a cliente e vendedor
- Status: pendente, pago, cancelado
- Cálculo de subtotal, desconto e total

#### sales_order_items
- Itens dos pedidos
- Quantidade, preço unitário, desconto
- Vinculado a produto

#### financial_transactions
- Transações financeiras
- Tipo: entrada, saída
- Status: pendente, pago, vencido
- Datas de vencimento e pagamento

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Compila para produção
npm start                # Inicia servidor de produção

# Verificações
npm run check            # Verifica tipos TypeScript
npm run check:env        # Verifica variáveis de ambiente

# Banco de Dados
npm run db:push          # Sincroniza schema (Drizzle)
```

## 🐛 Solução de Problemas

### Erro: "Missing Supabase environment variables"

**Causa:** Variáveis de ambiente não configuradas

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Execute `npm run check:env` para validar
3. Certifique-se de que copiou as credenciais corretas do Supabase

### Erro: "Failed to fetch" ou erro de rede

**Causa:** Supabase não está acessível ou URL incorreta

**Solução:**
1. Verifique se a URL do Supabase está correta
2. Teste acessando a URL no navegador
3. Verifique sua conexão com internet

### Página em branco após login

**Causa:** Usuário não existe na tabela `users`

**Solução:**
1. Verifique se executou o INSERT na tabela users
2. Certifique-se de que o UUID corresponde ao usuário do Auth
3. Verifique o console do navegador para erros

### Erro ao executar migration

**Causa:** Tabelas já existem ou erro de sintaxe

**Solução:**
1. Se as tabelas já existem, você pode pular este passo
2. Ou delete as tabelas existentes e execute novamente
3. Verifique se copiou todo o conteúdo do arquivo SQL

## 📚 Próximos Passos

Após configurar e executar o projeto:

1. **Explore os módulos** - Navegue pelas diferentes seções do ERP
2. **Cadastre dados de teste** - Adicione clientes, produtos, etc.
3. **Teste funcionalidades** - Crie pedidos, transações financeiras
4. **Personalize** - Adapte o sistema às suas necessidades
5. **Desenvolva** - Adicione novos recursos e módulos

## 📞 Suporte

Se encontrar problemas ou tiver dúvidas:

**USE Sistemas**  
📧 comercial@usesistemas.com.br  
📱 +55 (43) 99858-1400

## 🎓 Recursos de Aprendizado

- **Supabase Docs:** https://supabase.com/docs
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Express.js:** https://expressjs.com

---

**Última atualização:** 06/11/2024  
**Versão:** 1.0.0
