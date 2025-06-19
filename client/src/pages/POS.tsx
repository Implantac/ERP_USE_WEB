import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, DollarSign, Printer, Smartphone, Trash2, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  total: number;
}

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] = useState("");

  const products = [
    { id: 1, nome: "Notebook Dell Inspiron", preco: 2500.00, categoria: "Informática" },
    { id: 2, nome: "Mouse Wireless Logitech", preco: 85.00, categoria: "Informática" },
    { id: 3, nome: "Cadeira Ergonômica", preco: 450.00, categoria: "Móveis" },
    { id: 4, nome: "Teclado Mecânico", preco: 199.00, categoria: "Informática" },
    { id: 5, nome: "Monitor 24 Polegadas", preco: 899.00, categoria: "Informática" },
    { id: 6, nome: "Mesa de Escritório", preco: 320.00, categoria: "Móveis" }
  ];

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantidade: item.quantidade + 1, total: (item.quantidade + 1) * item.preco }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        quantidade: 1,
        total: product.preco
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantidade, total: quantidade * item.preco }
        : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const desconto = 0;
  const total = subtotal - desconto;

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearCart = () => {
    setCart([]);
    setCustomerName("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">POS - Ponto de Venda</h1>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-green-600">
            Sistema Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Produtos Disponíveis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Buscar produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">{product.nome}</h3>
                        <p className="text-xs text-gray-500">{product.categoria}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-600">
                            {formatCurrency(product.preco)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carrinho e Pagamento */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Carrinho de Compras</span>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Nome do Cliente (opcional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Carrinho vazio</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.nome}</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.preco)} x {item.quantidade}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={item.quantidade}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-8"
                          min="0"
                        />
                        <span className="font-bold text-sm min-w-[80px] text-right">
                          {formatCurrency(item.total)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Desconto:</span>
                  <span>{formatCurrency(desconto)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formas de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg" disabled={cart.length === 0}>
                <DollarSign className="h-4 w-4 mr-2" />
                Dinheiro
              </Button>
              <Button className="w-full" size="lg" disabled={cart.length === 0}>
                <CreditCard className="h-4 w-4 mr-2" />
                Cartão
              </Button>
              <Button className="w-full" size="lg" disabled={cart.length === 0}>
                <Smartphone className="h-4 w-4 mr-2" />
                PIX
              </Button>
              <Button variant="outline" className="w-full" size="lg" disabled={cart.length === 0}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir Cupom
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}