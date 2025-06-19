import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Factory, Clock, CheckCircle, AlertTriangle, BarChart3, Package } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface ProductionOrder {
  id: number;
  numero: string;
  produto: string;
  quantidade: number;
  status: "planejado" | "em_producao" | "concluido" | "pausado";
  dataInicio: Date;
  dataPrevisao: Date;
  responsavel: string;
  progresso: number;
}

export default function Production() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  const productionOrders: ProductionOrder[] = [
    {
      id: 1,
      numero: "OP-2024-001",
      produto: "Cadeira Ergonômica Premium",
      quantidade: 50,
      status: "em_producao",
      dataInicio: new Date("2024-01-15"),
      dataPrevisao: new Date("2024-01-25"),
      responsavel: "João Silva",
      progresso: 65
    },
    {
      id: 2,
      numero: "OP-2024-002",
      produto: "Mesa de Escritório Executive",
      quantidade: 25,
      status: "planejado",
      dataInicio: new Date("2024-01-20"),
      dataPrevisao: new Date("2024-01-30"),
      responsavel: "Maria Santos",
      progresso: 0
    },
    {
      id: 3,
      numero: "OP-2024-003",
      produto: "Estante Modular",
      quantidade: 15,
      status: "concluido",
      dataInicio: new Date("2024-01-05"),
      dataPrevisao: new Date("2024-01-15"),
      responsavel: "Pedro Costa",
      progresso: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planejado": return "bg-blue-100 text-blue-700";
      case "em_producao": return "bg-yellow-100 text-yellow-700";
      case "concluido": return "bg-green-100 text-green-700";
      case "pausado": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planejado": return <Clock className="h-4 w-4" />;
      case "em_producao": return <Factory className="h-4 w-4" />;
      case "concluido": return <CheckCircle className="h-4 w-4" />;
      case "pausado": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredOrders = productionOrders.filter(order => {
    const matchesSearch = order.produto.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.numero.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "todos" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalOrdens = productionOrders.length;
  const ordensEmProducao = productionOrders.filter(o => o.status === "em_producao").length;
  const ordensConcluidas = productionOrders.filter(o => o.status === "concluido").length;
  const eficienciaMedia = productionOrders.reduce((acc, order) => acc + order.progresso, 0) / totalOrdens;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Produção e Gestão Industrial</h1>
        <Button>
          <Factory className="h-4 w-4 mr-2" />
          Nova Ordem de Produção
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Ordens</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrdens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Em Produção</p>
                <p className="text-2xl font-bold text-gray-900">{ordensEmProducao}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{ordensConcluidas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiência Média</p>
                <p className="text-2xl font-bold text-gray-900">{eficienciaMedia.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por produto ou número da ordem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todos" ? "default" : "outline"}
                onClick={() => setFilterStatus("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === "planejado" ? "default" : "outline"}
                onClick={() => setFilterStatus("planejado")}
              >
                Planejado
              </Button>
              <Button
                variant={filterStatus === "em_producao" ? "default" : "outline"}
                onClick={() => setFilterStatus("em_producao")}
              >
                Em Produção
              </Button>
              <Button
                variant={filterStatus === "concluido" ? "default" : "outline"}
                onClick={() => setFilterStatus("concluido")}
              >
                Concluído
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ordens de Produção */}
      <Card>
        <CardHeader>
          <CardTitle>Ordens de Produção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status.replace("_", " ")}</span>
                    </Badge>
                    <h3 className="font-semibold text-lg">{order.numero}</h3>
                  </div>
                  <Button variant="outline" size="sm">
                    Visualizar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Produto</p>
                    <p className="font-medium">{order.produto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantidade</p>
                    <p className="font-medium">{order.quantidade} unidades</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Responsável</p>
                    <p className="font-medium">{order.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Previsão</p>
                    <p className="font-medium">{formatDate(order.dataPrevisao)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{order.progresso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${order.progresso}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}