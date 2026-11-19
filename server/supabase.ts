import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseServiceKey) {
  client = createClient(supabaseUrl, supabaseServiceKey);
} else {
  console.warn('Supabase env vars not set — API routes will return errors until configured.');
}

export const supabase = client as SupabaseClient;

export const isSupabaseConfigured = Boolean(client);

export interface User {
  id: string;
  username: string;
  nome: string;
  email: string;
  perfil: string;
  ativo: boolean;
  created_at: string;
}

export interface Customer {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  documento: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  ativo: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  nome: string;
  codigo: string | null;
  descricao: string | null;
  preco: number;
  custo: number | null;
  categoria: string | null;
  unidade: string;
  estoque_atual: number;
  estoque_minimo: number;
  ativo: boolean;
  created_at: string;
}

export interface SalesOrder {
  id: string;
  numero: string;
  customer_id: string | null;
  data_venda: string;
  status: string;
  subtotal: number;
  desconto: number;
  total: number;
  observacoes: string | null;
  vendedor_id: string | null;
  created_at: string;
}

export interface FinancialTransaction {
  id: string;
  tipo: string;
  categoria: string;
  descricao: string;
  valor: number;
  data_vencimento: string | null;
  data_pagamento: string | null;
  status: string;
  order_id: string | null;
  customer_id: string | null;
  created_at: string;
}
