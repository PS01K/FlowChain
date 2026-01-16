import { motion } from "motion/react";
import { Package, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedVisuals } from "./AnimatedVisuals";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 px-8 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Package className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Flowchain AI
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-slate-400">Supply Chain Intelligence</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <ThemeToggle />
                    </motion.div>
                </div>
            </header>

            {/* Main content */}
            <div className="grid lg:grid-cols-2 min-h-screen">
                {/* Left side - Content */}
                <div className="flex items-center justify-center px-8 lg:px-16 py-24">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                AI-Powered Decision Support
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                        >
                            Generative intelligence for{" "}
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                supply chains
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg text-gray-600 dark:text-slate-400 mb-8 leading-relaxed"
                        >
                            Transform complex supply chain data into actionable insights. Optimize inventory, predict demand, and make confident decisions with AI-powered recommendations.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={() => navigate("/register")}
                                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300">
                                Learn More
                            </button>
                        </motion.div>

                        {/* Stats */}
                        {/* <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200 dark:border-slate-800"
                        >
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">95%</div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Accuracy</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">40%</div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Cost Reduction</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
                                <div className="text-sm text-gray-600 dark:text-slate-400">Monitoring</div>
                            </div>
                        </motion.div> */}
                    </div>
                </div>

                {/* Right side - Animated visuals */}
                <div className="relative hidden lg:flex items-start justify-end ">
                    <div className="bottom-36 left-10 size-full max-w-3xl scale-125">
                        <Spline scene="https://prod.spline.design/DaDl95Bgg-CxMdJT/scene.splinecode" />
                    </div>
                </div>
            </div>

            
        </div>
    );
}