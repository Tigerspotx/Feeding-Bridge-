
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NotFound from "./pages/NotFound";
import FoodMap from "./pages/FoodMap";
import ManagePickups from "./pages/ManagePickups";
import ImpactReports from "./pages/ImpactReports";
import AboutUs from "./pages/AboutUs";
import DonorHistory from "./pages/DonorHistory";
import Profile from "./pages/Profile";
import WasteClassifier from "./pages/WasteClassifier";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            <Route path="/food-map" element={<FoodMap />} />
            <Route path="/manage-pickups" element={<ManagePickups />} />
            <Route path="/impact-reports" element={<ImpactReports />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/donor-history" element={<DonorHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/waste-classifier" element={<WasteClassifier />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
