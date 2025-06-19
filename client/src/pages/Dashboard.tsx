import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Clock, 
  Package, 
  Users as UsersIcon,
  ShoppingCart,
  UserPlus,
  Plus,
  FileText,
  AlertTriangle
} from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: lowStockProducts } = useQuery({
    queryKey: ["/api/products/low-stock"],
  });

  if (metricsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendas do Mês</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(metrics?.monthlySales || 0)}
                </p>
                <p className="text-sm text-success mt-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +12,5% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.pendingOrders || 0}
                </p>
                <p className="text-sm text-warning mt-1">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {metrics?.overdueCount || 0} atrasados
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos em Estoque</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.productsInStock || 0}
                </p>
                <p className="text-sm text-destructive mt-1">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {metrics?.lowStockCount || 0} com estoque baixo
                </p>
              </div>
              <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.activeCustomers || 0}
                </p>
                <p className="text-sm text-success mt-1">
                  <UserPlus className="w-4 h-4 inline mr-1" />
                  +8 novos esta semana
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Faturamento dos Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Gráfico de Faturamento</p>
                <p className="text-xs">Chart.js implementação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full flex items-center justify-between p-4 h-auto bg-accent/10 hover:bg-accent/20 text-gray-700 border-0" 
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Nova Venda</span>
              </div>
            </Button>

            <Button 
              className="w-full flex items-center justify-between p-4 h-auto bg-success/10 hover:bg-success/20 text-gray-700 border-0" 
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center mr-3">
                  <UserPlus className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Novo Cliente</span>
              </div>
            </Button>

            <Button 
              className="w-full flex items-center justify-between p-4 h-auto bg-info/10 hover:bg-info/20 text-gray-700 border-0" 
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center mr-3">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Novo Produto</span>
              </div>
            </Button>

            <Button 
              className="w-full flex items-center justify-between p-4 h-auto bg-purple-100 hover:bg-purple-200 text-gray-700 border-0" 
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Gerar Relatório</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales Placeholder */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vendas Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JM</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">João Martins</p>
                    <p className="text-sm text-gray-500">Hoje, 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">R$ 2.450,00</p>
                  <p className="text-sm text-success">Pago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alertas de Estoque</CardTitle>
              <span className="bg-destructive text-white text-xs px-2 py-1 rounded-full">
                {metrics?.lowStockCount || 0} itens
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts?.slice(0, 3).map((product: any) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.nome}</p>
                      <p className="text-sm text-gray-500">{product.categoria}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-destructive">{product.estoqueAtual} unidades</p>
                    <p className="text-xs text-gray-500">Mín: {product.estoqueMinimo}</p>
                  </div>
                </div>
              ))}
              {(!lowStockProducts || lowStockProducts.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum produto com estoque baixo</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
