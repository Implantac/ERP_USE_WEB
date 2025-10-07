import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          nome: string;
          email: string;
          perfil: string;
          ativo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          nome: string;
          email: string;
          perfil?: string;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          nome?: string;
          email?: string;
          perfil?: string;
          ativo?: boolean;
          created_at?: string;
        };
      };
      customers: {
        Row: {
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
        };
        Insert: {
          id?: string;
          nome: string;
          email?: string | null;
          telefone?: string | null;
          documento?: string | null;
          endereco?: string | null;
          cidade?: string | null;
          estado?: string | null;
          cep?: string | null;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          email?: string | null;
          telefone?: string | null;
          documento?: string | null;
          endereco?: string | null;
          cidade?: string | null;
          estado?: string | null;
          cep?: string | null;
          ativo?: boolean;
          created_at?: string;
        };
      };
      products: {
        Row: {
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
        };
        Insert: {
          id?: string;
          nome: string;
          codigo?: string | null;
          descricao?: string | null;
          preco: number;
          custo?: number | null;
          categoria?: string | null;
          unidade?: string;
          estoque_atual?: number;
          estoque_minimo?: number;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          codigo?: string | null;
          descricao?: string | null;
          preco?: number;
          custo?: number | null;
          categoria?: string | null;
          unidade?: string;
          estoque_atual?: number;
          estoque_minimo?: number;
          ativo?: boolean;
          created_at?: string;
        };
      };
      sales_orders: {
        Row: {
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
        };
        Insert: {
          id?: string;
          numero: string;
          customer_id?: string | null;
          data_venda?: string;
          status?: string;
          subtotal: number;
          desconto?: number;
          total: number;
          observacoes?: string | null;
          vendedor_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          numero?: string;
          customer_id?: string | null;
          data_venda?: string;
          status?: string;
          subtotal?: number;
          desconto?: number;
          total?: number;
          observacoes?: string | null;
          vendedor_id?: string | null;
          created_at?: string;
        };
      };
      sales_order_items: {
        Row: {
          id: string;
          order_id: string | null;
          product_id: string | null;
          quantidade: number;
          preco_unitario: number;
          desconto: number;
          total: number;
        };
        Insert: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          quantidade: number;
          preco_unitario: number;
          desconto?: number;
          total: number;
        };
        Update: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          quantidade?: number;
          preco_unitario?: number;
          desconto?: number;
          total?: number;
        };
      };
      financial_transactions: {
        Row: {
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
        };
        Insert: {
          id?: string;
          tipo: string;
          categoria: string;
          descricao: string;
          valor: number;
          data_vencimento?: string | null;
          data_pagamento?: string | null;
          status?: string;
          order_id?: string | null;
          customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tipo?: string;
          categoria?: string;
          descricao?: string;
          valor?: number;
          data_vencimento?: string | null;
          data_pagamento?: string | null;
          status?: string;
          order_id?: string | null;
          customer_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
