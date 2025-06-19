import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  UserCog, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
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
    title: "Relatórios",
    href: "/reports",
    icon: FileText,
  },
];

const adminItems = [
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
];

export default function Sidebar() {
  const [location] = useLocation();
  
  return (
    <aside className="w-64 bg-primary text-white flex-shrink-0 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">USE WEB ERP</h1>
            <p className="text-xs text-gray-300">Sistema Integrado</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-6 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu Principal
          </h3>
        </div>
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center px-6 py-3 text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200",
                  isActive && "bg-secondary border-r-4 border-accent text-white"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.title}
              </a>
            </Link>
          );
        })}
        
        <div className="px-6 mt-8 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Administração
          </h3>
        </div>
        
        {adminItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center px-6 py-3 text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200",
                  isActive && "bg-secondary border-r-4 border-accent text-white"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.title}
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
