import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { BarChart3, TrendingUp, Activity, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const demandData = [
    { month: "Jan", demand: 4200, inventory: 5100 },
    { month: "Feb", demand: 3800, inventory: 4800 },
    { month: "Mar", demand: 5100, inventory: 5600 },
    { month: "Apr", demand: 4600, inventory: 5200 },
    { month: "May", demand: 5500, inventory: 6000 },
    { month: "Jun", demand: 4900, inventory: 5400 },
];

const turnoverData = [
    { category: "Components", turnover: 8.5 },
    { category: "Equipment", turnover: 5.2 },
    { category: "Electronics", turnover: 6.8 },
    { category: "Materials", turnover: 7.3 },
];

const categoryDistribution = [
    { name: "Components", value: 35 },
    { name: "Equipment", value: 25 },
    { name: "Electronics", value: 20 },
    { name: "Materials", value: 20 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];

const analyticsKPIs = [
    { title: "Revenue", value: "$1.2M", trend: "+15.3%", icon: DollarSign, color: "from-green-500 to-green-600" },
    { title: "Avg Turnover", value: "6.95x", trend: "+8.2%", icon: Activity, color: "from-indigo-500 to-indigo-600" },
    { title: "Growth Rate", value: "12.4%", trend: "+3.1%", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
    { title: "Efficiency", value: "89.3%", trend: "+5.7%", icon: BarChart3, color: "from-blue-500 to-blue-600" },
];

export function AnalyticsPage() {
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
                                Analytics & Insights
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                Performance metrics and trend analysis
                            </p>
                        </div>
                    </div>
                </header>

                {/* Analytics Content */}
                <main className="px-8 py-8">
                    <div className="max-w-[1440px] mx-auto space-y-6">
                        {/* Analytics KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {analyticsKPIs.map((kpi, index) => {
                                const Icon = kpi.icon;
                                return (
                                    <Card
                                        key={index}
                                        className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 animate-in fade-in duration-500"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">{kpi.title}</p>
                                                <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{kpi.value}</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                                        {kpi.trend}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-slate-500">vs last quarter</span>
                                                </div>
                                            </div>
                                            <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color} shadow-lg`} style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Demand Trends */}
                            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Demand Trends
                                </h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={demandData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                        <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1e293b',
                                                border: '1px solid #334155',
                                                borderRadius: '8px',
                                                color: '#fff',
                                            }}
                                        />
                                        <Line type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} />
                                        <Line type="monotone" dataKey="inventory" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>

                            {/* Category Distribution */}
                            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Category Distribution
                                </h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={categoryDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {categoryDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1e293b',
                                                border: '1px solid #334155',
                                                borderRadius: '8px',
                                                color: '#fff',
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>

                        {/* Inventory Turnover */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Inventory Turnover by Category
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={turnoverData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                    />
                                    <Bar dataKey="turnover" fill="#6366f1" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
