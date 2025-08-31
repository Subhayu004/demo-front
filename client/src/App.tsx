import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Registry from "@/pages/registry";
import MRV from "@/pages/mrv";
import Blockchain from "@/pages/blockchain";
import Marketplace from "@/pages/marketplace";
import Community from "@/pages/community";
import Analytics from "@/pages/analytics";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/registry" component={Registry} />
      <Route path="/mrv" component={MRV} />
      <Route path="/blockchain" component={Blockchain} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/community" component={Community} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Header />
            <main className="p-6">
              <Router />
            </main>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
