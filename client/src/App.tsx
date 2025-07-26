import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Optimizer from "./pages/Optimizer";
import Gear from "./pages/Gear";
import Upgrade from "./pages/Upgrade";
import EnterKey from "./pages/EnterKey";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/optimizer" component={Optimizer} />
            <Route path="/gear" component={Gear} />
            <Route path="/upgrade" component={Upgrade} />
            <Route path="/enter-key" component={EnterKey} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
