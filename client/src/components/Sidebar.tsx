import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  UserCog, 
  Settings,
  Calculator,
  Factory,
  Building,
  Receipt
} from "lucide-react";
// Logo will be loaded directly via public path

const navigationItems = [
  {
    title: "Menu Principal",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "CRM - Clientes",
        href: "/crm",
        icon: Users,
      },
      {
        title: "Produtos & Estoque",
        href: "/products",
        icon: Package,
      },
      {
        title: "Vendas & Pedidos",
        href: "/sales",
        icon: ShoppingCart,
      },
      {
        title: "Financeiro",
        href: "/financial",
        icon: DollarSign,
      },
      {
        title: "POS - Ponto de Venda",
        href: "/pos",
        icon: Calculator,
      },
      {
        title: "Produção",
        href: "/production",
        icon: Factory,
      },
      {
        title: "Ativos Fixos",
        href: "/assets",
        icon: Building,
      },
      {
        title: "Fiscal & NFe",
        href: "/fiscal",
        icon: Receipt,
      },
      {
        title: "Relatórios",
        href: "/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Administração",
    items: [
      {
        title: "Usuários & Perfis",
        href: "/users",
        icon: UserCog,
      },
      {
        title: "Configurações",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/attached_assets/USE_logo_1750358428721.png" 
              alt="USE Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">ERP USE WEB</h1>
            <p className="text-xs text-gray-300">Sistema Integrado</p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        {navigationItems.map((section) => (
          <div key={section.title}>
            <div className="px-6 mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            {section.items.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-gray-200 hover:bg-sidebar-primary hover:text-white transition-all duration-200 ${
                    isActive ? "bg-sidebar-primary border-r-4 border-sidebar-accent" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
