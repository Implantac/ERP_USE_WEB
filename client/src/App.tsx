import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";

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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/crm" component={CRM} />
        <Route path="/products" component={Products} />
        <Route path="/sales" component={Sales} />
        <Route path="/financial" component={Financial} />
        <Route path="/pos" component={POS} />
        <Route path="/production" component={Production} />
        <Route path="/assets" component={Assets} />
        <Route path="/fiscal" component={Fiscal} />
        <Route path="/reports" component={Reports} />
        <Route path="/users" component={Users} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
