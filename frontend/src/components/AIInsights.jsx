import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Loader2, DollarSign, Target, Users, Tag } from "lucide-react";

const iconMap = {
    recommendation: Lightbulb,
    trend: TrendingUp,
    alert: AlertTriangle,
    success: CheckCircle,
    sales: DollarSign,
    marketing: Target,
    customer: Users,
    pricing: Tag,
};

const colorMap = {
    recommendation: "text-blue-600",
    trend: "text-purple-600",
    alert: "text-amber-600",
    success: "text-green-600",
    sales: "text-green-600",
    marketing: "text-indigo-600",
    customer: "text-purple-600",
    pricing: "text-orange-600",
};

export function AIInsights({ userId }) {
    const [insights, setInsights] = useState([]);
    const [salesSuggestions, setSalesSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchInsights = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/analyze/ai-insights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        query: "Provide key insights and recommendations for supply chain optimization based on current data"
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    // Parse the response into insights
                    const parsedInsights = parseAIResponse(data.data.response);
                    setInsights(parsedInsights);

                    // Set sales suggestions if available
                    if (data.data.salesSuggestions) {
                        setSalesSuggestions(data.data.salesSuggestions);
                    }
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch AI insights');
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, [userId]);

    const parseAIResponse = (response) => {
        // Simple parsing - in reality, might need better NLP
        const lines = response.split('\n').filter(line => line.trim());
        const parsed = [];
        let currentType = 'recommendation';

        lines.forEach(line => {
            if (line.toLowerCase().includes('recommend')) currentType = 'recommendation';
            else if (line.toLowerCase().includes('trend') || line.toLowerCase().includes('forecast')) currentType = 'trend';
            else if (line.toLowerCase().includes('alert') || line.toLowerCase().includes('risk')) currentType = 'alert';
            else if (line.toLowerCase().includes('success') || line.toLowerCase().includes('optimization')) currentType = 'success';
            else if (line.trim()) {
                parsed.push({
                    type: currentType,
                    title: line.split(':')[0] || 'Insight',
                    text: line,
                });
            }
        });

        return parsed.slice(0, 4); // Limit to 4
    };

    if (loading) {
        return (
            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="ml-2 text-gray-600 dark:text-slate-400">Generating AI insights...</span>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm">
                <div className="text-center py-8">
                    <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-slate-400">{error}</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Supply Chain Insights */}
            <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    AI Supply Chain Insights
                </h3>
                <div className="space-y-4">
                    {insights.map((insight, index) => {
                        const Icon = iconMap[insight.type] || Lightbulb;
                        const color = colorMap[insight.type] || "text-blue-600";
                        return (
                            <div
                                key={index}
                                className="flex gap-3 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-200 group animate-in fade-in slide-in-from-bottom-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex-shrink-0">
                                    <Icon className={`w-5 h-5 ${color} group-hover:drop-shadow-[0_0_4px_currentColor] transition-all duration-200`} />
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

            {/* Sales Improvement Suggestions */}
            {salesSuggestions.length > 0 && (
                <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-green-500/10 transition-all duration-300 animate-in fade-in duration-700 delay-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Sales Improvement Suggestions
                    </h3>
                    <div className="space-y-4">
                        {salesSuggestions.map((suggestion, index) => {
                            const Icon = iconMap[suggestion.type] || DollarSign;
                            const color = colorMap[suggestion.type] || "text-green-600";
                            return (
                                <div
                                    key={index}
                                    className="flex gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-700/30 hover:border-green-200 dark:hover:border-green-500/50 transition-all duration-200 group animate-in fade-in slide-in-from-bottom-2"
                                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                                >
                                    <div className="flex-shrink-0">
                                        <Icon className={`w-5 h-5 ${color} group-hover:drop-shadow-[0_0_4px_currentColor] transition-all duration-200`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                {suggestion.title}
                                            </h4>
                                            <div className="flex gap-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${suggestion.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    }`}>
                                                    {suggestion.impact} Impact
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${suggestion.effort === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        suggestion.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {suggestion.effort} Effort
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                            {suggestion.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}
        </div>
    );
}