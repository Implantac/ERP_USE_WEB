import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Package, FileText } from "lucide-react";
import { useLocation } from "wouter";

const quickActions = [
  {
    title: "Nova Venda",
    icon: Plus,
    color: "bg-accent",
    href: "/sales",
  },
  {
    title: "Novo Cliente", 
    icon: Users,
    color: "bg-success",
    href: "/crm",
  },
  {
    title: "Novo Produto",
    icon: Package,
    color: "bg-info", 
    href: "/products",
  },
  {
    title: "Gerar Relatório",
    icon: FileText,
    color: "bg-purple-600",
    href: "/reports",
  },
];

export default function QuickActions() {
  const [, setLocation] = useLocation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start p-4 h-auto"
                onClick={() => setLocation(action.href)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
