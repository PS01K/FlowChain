import { Card } from "./ui/card";

export function KPICard({ title, value, trend, icon: Icon, iconColor }) {
    return (
        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 animate-in fade-in duration-500">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">{title}</p>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1">
                            <span
                                className={`text-sm font-medium ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {trend.isPositive ? "↑" : "↓"} {trend.value}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-slate-500">vs last month</span>
                        </div>
                    )}
                </div>
                <div
                    className={`p-3 rounded-lg ${iconColor} shadow-lg`}
                    style={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" }}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </Card>
    );
}