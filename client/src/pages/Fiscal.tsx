import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Receipt, FileText, Download, Send, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface FiscalDocument {
  id: number;
  tipo: "NFe" | "NFCe" | "CTe" | "MDFe";
  numero: string;
  serie: string;
  cliente: string;
  valor: number;
  dataEmissao: Date;
  status: "pendente" | "autorizada" | "cancelada" | "rejeitada";
  chaveAcesso: string;
  observacoes?: string;
}

export default function Fiscal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  const fiscalDocuments: FiscalDocument[] = [
    {
      id: 1,
      tipo: "NFe",
      numero: "000001",
      serie: "001",
      cliente: "João Silva",
      valor: 2500.00,
      dataEmissao: new Date("2024-01-19"),
      status: "autorizada",
      chaveAcesso: "35240114200166000187550010000000015123456789",
      observacoes: "Venda de notebook"
    },
    {
      id: 2,
      tipo: "NFCe",
      numero: "000024",
      serie: "001",
      cliente: "Maria Santos",
      valor: 85.00,
      dataEmissao: new Date("2024-01-19"),
      status: "autorizada",
      chaveAcesso: "35240114200166000187650010000000241234567890",
      observacoes: "Venda balcão"
    },
    {
      id: 3,
      tipo: "NFe",
      numero: "000002",
      serie: "001",
      cliente: "Empresa ABC Ltda",
      valor: 12750.00,
      dataEmissao: new Date("2024-01-18"),
      status: "pendente",
      chaveAcesso: "",
      observacoes: "Aguardando autorização SEFAZ"
    },
    {
      id: 4,
      tipo: "CTe",
      numero: "000001",
      serie: "057",
      cliente: "Transportadora XYZ",
      valor: 450.00,
      dataEmissao: new Date("2024-01-17"),
      status: "autorizada",
      chaveAcesso: "35240114200166000187570010000000011234567891"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "autorizada": return "bg-green-100 text-green-700";
      case "pendente": return "bg-yellow-100 text-yellow-700";
      case "cancelada": return "bg-gray-100 text-gray-700";
      case "rejeitada": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "autorizada": return <CheckCircle className="h-4 w-4" />;
      case "pendente": return <Clock className="h-4 w-4" />;
      case "cancelada": return <AlertCircle className="h-4 w-4" />;
      case "rejeitada": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "NFe": return "bg-blue-100 text-blue-700";
      case "NFCe": return "bg-purple-100 text-purple-700";
      case "CTe": return "bg-orange-100 text-orange-700";
      case "MDFe": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredDocuments = fiscalDocuments.filter(doc => {
    const matchesSearch = doc.numero.includes(searchQuery) ||
                         doc.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.chaveAcesso.includes(searchQuery);
    const matchesType = filterType === "todos" || doc.tipo === filterType;
    const matchesStatus = filterStatus === "todos" || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalDocuments = fiscalDocuments.length;
  const totalValue = fiscalDocuments.reduce((sum, doc) => sum + doc.valor, 0);
  const authorizedDocs = fiscalDocuments.filter(doc => doc.status === "autorizada").length;
  const pendingDocs = fiscalDocuments.filter(doc => doc.status === "pendente").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão Fiscal e NFe</h1>
        <div className="flex space-x-2">
          <Button>
            <Receipt className="h-4 w-4 mr-2" />
            Nova NFe
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Gerar SPED
          </Button>
        </div>
      </div>

      {/* Resumo Fiscal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Receipt className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
                <p className="text-xs text-gray-500">Este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Autorizadas</p>
                <p className="text-2xl font-bold text-gray-900">{authorizedDocs}</p>
                <p className="text-xs text-gray-500">{((authorizedDocs/totalDocuments)*100).toFixed(1)}% do total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{pendingDocs}</p>
                <p className="text-xs text-gray-500">Aguardando SEFAZ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
                <p className="text-xs text-gray-500">Faturamento mensal</p>
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
                placeholder="Buscar por número, cliente ou chave de acesso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "todos" ? "default" : "outline"}
                onClick={() => setFilterType("todos")}
                size="sm"
              >
                Todos Tipos
              </Button>
              <Button
                variant={filterType === "NFe" ? "default" : "outline"}
                onClick={() => setFilterType("NFe")}
                size="sm"
              >
                NFe
              </Button>
              <Button
                variant={filterType === "NFCe" ? "default" : "outline"}
                onClick={() => setFilterType("NFCe")}
                size="sm"
              >
                NFCe
              </Button>
              <Button
                variant={filterType === "CTe" ? "default" : "outline"}
                onClick={() => setFilterType("CTe")}
                size="sm"
              >
                CTe
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todos" ? "default" : "outline"}
                onClick={() => setFilterStatus("todos")}
                size="sm"
              >
                Todos Status
              </Button>
              <Button
                variant={filterStatus === "autorizada" ? "default" : "outline"}
                onClick={() => setFilterStatus("autorizada")}
                size="sm"
              >
                Autorizadas
              </Button>
              <Button
                variant={filterStatus === "pendente" ? "default" : "outline"}
                onClick={() => setFilterStatus("pendente")}
                size="sm"
              >
                Pendentes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos Fiscais */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Fiscais Eletrônicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getTypeColor(document.tipo)}>
                      {document.tipo}
                    </Badge>
                    <Badge className={getStatusColor(document.status)}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1 capitalize">{document.status}</span>
                    </Badge>
                    <h3 className="font-semibold text-lg">
                      {document.tipo} {document.numero}/{document.serie}
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled={document.status !== "autorizada"}>
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" disabled={document.status !== "autorizada"}>
                      <Download className="h-4 w-4 mr-1" />
                      XML
                    </Button>
                    <Button variant="outline" size="sm" disabled={document.status !== "autorizada"}>
                      <Send className="h-4 w-4 mr-1" />
                      Enviar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-medium">{document.cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor</p>
                    <p className="font-medium">{formatCurrency(document.valor)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data de Emissão</p>
                    <p className="font-medium">{formatDate(document.dataEmissao)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chave de Acesso</p>
                    <p className="font-mono text-xs">
                      {document.chaveAcesso || "Não gerada"}
                    </p>
                  </div>
                </div>

                {document.observacoes && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600">Observações</p>
                    <p className="text-sm">{document.observacoes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Painel de Configurações Fiscais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações SEFAZ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Certificado Digital</span>
              </div>
              <Badge className="bg-green-100 text-green-700">Válido até 15/12/2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Conexão SEFAZ</span>
              </div>
              <Badge className="bg-green-100 text-green-700">Online</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Configurar Certificado
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Obrigações Fiscais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">SPED Fiscal - Janeiro</span>
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Clock className="h-3 w-3 mr-1" />
                  Pendente
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SPED Contábil - Dezembro</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Enviado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">EFD-Reinf - Janeiro</span>
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Clock className="h-3 w-3 mr-1" />
                  Pendente
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Gerar Obrigações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}