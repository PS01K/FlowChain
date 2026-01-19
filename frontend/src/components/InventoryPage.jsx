import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Package, Warehouse, Box, AlertTriangle, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';

export function InventoryPage() {
    const { user } = useUser();
    const [inventoryData, setInventoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        const fetchInventoryData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/analyze/inventory-data/${user.primaryEmailAddress.emailAddress}`);
                const result = await response.json();

                if (result.success) {
                    setInventoryData(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Failed to fetch inventory data');
            } finally {
                setLoading(false);
            }
        };

        fetchInventoryData();
    }, [user]);

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-slate-400">Loading inventory data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-slate-400">{error}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">
                            Upload inventory documents to see your data here.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Use real data if available, otherwise show sample data
    const displayData = inventoryData || {
        inventoryHealth: 0,
        totalValue: 0,
        totalItems: 0,
        overstockCount: 0,
        understockCount: 0,
        healthyCount: 0,
        topSellingItems: [],
        overstockItems: [],
        understockItems: []
    };

    // Warehouse stats derived from inventory data
    const warehouseStats = [
        {
            name: "Main Warehouse",
            items: Math.floor(displayData.totalItems * 0.6),
            status: displayData.inventoryHealth > 70 ? "healthy" : "warning"
        },
        {
            name: "Distribution Center",
            items: Math.floor(displayData.totalItems * 0.3),
            status: displayData.inventoryHealth > 60 ? "healthy" : "warning"
        },
        {
            name: "Regional Hub",
            items: Math.floor(displayData.totalItems * 0.1),
            status: displayData.inventoryHealth > 50 ? "healthy" : "warning"
        }
    ];

    const stockHealthStats = [
        {
            title: "Healthy Stock",
            value: displayData.healthyCount.toString(),
            subtitle: "Optimal levels",
            icon: Package,
            color: "from-green-500 to-green-600"
        },
        {
            title: "Understock",
            value: displayData.understockCount.toString(),
            subtitle: "Needs replenishment",
            icon: TrendingDown,
            color: "from-yellow-500 to-yellow-600"
        },
        {
            title: "Overstock",
            value: displayData.overstockCount.toString(),
            subtitle: "Excess inventory",
            icon: Box,
            color: "from-purple-500 to-purple-600"
        },
        {
            title: "Inventory Health",
            value: `${displayData.inventoryHealth.toFixed(1)}%`,
            subtitle: "Overall score",
            icon: TrendingUp,
            color: "from-blue-500 to-blue-600"
        },
    ];
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
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Product Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Quantity</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Value</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Sales</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Turnover</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Health Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayData.topSellingItems.map((item, index) => (
                                            <tr
                                                key={`top-${index}`}
                                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{item.name}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">N/A</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">${item.value?.toLocaleString() || 'N/A'}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{item.sales?.toLocaleString() || 'N/A'}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">N/A</td>
                                                <td className="py-4 px-4">
                                                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-green-500" />
                                                        healthy
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                        {displayData.overstockItems.map((item, index) => (
                                            <tr
                                                key={`over-${index}`}
                                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{item.name}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{item.currentStock?.toLocaleString() || 'N/A'}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">${item.excessValue?.toLocaleString() || 'N/A'}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">N/A</td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">N/A</td>
                                                <td className="py-4 px-4">
                                                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                                                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-purple-500" />
                                                        overstock
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                        {displayData.understockItems.map((item, index) => (
                                            <tr
                                                key={`under-${index}`}
                                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{item.name}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{item.currentStock?.toLocaleString() || 'N/A'}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">N/A</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">N/A</td>
                                                <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">N/A</td>
                                                <td className="py-4 px-4">
                                                    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                                                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-yellow-500" />
                                                        understock
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {(!displayData.topSellingItems.length && !displayData.overstockItems.length && !displayData.understockItems.length) && (
                                <div className="text-center py-8">
                                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-slate-400">No inventory data available</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">
                                        Upload inventory documents to see your stock levels here.
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}