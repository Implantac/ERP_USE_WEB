import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Dashboard from "@/pages/Dashboard";
import CRM from "@/pages/CRM";
import Products from "@/pages/Products";
import Sales from "@/pages/Sales";
import Financial from "@/pages/Financial";
import POS from "@/pages/POS";
import Production from "@/pages/Production";
import Assets from "@/pages/Assets";
import Fiscal from "@/pages/Fiscal";
import Reports from "@/pages/Reports";
import Users from "@/pages/Users";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/">
              <ProtectedRoute component={Dashboard} />
            </Route>
            <Route path="/crm">
              <ProtectedRoute component={CRM} />
            </Route>
            <Route path="/products">
              <ProtectedRoute component={Products} />
            </Route>
            <Route path="/sales">
              <ProtectedRoute component={Sales} />
            </Route>
            <Route path="/financial">
              <ProtectedRoute component={Financial} />
            </Route>
            <Route path="/pos">
              <ProtectedRoute component={POS} />
            </Route>
            <Route path="/production">
              <ProtectedRoute component={Production} />
            </Route>
            <Route path="/assets">
              <ProtectedRoute component={Assets} />
            </Route>
            <Route path="/fiscal">
              <ProtectedRoute component={Fiscal} />
            </Route>
            <Route path="/reports">
              <ProtectedRoute component={Reports} />
            </Route>
            <Route path="/users">
              <ProtectedRoute component={Users} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
