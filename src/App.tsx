import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesDashboard from "./pages/SalesDashboard";
import BookingFlow from "./pages/BookingFlow";
import SignatureCapture from "./pages/SignatureCapture";
import Deliveries from "./pages/Deliveries";
import ClientPortal from "./pages/ClientPortal";
import AdminPricing from "./pages/AdminPricing";
import ReportsDashboard from "./pages/ReportsDashboard";
import NotFound from "./pages/NotFound";
import CustomerDiscounts from "./pages/CustomerDiscounts";
import Customers from "./pages/Customers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Sales Routes */}
          <Route path="/" element={<SalesDashboard />} />
          <Route path="/booking" element={<BookingFlow />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/signatures" element={<SignatureCapture />} />
          <Route path="/reports" element={<ReportsDashboard />} />
          
          {/* Client Portal */}
          <Route path="/client" element={<ClientPortal />} />
          <Route path="/client/bookings" element={<ClientPortal />} />
          <Route path="/client/documents" element={<ClientPortal />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPricing />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/analytics" element={<ReportsDashboard />} />

          <Route path="/discount" element={<CustomerDiscounts />} />
          <Route path="/customers" element={<Customers />} />
          
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
