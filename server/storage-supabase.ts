import { supabase, type User, type Customer, type Product, type SalesOrder, type FinancialTransaction } from './supabase';

export const storage = {
  async getDashboardMetrics() {
    const [salesResult, ordersResult, productsResult, customersResult] = await Promise.all([
      supabase.from('sales_orders').select('total').eq('status', 'pago'),
      supabase.from('sales_orders').select('id, status').eq('status', 'pendente'),
      supabase.from('products').select('id, estoque_atual, estoque_minimo').eq('ativo', true),
      supabase.from('customers').select('id').eq('ativo', true)
    ]);

    const monthlySales = salesResult.data?.reduce((sum, order) => sum + parseFloat(order.total as any), 0) || 0;
    const pendingOrders = ordersResult.data?.length || 0;
    const productsInStock = productsResult.data?.length || 0;
    const lowStockCount = productsResult.data?.filter(p => p.estoque_atual <= p.estoque_minimo).length || 0;
    const activeCustomers = customersResult.data?.length || 0;

    return {
      monthlySales,
      pendingOrders,
      productsInStock,
      lowStockCount,
      activeCustomers,
      overdueCount: 0
    };
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as User[];
  },

  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  async updateUser(id: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  async getAllCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Customer[];
  },

  async createCustomer(customerData: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  },

  async updateCustomer(id: string, customerData: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(customerData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  },

  async deleteCustomer(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async getLowStockProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('ativo', true)
      .order('estoque_atual', { ascending: true });

    if (error) throw error;

    return (data as Product[]).filter(p => p.estoque_atual <= p.estoque_minimo);
  },

  async createProduct(productData: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async updateProduct(id: string, productData: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async getAllSalesOrders() {
    const { data, error } = await supabase
      .from('sales_orders')
      .select(`
        *,
        customer:customers(*),
        vendedor:users(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createSalesOrder(orderData: Partial<SalesOrder>) {
    const { data, error } = await supabase
      .from('sales_orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data as SalesOrder;
  },

  async updateSalesOrder(id: string, orderData: Partial<SalesOrder>) {
    const { data, error } = await supabase
      .from('sales_orders')
      .update(orderData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as SalesOrder;
  },

  async getAllFinancialTransactions() {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select(`
        *,
        customer:customers(*),
        order:sales_orders(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createFinancialTransaction(transactionData: Partial<FinancialTransaction>) {
    const { data, error } = await supabase
      .from('financial_transactions')
      .insert([transactionData])
      .select()
      .single();

    if (error) throw error;
    return data as FinancialTransaction;
  },

  async updateFinancialTransaction(id: string, transactionData: Partial<FinancialTransaction>) {
    const { data, error } = await supabase
      .from('financial_transactions')
      .update(transactionData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as FinancialTransaction;
  }
};
