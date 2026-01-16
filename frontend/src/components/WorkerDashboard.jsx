import { useUser } from "@clerk/clerk-react";
import { Package, ClipboardCheck, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function WorkerDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const workerStats = [
    { title: "Assigned Tasks", value: "8", icon: ClipboardCheck, color: "bg-blue-500" },
    { title: "Completed", value: "24", icon: CheckCircle, color: "bg-green-500" },
    { title: "In Progress", value: "3", icon: Clock, color: "bg-orange-500" },
    { title: "Items Handled", value: "156", icon: Package, color: "bg-purple-500" },
  ];

  const tasks = [
    { id: 1, title: "Pick Order #1234", status: "pending", priority: "high" },
    { id: 2, title: "Pack Order #1235", status: "in-progress", priority: "medium" },
    { id: 3, title: "Quality Check Items", status: "pending", priority: "low" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Worker Dashboard
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Welcome back, {user?.firstName}! Here are your assigned tasks.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {workerStats.map((stat, index) => {
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

          {/* Task List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              My Tasks
            </h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-slate-400 capitalize">
                        Status: {task.status.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : task.priority === "medium"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
