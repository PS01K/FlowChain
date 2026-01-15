import { motion } from "motion/react";
import { Package, TrendingUp, BarChart3, Zap, Network, Brain } from "lucide-react";

export function AnimatedVisuals() {
    const floatingCards = [
        { icon: Package, color: "from-indigo-500 to-indigo-600", delay: 0, x: 20, y: -20 },
        { icon: TrendingUp, color: "from-purple-500 to-purple-600", delay: 0.2, x: -30, y: 10 },
        { icon: BarChart3, color: "from-blue-500 to-blue-600", delay: 0.4, x: 15, y: 25 },
        { icon: Zap, color: "from-violet-500 to-violet-600", delay: 0.6, x: -20, y: -15 },
        { icon: Network, color: "from-indigo-400 to-purple-500", delay: 0.8, x: 25, y: 5 },
        { icon: Brain, color: "from-purple-400 to-indigo-500", delay: 1.0, x: -15, y: -25 },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-blue-500/20 blur-3xl" />

            {/* Central hub */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 dark:shadow-indigo-500/30">
                    <Package className="w-16 h-16 text-white" />
                </div>
            </motion.div>

            {/* Floating cards */}
            {floatingCards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: [card.x, card.x + 10, card.x],
                            y: [card.y, card.y - 10, card.y],
                        }}
                        transition={{
                            opacity: { duration: 0.5, delay: card.delay },
                            scale: { duration: 0.5, delay: card.delay },
                            x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                        }}
                        className="absolute"
                        style={{
                            left: `calc(50% + ${card.x * 3}px)`,
                            top: `calc(50% + ${card.y * 3}px)`,
                        }}
                    >
                        <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm border border-white/10`}>
                            <Icon className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>
                );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10">
                <motion.line
                    x1="50%" y1="50%" x2="60%" y2="40%"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.line
                    x1="50%" y1="50%" x2="40%" y2="55%"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                />
                <motion.line
                    x1="50%" y1="50%" x2="55%" y2="65%"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                />
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Dashboard preview cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-10 right-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-gray-200/50 dark:border-slate-700/50 w-64"
            >
                <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-3/4" />
                    <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full w-1/2" />
                    <div className="h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg mt-3" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-10 right-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-gray-200/50 dark:border-slate-700/50 w-48"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full w-full mb-1" />
                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full w-2/3" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
