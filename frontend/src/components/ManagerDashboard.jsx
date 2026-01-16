import { useUser } from "@clerk/clerk-react";
import { Package, Users, ClipboardList, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function ManagerDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const managerStats = [
    { title: "Team Members", value: "18", icon: Users, color: "bg-blue-500" },
    { title: "Active Orders", value: "56", icon: Package, color: "bg-green-500" },
    { title: "Pending Tasks", value: "12", icon: ClipboardList, color: "bg-orange-500" },
    { title: "Efficiency", value: "94%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Manager Dashboard
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Welcome back, {user?.firstName}! Manage your team and operations.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {managerStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manager Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate("/inventory")}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left"
            >
              <Package className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Manage Inventory
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Track and update stock levels
              </p>
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left"
            >
              <ClipboardList className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                View Orders
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Monitor and manage orders
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
