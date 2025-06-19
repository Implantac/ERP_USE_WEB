import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  FileBarChart
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

export default function Reports() {
  const [reportType, setReportType] = useState("vendas");
  const [period, setPeriod] = useState("month");

  const { data: salesOrders } = useQuery({
    queryKey: ["/api/sales-orders"],
  });

  const { data: customers } = useQuery({
    queryKey: ["/api/customers"],
  });

  const { data: products } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: transactions } = useQuery({
    queryKey: ["/api/financial-transactions"],
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  // Calculate report data
  const generateSalesReport = () => {
    if (!salesOrders) return [];
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (period) {
      case "week":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return salesOrders
      .filter((order: any) => new Date(order.dataVenda) >= filterDate)
      .map((order: any) => ({
        id: order.id,
        numero: order.numero,
        cliente: order.customerId ? `Cliente ${order.customerId}` : "N/A",
        data: order.dataVenda,
        valor: parseFloat(order.total),
        status: order.status,
      }));
  };

  const generateCustomersReport = () => {
    if (!customers) return [];
    
    return customers.map((customer: any) => ({
      id: customer.id,
      nome: customer.nome,
      email: customer.email || "N/A",
      telefone: customer.telefone || "N/A",
      cidade: customer.cidade || "N/A",
      status: customer.ativo ? "Ativo" : "Inativo",
    }));
  };

  const generateProductsReport = () => {
    if (!products) return [];
    
    return products.map((product: any) => ({
      id: product.id,
      nome: product.nome,
      categoria: product.categoria || "N/A",
      preco: parseFloat(product.preco),
      estoque: product.estoqueAtual,
      status: product.estoqueAtual <= product.estoqueMinimo ? "Estoque Baixo" : "Normal",
    }));
  };

  const generateFinancialReport = () => {
    if (!transactions) return [];
    
    return transactions.map((transaction: any) => ({
      id: transaction.id,
      descricao: transaction.descricao,
      tipo: transaction.tipo,
      categoria: transaction.categoria,
      valor: parseFloat(transaction.valor),
      status: transaction.status,
      data: transaction.createdAt,
    }));
  };

  const getCurrentReportData = () => {
    switch (reportType) {
      case "vendas":
        return generateSalesReport();
      case "clientes":
        return generateCustomersReport();
      case "produtos":
        return generateProductsReport();
      case "financeiro":
        return generateFinancialReport();
      default:
        return [];
    }
  };

  const getReportColumns = () => {
    switch (reportType) {
      case "vendas":
        return [
          { key: "numero", label: "Pedido" },
          { key: "cliente", label: "Cliente" },
          { key: "data", label: "Data" },
          { key: "valor", label: "Valor", format: "currency" },
          { key: "status", label: "Status", format: "badge" },
        ];
      case "clientes":
        return [
          { key: "nome", label: "Nome" },
          { key: "email", label: "E-mail" },
          { key: "telefone", label: "Telefone" },
          { key: "cidade", label: "Cidade" },
          { key: "status", label: "Status", format: "badge" },
        ];
      case "produtos":
        return [
          { key: "nome", label: "Produto" },
          { key: "categoria", label: "Categoria" },
          { key: "preco", label: "Preço", format: "currency" },
          { key: "estoque", label: "Estoque" },
          { key: "status", label: "Status", format: "badge" },
        ];
      case "financeiro":
        return [
          { key: "descricao", label: "Descrição" },
          { key: "tipo", label: "Tipo" },
          { key: "categoria", label: "Categoria" },
          { key: "valor", label: "Valor", format: "currency" },
          { key: "status", label: "Status", format: "badge" },
        ];
      default:
        return [];
    }
  };

  const reportData = getCurrentReportData();
  const reportColumns = getReportColumns();

  const handleExport = () => {
    // Prepare CSV data
    const headers = reportColumns.map(col => col.label);
    const rows = reportData.map(row => 
      reportColumns.map(col => {
        const value = row[col.key as keyof typeof row];
        if (col.format === "currency" && typeof value === "number") {
          return formatCurrency(value);
        }
        if (col.format === "date" && value) {
          return formatDate(value);
        }
        return value;
      })
    );

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${reportType}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e relatórios de negócio</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendas Mês</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics?.monthlySales || 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics?.activeCustomers || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {salesOrders?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Report Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileBarChart className="w-5 h-5 mr-2" />
              Relatórios Rápidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setReportType("vendas")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatório de Vendas
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setReportType("clientes")}
            >
              <Users className="w-4 h-4 mr-2" />
              Relatório de Clientes
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setReportType("produtos")}
            >
              <Package className="w-4 h-4 mr-2" />
              Relatório de Produtos
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setReportType("financeiro")}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Relatório Financeiro
            </Button>
          </CardContent>
        </Card>

        {/* Main Report */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize">
                Relatório de {reportType}
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Última Semana</SelectItem>
                    <SelectItem value="month">Último Mês</SelectItem>
                    <SelectItem value="quarter">Último Trimestre</SelectItem>
                    <SelectItem value="year">Último Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {reportData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    {reportColumns.map((column) => (
                      <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.slice(0, 10).map((row, index) => (
                    <TableRow key={index}>
                      {reportColumns.map((column) => {
                        const value = row[column.key as keyof typeof row];
                        return (
                          <TableCell key={column.key}>
                            {column.format === "currency" && typeof value === "number" ? (
                              <span className="font-medium">{formatCurrency(value)}</span>
                            ) : column.format === "date" && value ? (
                              formatDate(value)
                            ) : column.format === "badge" ? (
                              <Badge 
                                variant={
                                  value === "Ativo" || value === "Pago" || value === "Normal" ? "default" :
                                  value === "Inativo" || value === "Cancelado" || value === "Estoque Baixo" ? "destructive" :
                                  "secondary"
                                }
                              >
                                {value}
                              </Badge>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum dado disponível para o relatório selecionado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Gráfico de Vendas</p>
                <p className="text-xs">Chart.js implementação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Gráfico de Pizza</p>
                <p className="text-xs">Chart.js implementação</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
