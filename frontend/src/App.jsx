import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppThemeProvider } from "./components/ThemeProvider";
import { LandingPage } from "./components/LandingPage";
import { DashboardPage } from "./components/DashboardPage";

export default function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}