import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Calculator, Wrench, TrendingDown, Plus, Search } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface Asset {
  id: number;
  nome: string;
  categoria: string;
  valorAquisicao: number;
  dataAquisicao: Date;
  vidaUtilAnos: number;
  depreciacaoAcumulada: number;
  valorLiquido: number;
  localizacao: string;
  status: "ativo" | "manutencao" | "baixado";
  responsavel: string;
}

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("todos");

  const assets: Asset[] = [
    {
      id: 1,
      nome: "Servidor Dell PowerEdge R730",
      categoria: "Equipamentos de TI",
      valorAquisicao: 25000.00,
      dataAquisicao: new Date("2022-03-15"),
      vidaUtilAnos: 5,
      depreciacaoAcumulada: 10000.00,
      valorLiquido: 15000.00,
      localizacao: "Data Center - Rack 01",
      status: "ativo",
      responsavel: "João Silva"
    },
    {
      id: 2,
      nome: "Empilhadeira Toyota 8FBE20",
      categoria: "Equipamentos Industriais",
      valorAquisicao: 85000.00,
      dataAquisicao: new Date("2021-08-10"),
      vidaUtilAnos: 10,
      depreciacaoAcumulada: 25500.00,
      valorLiquido: 59500.00,
      localizacao: "Galpão A - Setor 3",
      status: "manutencao",
      responsavel: "Pedro Costa"
    },
    {
      id: 3,
      nome: "Máquina de Solda Lincoln Electric",
      categoria: "Ferramentas",
      valorAquisicao: 12000.00,
      dataAquisicao: new Date("2020-11-22"),
      vidaUtilAnos: 8,
      depreciacaoAcumulada: 6000.00,
      valorLiquido: 6000.00,
      localizacao: "Oficina - Bancada 05",
      status: "ativo",
      responsavel: "Maria Santos"
    },
    {
      id: 4,
      nome: "Veículo Fiat Uno",
      categoria: "Veículos",
      valorAquisicao: 45000.00,
      dataAquisicao: new Date("2019-05-18"),
      vidaUtilAnos: 5,
      depreciacaoAcumulada: 36000.00,
      valorLiquido: 9000.00,
      localizacao: "Garagem Externa",
      status: "baixado",
      responsavel: "Ana Silva"
    }
  ];

  const categories = ["todos", "Equipamentos de TI", "Equipamentos Industriais", "Ferramentas", "Veículos", "Móveis"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-700";
      case "manutencao": return "bg-yellow-100 text-yellow-700";
      case "baixado": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo": return <Building className="h-4 w-4" />;
      case "manutencao": return <Wrench className="h-4 w-4" />;
      case "baixado": return <TrendingDown className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.categoria.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "todos" || asset.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAssets = assets.length;
  const totalValorAquisicao = assets.reduce((sum, asset) => sum + asset.valorAquisicao, 0);
  const totalDepreciacao = assets.reduce((sum, asset) => sum + asset.depreciacaoAcumulada, 0);
  const totalValorLiquido = assets.reduce((sum, asset) => sum + asset.valorLiquido, 0);
  const assetsAtivos = assets.filter(a => a.status === "ativo").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Ativos Fixos</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Ativo
        </Button>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssets}</p>
                <p className="text-xs text-gray-500">{assetsAtivos} ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Valor de Aquisição</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValorAquisicao)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Depreciação Acumulada</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDepreciacao)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Líquido</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValorLiquido)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ativo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  onClick={() => setFilterCategory(category)}
                  size="sm"
                >
                  {category === "todos" ? "Todos" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(asset.status)}>
                      {getStatusIcon(asset.status)}
                      <span className="ml-1 capitalize">{asset.status}</span>
                    </Badge>
                    <h3 className="font-semibold text-lg">{asset.nome}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Wrench className="h-4 w-4 mr-1" />
                      Manutenção
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Categoria</p>
                    <p className="font-medium">{asset.categoria}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor de Aquisição</p>
                    <p className="font-medium">{formatCurrency(asset.valorAquisicao)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data de Aquisição</p>
                    <p className="font-medium">{formatDate(asset.dataAquisicao)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vida Útil</p>
                    <p className="font-medium">{asset.vidaUtilAnos} anos</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Líquido</p>
                    <p className="font-medium text-green-600">{formatCurrency(asset.valorLiquido)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Localização</p>
                    <p className="font-medium">{asset.localizacao}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Responsável</p>
                    <p className="font-medium">{asset.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Depreciação Acumulada</p>
                    <p className="font-medium text-red-600">{formatCurrency(asset.depreciacaoAcumulada)}</p>
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