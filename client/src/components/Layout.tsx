import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <p>&copy; 2024 USE Sistemas - USE WEB ERP</p>
              <span className="text-gray-300">|</span>
              <p>Versão 2.1.0</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                Sistema Online
              </span>
              <span className="text-gray-300">|</span>
              <a href="mailto:comercial@usesistemas.com.br" className="hover:text-accent">
                Suporte
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
