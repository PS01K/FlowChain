import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Package, Warehouse, Box, AlertTriangle } from "lucide-react";

const inventoryData = [
    { id: "SKU-1001", name: "Industrial Bearings", category: "Components", stock: 1250, status: "healthy", location: "Warehouse A" },
    { id: "SKU-1002", name: "Hydraulic Pumps", category: "Equipment", stock: 87, status: "low", location: "Warehouse B" },
    { id: "SKU-1003", name: "Control Valves", category: "Components", stock: 2340, status: "overstock", location: "Warehouse A" },
    { id: "SKU-1004", name: "Electric Motors", category: "Equipment", stock: 456, status: "healthy", location: "Warehouse C" },
    { id: "SKU-1005", name: "Pressure Sensors", category: "Electronics", stock: 34, status: "critical", location: "Warehouse B" },
    { id: "SKU-1006", name: "Gear Assemblies", category: "Components", stock: 789, status: "healthy", location: "Warehouse A" },
    { id: "SKU-1007", name: "Circuit Boards", category: "Electronics", stock: 1890, status: "overstock", location: "Warehouse C" },
    { id: "SKU-1008", name: "Ball Bearings", category: "Components", stock: 156, status: "healthy", location: "Warehouse B" },
];

const stockHealthStats = [
    { title: "Healthy Stock", value: "4,523", subtitle: "Optimal levels", icon: Package, color: "from-green-500 to-green-600" },
    { title: "Low Stock", value: "142", subtitle: "Needs attention", icon: AlertTriangle, color: "from-yellow-500 to-yellow-600" },
    { title: "Overstock", value: "87", subtitle: "Excess inventory", icon: Box, color: "from-purple-500 to-purple-600" },
    { title: "Critical", value: "23", subtitle: "Immediate action", icon: AlertTriangle, color: "from-red-500 to-red-600" },
];

const warehouseStats = [
    { name: "Warehouse A", items: 2847, status: "healthy" },
    { name: "Warehouse B", items: 1923, status: "attention" },
    { name: "Warehouse C", items: 2005, status: "healthy" },
];

export function InventoryPage() {
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
                                Inventory Overview
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                Current stock levels and inventory health status
                            </p>
                        </div>
                    </div>
                </header>

                {/* Inventory Content */}
                <main className="px-8 py-8">
                    <div className="max-w-[1440px] mx-auto space-y-6">
                        {/* Stock Health Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {stockHealthStats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <Card
                                        key={index}
                                        className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-500"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">{stat.title}</p>
                                                <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                                                <p className="text-sm text-gray-500 dark:text-slate-500">{stat.subtitle}</p>
                                            </div>
                                            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`} style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Warehouse Overview */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
                                    <Warehouse className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Warehouse Distribution
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {warehouseStats.map((warehouse, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{warehouse.name}</p>
                                            <Badge
                                                className={`${warehouse.status === "healthy"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                    }`}
                                            >
                                                {warehouse.status}
                                            </Badge>
                                        </div>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{warehouse.items.toLocaleString()}</p>
                                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Total items</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Inventory Table */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Current Stock Levels
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">SKU</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Product Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Category</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Current Stock</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Health Status</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryData.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-mono">{item.id}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{item.name}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">{item.category}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-semibold">{item.stock.toLocaleString()} units</td>
                                                <td className="py-4 px-4">
                                                    <Badge
                                                        className={`${item.status === "healthy"
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                                                                : item.status === "low"
                                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"
                                                                    : item.status === "critical"
                                                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
                                                                        : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
                                                            }`}
                                                    >
                                                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${item.status === "healthy" ? "bg-green-500" :
                                                                item.status === "low" ? "bg-yellow-500" :
                                                                    item.status === "critical" ? "bg-red-500" :
                                                                        "bg-purple-500"
                                                            }`} />
                                                        {item.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">{item.location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}