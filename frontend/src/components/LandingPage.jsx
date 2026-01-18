import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Package, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedVisuals } from "./AnimatedVisuals";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { useAuth, useUser } from "@clerk/clerk-react";
import { TimelineCard } from "../components/landing/TimelineCard";


export function LandingPage() {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    // Features scroll animation refs
    const featuresRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: featuresRef,
        offset: ["start start", "end end"],
    });

    // Features data
    const features = [
        {
            title: "Demand Forecasting",
            desc: "AI-driven forecasts using historical trends, seasonality, and external signals.",
            icon: "📈",
        },
        {
            title: "Inventory Optimization",
            desc: "Balance service levels and holding costs with intelligent stock recommendations.",
            icon: "📦",
        },
        {
            title: "Risk & Anomaly Detection",
            desc: "Detect disruptions before they impact operations.",
            icon: "⚠️",
        },
        {
            title: "AI Decision Assistant",
            desc: "Ask questions in natural language and receive explainable insights.",
            icon: "🤖",
        },
        {
            title: "Real-Time Monitoring",
            desc: "Live visibility into inventory and demand shifts.",
            icon: "⏱️",
        },
        {
            title: "Business-Aware AI",
            desc: "Recommendations adapted to your business constraints.",
            icon: "🧠",
        },
    ];

    // Card animation logic
    function cardTransforms(index) {
        const start = index * 0.15;
        const mid = start + 0.075;
        const end = start + 0.15;

        return {
            x: useTransform(
                scrollYProgress,
                [start, mid, end],
                ["60%", "0%", "-60%"]
            ),
            scale: useTransform(
                scrollYProgress,
                [start, mid, end],
                [0.9, 1.05, 0.9]
            ),
            opacity: useTransform(
                scrollYProgress,
                [start, mid, end],
                [0, 1, 0]
            ),
        };
    }

    const handleGetStarted = () => {
        if (!isSignedIn) {
            navigate("/sign-up");
        } else {
            // Check if user has completed business registration
            const hasCompletedRegistration = user?.unsafeMetadata?.businessRegistrationComplete;
            if (hasCompletedRegistration) {
                navigate("/dashboard");
            } else {
                navigate("/register");
            }
        }
    };

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
            
        {/* Enhanced Features Section */}
        <section className="relative z-10 px-8 lg:px-24 py-28">
        {/* Section header */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
        >
            <span className="inline-block mb-4 px-4 py-1 rounded-full
            bg-indigo-100 dark:bg-indigo-900/30
            text-indigo-700 dark:text-indigo-300 text-sm font-medium">
            Core Capabilities
            </span>

            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Intelligence across your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                entire supply chain
            </span>
            </h3>

            <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            From demand sensing to real-time decisions, Flowchain AI helps teams
            reduce uncertainty and act with confidence.
            </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
            {
                title: "Demand Forecasting",
                desc: "AI-driven forecasts using historical trends, seasonality, and external signals.",
                icon: "📈",
                tag: "Predict",
            },
            {
                title: "Inventory Optimization",
                desc: "Balance service levels and holding costs with intelligent stock recommendations.",
                icon: "📦",
                tag: "Optimize",
            },
            {
                title: "Risk & Anomaly Detection",
                desc: "Identify demand spikes, delays, and disruptions before they impact operations.",
                icon: "⚠️",
                tag: "Detect",
            },
            {
                title: "AI Decision Assistant",
                desc: "Ask questions in natural language and receive explainable, actionable insights.",
                icon: "🤖",
                tag: "Explain",
            },
            {
                title: "Real-Time Monitoring",
                desc: "Live visibility into inventory health, demand shifts, and performance metrics.",
                icon: "⏱️",
                tag: "Monitor",
            },
            {
                title: "Business-Aware AI",
                desc: "Recommendations tailored to your industry, scale, and operational constraints.",
                icon: "🧠",
                tag: "Adapt",
            },
            ].map((feature, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative rounded-3xl p-7
                bg-white/50 dark:bg-slate-900/50
                backdrop-blur-xl
                border border-white/30 dark:border-slate-700/40
                shadow-xl shadow-indigo-500/10
                hover:shadow-indigo-500/30"
            >
                {/* Hover gradient sheen */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent
                transition duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl
                bg-gradient-to-br from-indigo-500 to-purple-500
                text-white text-2xl shadow-lg shadow-indigo-500/30">
                {feature.icon}
                </div>

                {/* Tag */}
                <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider
                text-indigo-600 dark:text-indigo-400">
                {feature.tag}
                </span>

                {/* Title */}
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
                </p>
            </motion.div>
            ))}
        </div>
        </section>

            
            {/* Background Animated Blobs */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Blob 1 */}
            <motion.div
                className="absolute -top-40 -left-40 w-[32rem] h-[32rem]
                bg-indigo-400/30 dark:bg-indigo-600/20
                rounded-full blur-3xl"
                animate={{
                x: [0, 80, -60, 0],
                y: [0, 60, -40, 0],
                }}
                transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            />

            {/* Blob 2 */}
            <motion.div
                className="absolute top-1/4 -right-48 w-[36rem] h-[36rem]
                bg-purple-400/30 dark:bg-purple-600/20
                rounded-full blur-3xl"
                animate={{
                x: [0, -70, 50, 0],
                y: [0, -60, 70, 0],
                }}
                transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            />

            {/* Blob 3 */}
            <motion.div
                className="absolute bottom-[-6rem] left-1/3 w-[28rem] h-[28rem]
                bg-indigo-300/20 dark:bg-indigo-500/15
                rounded-full blur-3xl"
                animate={{
                x: [0, 60, -30, 0],
                y: [0, -40, 50, 0],
                }}
                transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            />
            </div>

{/* How It Works – Branching Timeline */}
<section className="relative z-10 px-8 lg:px-24 py-24">
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-3xl mx-auto mb-28"
  >
    <span className="inline-block mb-4 px-4 py-1 rounded-full
      bg-indigo-100 dark:bg-indigo-900/30
      text-indigo-700 dark:text-indigo-300 text-sm font-medium">
      How It Works
    </span>

    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      From data to{" "}
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        intelligent decisions
      </span>
    </h3>

    <p className="text-lg text-gray-600 dark:text-slate-400">
      A production-grade pipeline combining deterministic systems
      with AI-driven intelligence.
    </p>
  </motion.div>

  {/* Timeline container */}
  <div className="relative max-w-5xl mx-auto">
    {/* Central vertical line */}
{/* Tilted Squares – Data Packets */}
<div className="absolute inset-0 pointer-events-none">

  {/* LEFT – large tilted square beside right cards */}
  <motion.div
    className="absolute top-[22%] left-[8%]
    w-14 h-14
    bg-indigo-500/30
    rotate-12 rounded-lg"
    animate={{ y: [0, -16, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* LEFT – medium tilted square */}
  <motion.div
    className="absolute top-[48%] left-[14%]
    w-10 h-10
    bg-indigo-400/25
    rotate-[25deg] rounded-md"
    animate={{ y: [0, 14, 0] }}
    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* LEFT – small tilted square */}
  <motion.div
    className="absolute top-[70%] left-[18%]
    w-7 h-7
    bg-indigo-300/30
    rotate-[35deg] rounded-sm"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT – large tilted square beside left cards */}
  <motion.div
    className="absolute top-[32%] right-[8%]
    w-16 h-16
    bg-purple-500/30
    rotate-[-14deg] rounded-lg"
    animate={{ y: [0, 18, 0] }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT – medium tilted square */}
  <motion.div
    className="absolute top-[58%] right-[14%]
    w-11 h-11
    bg-purple-400/25
    rotate-[-28deg] rounded-md"
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT – small tilted square */}
  <motion.div
    className="absolute top-[78%] right-[18%]
    w-7 h-7
    bg-purple-300/30
    rotate-[-38deg] rounded-sm"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
  />
</div>

{/* Enhanced Floating 2D UI Accents */}
<div className="absolute inset-0 pointer-events-none">

  {/* LEFT TOP – large dots grid */}
  <motion.div
    className="absolute top-20 left-0 w-44 h-44
    bg-[radial-gradient(circle,rgba(99,102,241,0.35)_1.5px,transparent_1.5px)]
    [background-size:18px_18px]"
    animate={{ y: [0, -24, 0] }}
    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* LEFT MID – medium dots grid */}
  <motion.div
    className="absolute top-1/2 left-16 w-36 h-36
    bg-[radial-gradient(circle,rgba(99,102,241,0.25)_1.2px,transparent_1.2px)]
    [background-size:20px_20px]"
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT TOP – large dots grid */}
  <motion.div
    className="absolute top-32 right-0 w-40 h-40
    bg-[radial-gradient(circle,rgba(168,85,247,0.35)_1.5px,transparent_1.5px)]
    [background-size:18px_18px]"
    animate={{ y: [0, 26, 0] }}
    transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT LOWER – medium dots grid */}
  <motion.div
    className="absolute bottom-28 right-20 w-32 h-32
    bg-[radial-gradient(circle,rgba(168,85,247,0.25)_1.2px,transparent_1.2px)]
    [background-size:22px_22px]"
    animate={{ y: [0, -18, 0] }}
    transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* LEFT – long floating line */}
  <motion.div
    className="absolute top-[62%] left-10 w-28 h-px
    bg-gradient-to-r from-indigo-500/50 to-transparent"
    animate={{ x: [0, 22, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* RIGHT – long floating line */}
  <motion.div
    className="absolute top-[38%] right-12 w-32 h-px
    bg-gradient-to-l from-purple-500/50 to-transparent"
    animate={{ x: [0, -22, 0] }}
    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* CENTER LEFT – data diamond */}
  <motion.div
    className="absolute top-[45%] left-[28%] w-4 h-4
    bg-indigo-400/70 rotate-45 rounded-sm"
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* CENTER RIGHT – data diamond */}
  <motion.div
    className="absolute top-[55%] right-[28%] w-4 h-4
    bg-purple-400/70 rotate-45 rounded-sm"
    animate={{ y: [0, 14, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* SMALL CIRCLE – left */}
  <motion.div
    className="absolute top-[30%] left-[35%] w-3.5 h-3.5
    rounded-full bg-indigo-400/60"
    animate={{ y: [0, 12, 0] }}
    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* SMALL CIRCLE – right */}
  <motion.div
    className="absolute top-[70%] right-[35%] w-3.5 h-3.5
    rounded-full bg-purple-400/60"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
  />
</div>

    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "90%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 w-px
      bg-gradient-to-b from-indigo-500/60 via-purple-500/60 to-transparent"
    />

{[
  {
    title: "Data Ingestion",
    desc: "Sales, inventory, ERP systems, and external signals are ingested into a unified data layer.",
    icon: "📊",
  },
  {
    title: "Deterministic Metrics Engine",
    desc: "Critical operational metrics are computed deterministically to ensure zero ambiguity and production-grade accuracy.",
    icon: "🧮",
  },
  {
    title: "AI Modeling & Forecasting",
    desc: "ML and generative models analyze patterns, seasonality, and trends to predict future demand.",
    icon: "🧠",
  },
  {
    title: "Decision Intelligence",
    desc: "Predictions are combined with deterministic metrics to generate optimized, actionable decisions.",
    icon: "⚡",
  },
  {
    title: "Explainable Insights",
    desc: "Every recommendation is explained in natural language to ensure transparency and trust.",
    icon: "💬",
  },
].map((step, i) => {
  const isLeft = i % 2 === 0;

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative grid grid-cols-[1fr_auto_1fr] items-center mb-10"
    >
      {/* LEFT COLUMN */}
      <div className="flex justify-start">
        {isLeft && (
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TimelineCard {...step} />
          </motion.div>
        )}
      </div>

      {/* CENTER SPINE */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className="w-4 h-4 rounded-full
          bg-gradient-to-br from-indigo-500 to-purple-500
          shadow-lg shadow-indigo-500/40 z-10"
        />

        {/* Branch line */}
        <div
          className={`absolute top-1/2 h-px w-16
          bg-gradient-to-r from-indigo-500/50 to-purple-500/50
          ${isLeft ? "-left-16" : "left-4"}`}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex justify-end">
        {!isLeft && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TimelineCard {...step} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
})}


  </div>
</section>

{/* Floating 3D Background Elements */}
<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
  
  {/* Sphere 1 */}
  <motion.div
    className="absolute top-24 left-16 w-32 h-32 rounded-full
    bg-gradient-to-br from-indigo-400/40 to-purple-500/40
    blur-xl"
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* Sphere 2 */}
  <motion.div
    className="absolute top-1/3 right-20 w-24 h-24 rounded-full
    bg-gradient-to-br from-purple-400/30 to-indigo-400/30
    blur-lg"
    animate={{
      y: [0, 25, 0],
      x: [0, -20, 0],
    }}
    transition={{
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* Ring (fake 3D) */}
  <motion.div
    className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full
    border border-indigo-400/30
    blur-[1px]"
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    }}
  />

  {/* Cube illusion */}
  <motion.div
    className="absolute bottom-20 right-1/4 w-28 h-28
    bg-gradient-to-br from-indigo-500/20 to-purple-500/20
    rounded-2xl
    rotate-12 blur-sm"
    animate={{
      y: [0, -20, 0],
      rotate: [12, 18, 12],
    }}
    transition={{
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>

{/* Final Closing Section */}
<section className="relative z-10 px-8 lg:px-24 py-32">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl mx-auto text-center"
  >
    {/* Divider */}
    <div className="w-24 h-px mx-auto mb-10
      bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

    {/* Headline */}
    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Built for decisions that{" "}
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        actually matter
      </span>
    </h3>

    {/* Message */}
    <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 leading-relaxed">
      Flowchain AI combines deterministic accuracy with intelligent forecasting
      to help teams move faster — without compromising reliability.
      <br />
      <span className="block mt-3">
        Because predictions can tolerate uncertainty. Operations cannot.
      </span>
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/sign-up")}
        className="px-10 py-4 rounded-xl font-semibold text-white
        bg-gradient-to-r from-indigo-600 to-purple-600
        shadow-lg shadow-indigo-500/30"
      >
        Get Started
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/dashboard")}
        className="px-10 py-4 rounded-xl font-semibold
        text-indigo-600 dark:text-indigo-400
        border border-indigo-300 dark:border-indigo-600/40
        hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
      >
        View Dashboard
      </motion.button>
    </div>

    {/* Subtle footer note */}
    <p className="mt-12 text-sm text-gray-500 dark:text-slate-500">
      Designed for real-world supply chains — not just demos.
    </p>
  </motion.div>
</section>

            
        </div>
    );
}