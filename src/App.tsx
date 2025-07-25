import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerMenu from "./pages/customer/Menu";
import CustomerCart from "./pages/customer/Cart";
import CustomerOrders from "./pages/customer/Orders";
import CustomerProfile from "./pages/customer/Profile";
import CustomerTrack from "./pages/customer/Track";
import ClientLogin from "./pages/client/Login";
import ClientDashboard from "./pages/client/Dashboard";
import ClientOrders from "./pages/client/Orders";
import ClientMenu from "./pages/client/Menu";
import ClientPayments from "./pages/client/Payments";
import ClientSettings from "./pages/client/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Customer Routes */}
          <Route path="/menu" element={<CustomerMenu />} />
          <Route path="/cart" element={<CustomerCart />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/track" element={<CustomerTrack />} />
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientLogin />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/orders" element={<ClientOrders />} />
          <Route path="/client/menu" element={<ClientMenu />} />
          <Route path="/client/payments" element={<ClientPayments />} />
          <Route path="/client/settings" element={<ClientSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
