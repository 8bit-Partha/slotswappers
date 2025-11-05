import { useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import Requests from "@/pages/Requests";
import NotFound from "@/pages/not-found";
import { useToast } from "@/hooks/use-toast";

function App() {
  //todo: remove mock functionality
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password });
    setIsAuthenticated(true);
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log("Signup:", { name, email, password });
    setIsAuthenticated(true);
    toast({
      title: "Account created!",
      description: "Welcome to SlotSwapper.",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Login 
              onLogin={handleLogin} 
              onSwitchToSignup={() => setShowLogin(false)} 
            />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      );
    } else {
      return (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Signup 
              onSignup={handleSignup} 
              onSwitchToLogin={() => setShowLogin(true)} 
            />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      );
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppLayout onLogout={handleLogout}>
          <Switch>
            <Route path="/" component={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/requests" component={Requests} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
