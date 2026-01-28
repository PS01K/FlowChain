import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "./components/ThemeProvider";
import { LandingPage } from "./components/LandingPage";
import { SignInPage } from "./components/SignInPage";
import { SignUpPage } from "./components/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRoute } from "./components/RoleBasedRoute";
import { RoleSelectionPage } from "./components/RoleSelectionPage";
import BusinessRegistration from "./components/BusinessRegistration";
import { DashboardPage } from "./components/DashboardPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { WorkerDashboard } from "./components/WorkerDashboard";
import { InventoryPage } from "./components/InventoryPage";
import { OrdersPage } from "./components/OrdersPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { SettingsPage } from "./components/SettingsPage";
import { BotpressChat } from "./components/BotpressChat";

export default function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        {/* Botpress Webchat Widget - appears on all pages */}
        <BotpressChat />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          {/* Role Selection - Protected Route */}
          <Route
            path="/select-role"
            element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            }
          />

          {/* Business Registration - Protected Route */}
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <BusinessRegistration />
              </ProtectedRoute>
            }
          />

          {/* Role-Based Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <ManagerDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/worker"
            element={
              <RoleBasedRoute allowedRoles={['admin', 'manager', 'worker']}>
                <WorkerDashboard />
              </RoleBasedRoute>
            }
          />

          {/* Protected Routes - accessible to managers and admins */}
          <Route
            path="/inventory"
            element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <InventoryPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <OrdersPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AnalyticsPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <SettingsPage />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}