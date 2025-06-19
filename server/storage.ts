import { 
  users, customers, products, salesOrders, salesOrderItems, financialTransactions,
  type User, type InsertUser,
  type Customer, type InsertCustomer, 
  type Product, type InsertProduct,
  type SalesOrder, type InsertSalesOrder,
  type SalesOrderItem, type InsertSalesOrderItem,
  type FinancialTransaction, type InsertFinancialTransaction
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Customers
  getCustomer(id: number): Promise<Customer | undefined>;
  getAllCustomers(): Promise<Customer[]>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;

  // Products
  getProduct(id: number): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  getLowStockProducts(): Promise<Product[]>;

  // Sales Orders
  getSalesOrder(id: number): Promise<SalesOrder | undefined>;
  getAllSalesOrders(): Promise<SalesOrder[]>;
  createSalesOrder(order: InsertSalesOrder): Promise<SalesOrder>;
  updateSalesOrder(id: number, order: Partial<InsertSalesOrder>): Promise<SalesOrder | undefined>;
  deleteSalesOrder(id: number): Promise<boolean>;

  // Sales Order Items
  getSalesOrderItems(orderId: number): Promise<SalesOrderItem[]>;
  createSalesOrderItem(item: InsertSalesOrderItem): Promise<SalesOrderItem>;
  deleteSalesOrderItem(id: number): Promise<boolean>;

  // Financial Transactions
  getFinancialTransaction(id: number): Promise<FinancialTransaction | undefined>;
  getAllFinancialTransactions(): Promise<FinancialTransaction[]>;
  createFinancialTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction>;
  updateFinancialTransaction(id: number, transaction: Partial<InsertFinancialTransaction>): Promise<FinancialTransaction | undefined>;
  deleteFinancialTransaction(id: number): Promise<boolean>;

  // Dashboard metrics
  getDashboardMetrics(): Promise<{
    monthlySales: number;
    pendingOrders: number;
    productsInStock: number;
    activeCustomers: number;
    lowStockCount: number;
    overdueCount: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private customers: Map<number, Customer> = new Map();
  private products: Map<number, Product> = new Map();
  private salesOrders: Map<number, SalesOrder> = new Map();
  private salesOrderItems: Map<number, SalesOrderItem> = new Map();
  private financialTransactions: Map<number, FinancialTransaction> = new Map();
  
  private currentUserId = 1;
  private currentCustomerId = 1;
  private currentProductId = 1;
  private currentSalesOrderId = 1;
  private currentSalesOrderItemId = 1;
  private currentFinancialTransactionId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create default admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
      nome: "Administrador",
      email: "admin@usesistemas.com.br",
      perfil: "admin",
      ativo: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Initialize with some sample data for demonstration
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample customers
    const customer1: Customer = {
      id: this.currentCustomerId++,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      documento: "123.456.789-01",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
      ativo: true,
      createdAt: new Date(),
    };
    this.customers.set(customer1.id, customer1);

    const customer2: Customer = {
      id: this.currentCustomerId++,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
      documento: "987.654.321-09",
      endereco: "Av. Principal, 456",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      cep: "20000-000",
      ativo: true,
      createdAt: new Date(),
    };
    this.customers.set(customer2.id, customer2);

    // Sample products
    const product1: Product = {
      id: this.currentProductId++,
      nome: "Notebook Dell Inspiron",
      codigo: "NB001",
      descricao: "Notebook Dell Inspiron 15 3000",
      preco: "2500.00",
      custo: "2000.00",
      categoria: "Eletrônicos",
      unidade: "UN",
      estoqueAtual: 5,
      estoqueMinimo: 10,
      ativo: true,
      createdAt: new Date(),
    };
    this.products.set(product1.id, product1);

    const product2: Product = {
      id: this.currentProductId++,
      nome: "Mouse Logitech MX",
      codigo: "MS001",
      descricao: "Mouse Logitech MX Master 3",
      preco: "350.00",
      custo: "280.00",
      categoria: "Periféricos",
      unidade: "UN",
      estoqueAtual: 12,
      estoqueMinimo: 15,
      ativo: true,
      createdAt: new Date(),
    };
    this.products.set(product2.id, product2);
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      ativo: insertUser.ativo ?? true,
      perfil: insertUser.perfil ?? "usuario",
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Customers
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values()).filter(c => c.ativo);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const customer: Customer = {
      ...insertCustomer,
      id: this.currentCustomerId++,
      email: insertCustomer.email ?? null,
      telefone: insertCustomer.telefone ?? null,
      documento: insertCustomer.documento ?? null,
      endereco: insertCustomer.endereco ?? null,
      cidade: insertCustomer.cidade ?? null,
      estado: insertCustomer.estado ?? null,
      cep: insertCustomer.cep ?? null,
      ativo: insertCustomer.ativo ?? true,
      createdAt: new Date(),
    };
    this.customers.set(customer.id, customer);
    return customer;
  }

  async updateCustomer(id: number, updateData: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;

    const updatedCustomer = { ...customer, ...updateData };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const customer = this.customers.get(id);
    if (!customer) return false;

    const updatedCustomer = { ...customer, ativo: false };
    this.customers.set(id, updatedCustomer);
    return true;
  }

  // Products
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.ativo);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      ...insertProduct,
      id: this.currentProductId++,
      codigo: insertProduct.codigo ?? null,
      descricao: insertProduct.descricao ?? null,
      custo: insertProduct.custo ?? null,
      categoria: insertProduct.categoria ?? null,
      unidade: insertProduct.unidade ?? "UN",
      estoqueAtual: insertProduct.estoqueAtual ?? 0,
      estoqueMinimo: insertProduct.estoqueMinimo ?? 0,
      ativo: insertProduct.ativo ?? true,
      createdAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = this.products.get(id);
    if (!product) return false;

    const updatedProduct = { ...product, ativo: false };
    this.products.set(id, updatedProduct);
    return true;
  }

  async getLowStockProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.ativo && (p.estoqueAtual ?? 0) <= (p.estoqueMinimo ?? 0));
  }

  // Sales Orders
  async getSalesOrder(id: number): Promise<SalesOrder | undefined> {
    return this.salesOrders.get(id);
  }

  async getAllSalesOrders(): Promise<SalesOrder[]> {
    return Array.from(this.salesOrders.values());
  }

  async createSalesOrder(insertOrder: InsertSalesOrder): Promise<SalesOrder> {
    const order: SalesOrder = {
      ...insertOrder,
      id: this.currentSalesOrderId++,
      customerId: insertOrder.customerId ?? null,
      dataVenda: insertOrder.dataVenda ?? new Date(),
      status: insertOrder.status ?? "pendente",
      desconto: insertOrder.desconto ?? "0",
      observacoes: insertOrder.observacoes ?? null,
      vendedorId: insertOrder.vendedorId ?? null,
      createdAt: new Date(),
    };
    this.salesOrders.set(order.id, order);
    return order;
  }

  async updateSalesOrder(id: number, updateData: Partial<InsertSalesOrder>): Promise<SalesOrder | undefined> {
    const order = this.salesOrders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, ...updateData };
    this.salesOrders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteSalesOrder(id: number): Promise<boolean> {
    return this.salesOrders.delete(id);
  }

  // Sales Order Items
  async getSalesOrderItems(orderId: number): Promise<SalesOrderItem[]> {
    return Array.from(this.salesOrderItems.values())
      .filter(item => item.orderId === orderId);
  }

  async createSalesOrderItem(insertItem: InsertSalesOrderItem): Promise<SalesOrderItem> {
    const item: SalesOrderItem = {
      ...insertItem,
      id: this.currentSalesOrderItemId++,
      orderId: insertItem.orderId ?? null,
      productId: insertItem.productId ?? null,
      desconto: insertItem.desconto ?? "0",
    };
    this.salesOrderItems.set(item.id, item);
    return item;
  }

  async deleteSalesOrderItem(id: number): Promise<boolean> {
    return this.salesOrderItems.delete(id);
  }

  // Financial Transactions
  async getFinancialTransaction(id: number): Promise<FinancialTransaction | undefined> {
    return this.financialTransactions.get(id);
  }

  async getAllFinancialTransactions(): Promise<FinancialTransaction[]> {
    return Array.from(this.financialTransactions.values());
  }

  async createFinancialTransaction(insertTransaction: InsertFinancialTransaction): Promise<FinancialTransaction> {
    const transaction: FinancialTransaction = {
      ...insertTransaction,
      id: this.currentFinancialTransactionId++,
      status: insertTransaction.status ?? "pendente",
      customerId: insertTransaction.customerId ?? null,
      orderId: insertTransaction.orderId ?? null,
      dataVencimento: insertTransaction.dataVencimento ?? null,
      dataPagamento: insertTransaction.dataPagamento ?? null,
      createdAt: new Date(),
    };
    this.financialTransactions.set(transaction.id, transaction);
    return transaction;
  }

  async updateFinancialTransaction(id: number, updateData: Partial<InsertFinancialTransaction>): Promise<FinancialTransaction | undefined> {
    const transaction = this.financialTransactions.get(id);
    if (!transaction) return undefined;

    const updatedTransaction = { ...transaction, ...updateData };
    this.financialTransactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  async deleteFinancialTransaction(id: number): Promise<boolean> {
    return this.financialTransactions.delete(id);
  }

  // Dashboard metrics
  async getDashboardMetrics() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlySales = Array.from(this.salesOrders.values())
      .filter(order => {
        const orderDate = new Date(order.dataVenda || '');
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear &&
               order.status === 'pago';
      })
      .reduce((total, order) => total + parseFloat(order.total), 0);

    const pendingOrders = Array.from(this.salesOrders.values())
      .filter(order => order.status === 'pendente').length;

    const productsInStock = Array.from(this.products.values())
      .filter(p => p.ativo)
      .reduce((total, product) => total + (product.estoqueAtual ?? 0), 0);

    const activeCustomers = Array.from(this.customers.values())
      .filter(c => c.ativo).length;

    const lowStockCount = (await this.getLowStockProducts()).length;

    const overdueTransactions = Array.from(this.financialTransactions.values())
      .filter(t => {
        if (!t.dataVencimento || t.status === 'pago') return false;
        return new Date(t.dataVencimento) < new Date();
      }).length;

    return {
      monthlySales,
      pendingOrders,
      productsInStock,
      activeCustomers,
      lowStockCount,
      overdueCount: overdueTransactions,
    };
  }
}

export const storage = new MemStorage();
