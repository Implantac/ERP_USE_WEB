/*
  # Schema Inicial do ERP USE WEB
  
  ## Descrição
  Migração inicial do schema do ERP para Supabase, incluindo todas as tabelas principais
  para gestão empresarial completa com foco no mercado brasileiro.
  
  ## Novas Tabelas
  
  ### users
  Gerenciamento de usuários do sistema
  - `id` - Identificador único (UUID)
  - `username` - Nome de usuário único
  - `nome` - Nome completo
  - `email` - E-mail do usuário
  - `perfil` - Perfil de acesso (admin, usuario, vendedor)
  - `ativo` - Status do usuário
  - `created_at` - Data de criação
  
  ### customers
  Cadastro de clientes
  - `id` - Identificador único
  - `nome` - Nome/Razão social
  - `email` - E-mail de contato
  - `telefone` - Telefone
  - `documento` - CPF/CNPJ
  - `endereco`, `cidade`, `estado`, `cep` - Dados de endereço
  - `ativo` - Status do cliente
  
  ### products
  Cadastro de produtos
  - `id` - Identificador único
  - `nome` - Nome do produto
  - `codigo` - Código único do produto
  - `descricao` - Descrição detalhada
  - `preco` - Preço de venda
  - `custo` - Custo do produto
  - `categoria` - Categoria
  - `unidade` - Unidade de medida
  - `estoque_atual` - Quantidade em estoque
  - `estoque_minimo` - Estoque mínimo para alerta
  
  ### sales_orders
  Pedidos de venda
  - `id` - Identificador único
  - `numero` - Número do pedido
  - `customer_id` - Referência ao cliente
  - `data_venda` - Data da venda
  - `status` - Status (pendente, pago, cancelado)
  - `subtotal`, `desconto`, `total` - Valores
  - `vendedor_id` - Referência ao vendedor
  
  ### sales_order_items
  Itens dos pedidos de venda
  - `id` - Identificador único
  - `order_id` - Referência ao pedido
  - `product_id` - Referência ao produto
  - `quantidade` - Quantidade vendida
  - `preco_unitario` - Preço unitário
  - `desconto` - Desconto aplicado
  - `total` - Total do item
  
  ### financial_transactions
  Transações financeiras
  - `id` - Identificador único
  - `tipo` - Tipo (entrada, saida)
  - `categoria` - Categoria da transação
  - `descricao` - Descrição
  - `valor` - Valor da transação
  - `data_vencimento`, `data_pagamento` - Datas
  - `status` - Status (pendente, pago, vencido)
  
  ## Segurança
  - RLS habilitado em todas as tabelas
  - Políticas de acesso baseadas em autenticação
  - Apenas usuários autenticados podem acessar dados
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  nome text NOT NULL,
  email text NOT NULL,
  perfil text NOT NULL DEFAULT 'usuario',
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text,
  telefone text,
  documento text,
  endereco text,
  cidade text,
  estado text,
  cep text,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  codigo text UNIQUE,
  descricao text,
  preco decimal(10, 2) NOT NULL,
  custo decimal(10, 2),
  categoria text,
  unidade text DEFAULT 'UN',
  estoque_atual integer DEFAULT 0,
  estoque_minimo integer DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create sales_orders table
CREATE TABLE IF NOT EXISTS sales_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL,
  customer_id uuid REFERENCES customers(id),
  data_venda timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pendente',
  subtotal decimal(10, 2) NOT NULL,
  desconto decimal(10, 2) DEFAULT 0,
  total decimal(10, 2) NOT NULL,
  observacoes text,
  vendedor_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create sales_order_items table
CREATE TABLE IF NOT EXISTS sales_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES sales_orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantidade integer NOT NULL,
  preco_unitario decimal(10, 2) NOT NULL,
  desconto decimal(10, 2) DEFAULT 0,
  total decimal(10, 2) NOT NULL
);

-- Create financial_transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo text NOT NULL,
  categoria text NOT NULL,
  descricao text NOT NULL,
  valor decimal(10, 2) NOT NULL,
  data_vencimento timestamptz,
  data_pagamento timestamptz,
  status text NOT NULL DEFAULT 'pendente',
  order_id uuid REFERENCES sales_orders(id),
  customer_id uuid REFERENCES customers(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for customers table
CREATE POLICY "Authenticated users can view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for products table
CREATE POLICY "Authenticated users can view products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for sales_orders table
CREATE POLICY "Authenticated users can view sales orders"
  ON sales_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sales orders"
  ON sales_orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sales orders"
  ON sales_orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sales orders"
  ON sales_orders FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for sales_order_items table
CREATE POLICY "Authenticated users can view sales order items"
  ON sales_order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sales order items"
  ON sales_order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sales order items"
  ON sales_order_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sales order items"
  ON sales_order_items FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for financial_transactions table
CREATE POLICY "Authenticated users can view financial transactions"
  ON financial_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert financial transactions"
  ON financial_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update financial transactions"
  ON financial_transactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete financial transactions"
  ON financial_transactions FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_documento ON customers(documento);
CREATE INDEX IF NOT EXISTS idx_products_codigo ON products(codigo);
CREATE INDEX IF NOT EXISTS idx_sales_orders_customer ON sales_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_sales_orders_vendedor ON sales_orders(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_sales_order_items_order ON sales_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_sales_order_items_product ON sales_order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_customer ON financial_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_order ON financial_transactions(order_id);