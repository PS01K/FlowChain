import { Card } from "./ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const insights = [
    {
        type: "recommendation",
        icon: Lightbulb,
        color: "text-blue-600",
        title: "Recommended Action",
        text: "Increase inventory levels for SKU-2847 by 15% to meet projected Q2 demand surge based on historical patterns and market trends.",
    },
    {
        type: "trend",
        icon: TrendingUp,
        color: "text-purple-600",
        title: "Demand Forecast",
        text: "Demand trending upward for consumer electronics category. Expected 22% increase over next 60 days. Consider supplier negotiation.",
    },
    {
        type: "alert",
        icon: AlertTriangle,
        color: "text-amber-600",
        title: "Risk Alert",
        text: "3 critical suppliers showing delivery delays. Recommend activating backup suppliers for items: SKU-1923, SKU-4512, SKU-7834.",
    },
    {
        type: "success",
        icon: CheckCircle,
        color: "text-green-600",
        title: "Optimization Result",
        text: "Recent inventory rebalancing resulted in 18% reduction in carrying costs while maintaining 99.2% fulfillment rate.",
    },
];

export function AIInsights() {
    return (
        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI Insights & Recommendations
            </h3>
            <div className="space-y-4">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <div
                            key={index}
                            className="flex gap-3 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-200 group animate-in fade-in slide-in-from-bottom-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex-shrink-0">
                                <Icon className={`w-5 h-5 ${insight.color} group-hover:drop-shadow-[0_0_4px_currentColor] transition-all duration-200`} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                    {insight.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                    {insight.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}