import { KPICard } from "./KPICard";
import { DemandInventoryChart } from "./DemandInventoryChart";
import { AIInsights } from "./AIInsights";
import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { Package, TrendingDown, TrendingUp } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function DashboardPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to business registration if not completed
    if (isLoaded && user && !user.unsafeMetadata?.businessRegistrationComplete) {
      navigate("/register");
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-8 py-5 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-[1440px] mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                Real-time supply chain insights and recommendations
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="px-8 py-8">
          <div className="max-w-[1440px] mx-auto space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="Inventory Health"
                value="87.3%"
                trend={{ value: "5.2%", isPositive: true }}
                icon={Package}
                iconColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
              <KPICard
                title="Overstock Items"
                value="142"
                trend={{ value: "12", isPositive: true }}
                icon={TrendingUp}
                iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <KPICard
                title="Understock Alerts"
                value="23"
                trend={{ value: "8", isPositive: false }}
                icon={TrendingDown}
                iconColor="bg-gradient-to-br from-amber-500 to-amber-600"
              />
            </div>

            {/* Chart Section */}
            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Demand vs Inventory Trend
              </h2>
              <DemandInventoryChart />
            </Card>

            {/* AI Insights */}
            <AIInsights />
          </div>
        </main>
      </div>
    </div>
  );
}
