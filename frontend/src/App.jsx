import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "./components/ThemeProvider";
import { LandingPage } from "./components/LandingPage";
import BusinessRegistration from "./components/BusinessRegistration";
import { DashboardPage } from "./components/DashboardPage";
import { InventoryPage } from "./components/InventoryPage";
import { OrdersPage } from "./components/OrdersPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { SettingsPage } from "./components/SettingsPage";

export default function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<BusinessRegistration />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}