import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Clock, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";

const ordersData = [
    { id: "ORD-2024-1241", customer: "Quantum Manufacturing", items: 6, total: "$12,890", status: "pending", date: "2024-01-16", time: "2 hours ago" },
    { id: "ORD-2024-1240", customer: "Industrial Partners", items: 11, total: "$21,340", status: "shipped", date: "2024-01-16", time: "5 hours ago" },
    { id: "ORD-2024-1239", customer: "Metro Supply Chain", items: 9, total: "$18,920", status: "pending", date: "2024-01-15", time: "1 day ago" },
    { id: "ORD-2024-1238", customer: "Precision Parts Ltd", items: 22, total: "$45,670", status: "shipped", date: "2024-01-15", time: "1 day ago" },
    { id: "ORD-2024-1237", customer: "BuildRight Co.", items: 15, total: "$32,100", status: "delivered", date: "2024-01-14", time: "2 days ago" },
    { id: "ORD-2024-1236", customer: "TechCorp Solutions", items: 5, total: "$8,450", status: "delivered", date: "2024-01-14", time: "2 days ago" },
    { id: "ORD-2024-1235", customer: "Global Industries", items: 8, total: "$15,230", status: "delivered", date: "2024-01-13", time: "3 days ago" },
    { id: "ORD-2024-1234", customer: "Acme Manufacturing", items: 12, total: "$24,580", status: "delivered", date: "2024-01-12", time: "4 days ago" },
];

const orderFlowStats = [
    { title: "Pending", value: "89", subtitle: "Awaiting processing", icon: Clock, color: "from-yellow-500 to-yellow-600", stage: 1 },
    { title: "In Progress", value: "156", subtitle: "Being prepared", icon: ShoppingCart, color: "from-blue-500 to-blue-600", stage: 2 },
    { title: "Shipped", value: "234", subtitle: "In transit", icon: Truck, color: "from-purple-500 to-purple-600", stage: 3 },
    { title: "Delivered", value: "924", subtitle: "Completed", icon: CheckCircle2, color: "from-green-500 to-green-600", stage: 4 },
];

const recentActivity = [
    { order: "ORD-2024-1241", action: "Order placed", time: "2 hours ago", status: "pending" },
    { order: "ORD-2024-1240", action: "Shipped to customer", time: "5 hours ago", status: "shipped" },
    { order: "ORD-2024-1239", action: "Payment confirmed", time: "1 day ago", status: "pending" },
    { order: "ORD-2024-1238", action: "Out for delivery", time: "1 day ago", status: "shipped" },
];

export function OrdersPage() {
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
                                Orders Management
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                Track order lifecycle and fulfillment progress
                            </p>
                        </div>
                    </div>
                </header>

                {/* Orders Content */}
                <main className="px-8 py-8">
                    <div className="max-w-[1440px] mx-auto space-y-6">
                        {/* Order Flow Pipeline */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {orderFlowStats.map((stat, index) => {
                                const Icon = stat.icon;
                                const isLast = index === orderFlowStats.length - 1;
                                return (
                                    <div key={index} className="relative">
                                        <Card
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
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-gradient-to-r ${stat.color}`} style={{ width: `${(stat.stage / 4) * 100}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-slate-500">Stage {stat.stage}</span>
                                            </div>
                                        </Card>
                                        {!isLast && (
                                            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                                <ArrowRight className="w-6 h-6 text-gray-400 dark:text-slate-600" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-500">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Recent Activity
                            </h2>

                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${activity.status === "pending" ? "bg-yellow-500 animate-pulse" :
                                                    activity.status === "shipped" ? "bg-purple-500 animate-pulse" :
                                                        "bg-green-500"
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.order}</p>
                                                <p className="text-sm text-gray-600 dark:text-slate-400">{activity.action}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 dark:text-slate-500">{activity.time}</p>
                                            <Badge
                                                className={`mt-1 ${activity.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                        : activity.status === "shipped"
                                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    }`}
                                            >
                                                {activity.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Orders List */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    All Orders
                                </h2>
                                <Input
                                    placeholder="Search orders..."
                                    className="max-w-xs bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700"
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Order ID</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Customer</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Items</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Total</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Status</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersData.map((order, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-mono">{order.id}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{order.customer}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">{order.items} items</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-semibold">{order.total}</td>
                                                <td className="py-4 px-4">
                                                    <Badge
                                                        className={`${order.status === "delivered"
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                                                                : order.status === "shipped"
                                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
                                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"
                                                            }`}
                                                    >
                                                        {order.status === "pending" && <Clock className="w-3 h-3 mr-1 inline-block" />}
                                                        {order.status === "shipped" && <Truck className="w-3 h-3 mr-1 inline-block" />}
                                                        {order.status === "delivered" && <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />}
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">{order.time}</td>
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