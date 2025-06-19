import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getRelativeTime } from "@/lib/formatters";

interface Sale {
  id: number;
  customerName: string;
  customerInitials: string;
  amount: number;
  status: "Pago" | "Pendente";
  date: Date;
}

interface StockAlert {
  id: number;
  productName: string;
  category: string;
  stock: number;
  minStock: number;
  level: "danger" | "warning";
}

// Mock data - in real app this would come from props or API
const recentSales: Sale[] = [
  {
    id: 1,
    customerName: "João Martins",
    customerInitials: "JM",
    amount: 2450.00,
    status: "Pago",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    customerName: "Ana Santos", 
    customerInitials: "AS",
    amount: 890.50,
    status: "Pendente",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: 3,
    customerName: "Carlos Dias",
    customerInitials: "CD", 
    amount: 3750.80,
    status: "Pago",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];

const stockAlerts: StockAlert[] = [
  {
    id: 1,
    productName: "Notebook Dell Inspiron",
    category: "Eletrônicos",
    stock: 3,
    minStock: 10,
    level: "danger",
  },
  {
    id: 2,
    productName: "Mouse Logitech MX",
    category: "Periféricos", 
    stock: 8,
    minStock: 15,
    level: "warning",
  },
  {
    id: 3,
    productName: "Teclado Mecânico RGB",
    category: "Periféricos",
    stock: 1,
    minStock: 5,
    level: "danger",
  },
];

export function RecentSales() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vendas Recentes</CardTitle>
        <a href="#" className="text-accent text-sm font-medium hover:text-accent/80">
          Ver todas
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{sale.customerInitials}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{sale.customerName}</p>
                  <p className="text-sm text-gray-500">{getRelativeTime(sale.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(sale.amount)}</p>
                <p className={`text-sm ${sale.status === "Pago" ? "text-success" : "text-warning"}`}>
                  {sale.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function StockAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alertas de Estoque</CardTitle>
        <span className="bg-danger text-white text-xs px-2 py-1 rounded-full">
          {stockAlerts.length} itens
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stockAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                alert.level === "danger" 
                  ? "bg-red-50 border-red-200" 
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert.level === "danger" ? "bg-danger" : "bg-warning"
                }`}>
                  <span className="text-white text-xs">!</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{alert.productName}</p>
                  <p className="text-sm text-gray-500">{alert.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  alert.level === "danger" ? "text-danger" : "text-warning"
                }`}>
                  {alert.stock} unidade{alert.stock !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-gray-500">Mín: {alert.minStock}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
