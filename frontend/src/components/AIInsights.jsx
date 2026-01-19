import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Loader2, DollarSign, Target, Users, Tag, Zap, Rocket, Trophy, Clock, Star, MessageCircle, Send, X, Bot, User } from "lucide-react";

const iconMap = {
    recommendation: Lightbulb,
    trend: TrendingUp,
    alert: AlertTriangle,
    success: CheckCircle,
    sales: DollarSign,
    marketing: Target,
    customer: Users,
    pricing: Tag,
    urgent: Zap,
    breakthrough: Rocket,
    achievement: Trophy,
    timeline: Clock,
    premium: Star,
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
    urgent: "text-red-600",
    breakthrough: "text-indigo-600",
    achievement: "text-yellow-600",
    timeline: "text-cyan-600",
    premium: "text-pink-600",
};

// Chat Modal Component
function ChatModal({ isOpen, onClose, recommendation, userId }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Initialize chat with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                type: 'ai',
                content: `👋 Hi! I'm your AI consultant for "${recommendation?.title}".\n\nI can help you with:\n• 📋 Implementation steps\n• 💰 Costs and ROI\n• ⏱️ Timeline planning\n• ⚠️ Risks to watch for\n• 🎯 Expected benefits\n• 👥 Team requirements\n\nWhat would you like to know? 😊`,
                timestamp: new Date()
            }]);
        }
    }, [isOpen, recommendation]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/analyze/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    message: inputValue,
                    recommendationContext: recommendation
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    type: 'ai',
                    content: data.data.response,
                    timestamp: new Date(data.data.timestamp)
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: 'ai',
                    content: "I'm sorry, I couldn't process your request. Please try again.",
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'ai',
                content: "Connection error. Please check your internet connection and try again.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "How do I implement this?",
        "What's the ROI?",
        "What are the risks?",
        "Who should lead this?"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl h-[80vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">AI Assistant</h3>
                            <p className="text-xs text-white/80 truncate max-w-[300px]">
                                Discussing: {recommendation?.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            onClose();
                            setMessages([]);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 duration-200`}
                        >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user'
                                ? 'bg-indigo-100 dark:bg-indigo-900/50'
                                : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                                }`}>
                                {message.type === 'user'
                                    ? <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    : <Bot className="w-4 h-4 text-white" />
                                }
                            </div>
                            <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                                <div className={`inline-block p-4 rounded-2xl ${message.type === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-md'
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
                                    }`}>
                                    <div className="text-sm leading-relaxed">
                                        {message.content.split('\n').map((line, i) => {
                                            // Skip empty lines but add spacing
                                            if (!line.trim()) {
                                                return <div key={i} className="h-2" />;
                                            }

                                            // Style section headers (lines ending with :)
                                            const isHeader = line.trim().match(/^[🎯💡✅📊⚡📋👥🛠️⚠️💵💰📈🚀🏆⏰🔥💪🌟📌🤔]/);

                                            if (isHeader) {
                                                return (
                                                    <p key={i} className="font-semibold mt-3 mb-1 first:mt-0">
                                                        {line}
                                                    </p>
                                                );
                                            }

                                            // Style bullet points
                                            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                return (
                                                    <p key={i} className="ml-2 mb-0.5">
                                                        {line}
                                                    </p>
                                                );
                                            }

                                            // Regular text
                                            return (
                                                <p key={i} className="mb-1">
                                                    {line}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-200">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-2xl rounded-bl-md">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setInputValue(question);
                                        inputRef.current?.focus();
                                    }}
                                    className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask a question about this recommendation..."
                            className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200 placeholder-gray-400"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AIInsights({ userId }) {
    const [insights, setInsights] = useState([]);
    const [salesSuggestions, setSalesSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chatModal, setChatModal] = useState({ isOpen: false, recommendation: null });

    const openChat = (recommendation) => {
        setChatModal({ isOpen: true, recommendation });
    };

    const closeChat = () => {
        setChatModal({ isOpen: false, recommendation: null });
    };

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
        // Enhanced parsing for rich markdown format
        const sections = [];
        const lines = response.split('\n').filter(line => line.trim());

        let currentSection = null;
        let currentItems = [];

        lines.forEach(line => {
            // Detect section headers
            if (line.startsWith('# ')) {
                // Save previous section if exists
                if (currentSection) {
                    sections.push({ ...currentSection, items: currentItems });
                }
                // Start new section
                currentSection = {
                    title: line.replace('# ', '').replace(/^[🚀💰⚡🎯📈🔥💡⚡🎯]/, '').trim(),
                    type: 'header',
                    emoji: line.match(/^[🚀💰⚡🎯📈🔥💡⚡🎯]/)?.[0] || '💡',
                    items: []
                };
                currentItems = [];
            } else if (line.startsWith('## ')) {
                // Subsection
                if (currentSection) {
                    sections.push({ ...currentSection, items: currentItems });
                }
                currentSection = {
                    title: line.replace('## ', '').replace(/^[🚀💰⚡🎯📈🔥💡⚡🎯]/, '').trim(),
                    type: 'subsection',
                    emoji: line.match(/^[🚀💰⚡🎯📈🔥💡⚡🎯]/)?.[0] || '📊',
                    items: []
                };
                currentItems = [];
            } else if (line.startsWith('### ')) {
                // Recommendation item
                const title = line.replace('### ', '').trim();
                const nextLines = [];
                let i = lines.indexOf(line) + 1;

                // Collect description lines until next ### or empty line
                while (i < lines.length && !lines[i].startsWith('###') && lines[i].trim()) {
                    nextLines.push(lines[i]);
                    i++;
                }

                const description = nextLines.join(' ').replace(/\*\*Impact:\*\*|\*\*Effort:\*\*|\*\*Timeline:\*\*|\*\*Expected Result:\*\*/g, '').trim();

                currentItems.push({
                    title,
                    description,
                    type: 'recommendation',
                    impact: nextLines.find(l => l.includes('Impact:'))?.split('Impact:')[1]?.split('|')[0]?.trim(),
                    effort: nextLines.find(l => l.includes('Effort:'))?.split('Effort:')[1]?.split('|')[0]?.trim(),
                    timeline: nextLines.find(l => l.includes('Timeline:'))?.split('Timeline:')[1]?.trim(),
                    expectedResult: nextLines.find(l => l.includes('Expected Result:'))?.replace('**Expected Result:**', '').trim()
                });
            } else if (line.includes('**') && !line.startsWith('###')) {
                // Bold text items
                const cleanText = line.replace(/\*\*/g, '').trim();
                if (cleanText) {
                    currentItems.push({
                        text: cleanText,
                        type: 'insight'
                    });
                }
            } else if (line.match(/^\d+\./) && !line.startsWith('###')) {
                // Numbered list items
                currentItems.push({
                    text: line.replace(/^\d+\.\s*/, '').trim(),
                    type: 'action'
                });
            }
        });

        // Add final section
        if (currentSection) {
            sections.push({ ...currentSection, items: currentItems });
        }

        return sections;
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
            {/* Chat Modal */}
            <ChatModal
                isOpen={chatModal.isOpen}
                onClose={closeChat}
                recommendation={chatModal.recommendation}
                userId={userId}
            />

            {/* Enhanced AI Insights Display */}
            {insights.map((section, sectionIndex) => {
                const Icon = iconMap[section.type === 'header' ? 'breakthrough' : section.type === 'subsection' ? 'urgent' : 'recommendation'] || Lightbulb;
                const color = colorMap[section.type === 'header' ? 'breakthrough' : section.type === 'subsection' ? 'urgent' : 'recommendation'] || "text-blue-600";

                return (
                    <Card
                        key={sectionIndex}
                        className={`p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-700 ${section.type === 'header' ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700' : ''
                            }`}
                        style={{ animationDelay: `${sectionIndex * 150}ms` }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${section.type === 'header' ? 'bg-indigo-100 dark:bg-indigo-900/50' :
                                section.type === 'subsection' ? 'bg-amber-100 dark:bg-amber-900/50' :
                                    'bg-blue-100 dark:bg-blue-900/50'
                                }`}>
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${section.type === 'header' ? 'text-xl' : 'text-lg'
                                }`}>
                                {section.emoji} {section.title}
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {section.items.map((item, itemIndex) => {
                                if (item.type === 'recommendation') {
                                    return (
                                        <div
                                            key={itemIndex}
                                            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg border border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-200 group"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm flex-1">
                                                    {item.title}
                                                </h4>
                                                <div className="flex gap-2 ml-4">
                                                    {item.impact && (
                                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.impact.includes('High') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                            item.impact.includes('Medium') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                            }`}>
                                                            {item.impact}
                                                        </span>
                                                    )}
                                                    {item.effort && (
                                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.effort.includes('Low') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                            item.effort.includes('Medium') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                            }`}>
                                                            {item.effort}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-2">
                                                {item.description}
                                            </p>
                                            {item.expectedResult && (
                                                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700/30">
                                                    <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                                                        🎯 Expected Result: {item.expectedResult}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mt-3 flex items-center justify-between">
                                                {item.timeline && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-cyan-600" />
                                                        <span className="text-xs text-cyan-600 font-medium">
                                                            Timeline: {item.timeline}
                                                        </span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => openChat(item)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all duration-200 text-xs font-medium group/btn"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5 group-hover/btn:animate-pulse" />
                                                    Chat with AI
                                                </button>
                                            </div>
                                        </div>
                                    );
                                } else if (item.type === 'insight') {
                                    return (
                                        <div
                                            key={itemIndex}
                                            className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-200 group"
                                        >
                                            <div className="flex-shrink-0">
                                                <Star className="w-4 h-4 text-yellow-600 group-hover:drop-shadow-[0_0_4px_currentColor] transition-all duration-200" />
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                } else if (item.type === 'action') {
                                    return (
                                        <div
                                            key={itemIndex}
                                            className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-700/30 hover:border-amber-200 dark:hover:border-amber-500/50 transition-all duration-200 group"
                                        >
                                            <div className="flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-amber-600 group-hover:drop-shadow-[0_0_4px_currentColor] transition-all duration-200" />
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </Card>
                );
            })}

            {/* Sales Improvement Suggestions */}
            {salesSuggestions.length > 0 && (
                <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-green-500/10 transition-all duration-300 animate-in fade-in duration-700 delay-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-green-600" />
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
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${suggestion.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    }`}>
                                                    {suggestion.impact} Impact
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${suggestion.effort === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    suggestion.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {suggestion.effort} Effort
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-3">
                                            {suggestion.description}
                                        </p>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => openChat({
                                                    title: suggestion.title,
                                                    description: suggestion.description,
                                                    impact: suggestion.impact,
                                                    effort: suggestion.effort,
                                                    type: 'sales'
                                                })}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200 text-xs font-medium group/btn"
                                            >
                                                <MessageCircle className="w-3.5 h-3.5 group-hover/btn:animate-pulse" />
                                                Chat with AI
                                            </button>
                                        </div>
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