import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "inventory", label: "Inventory", icon: Package, path: "/inventory" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useClerk();
    const { user } = useUser();

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <aside className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-r border-slate-700/50 dark:border-slate-800/50 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-700/50 dark:border-slate-800/50">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-white">Flowchain AI</h2>
                        <p className="text-xs text-slate-400">Supply Chain AI</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/20 border border-indigo-500/30"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 transition-all duration-200 ${isActive
                                        ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                                        : "group-hover:text-slate-300"
                                    }`}
                            />
                            <span className="text-sm font-medium">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t border-slate-700/50 dark:border-slate-800/50 space-y-2">
                {/* User Info */}
                {user && (
                    <div className="px-4 py-2 rounded-lg bg-slate-800/50 mb-2">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm text-white font-medium truncate">
                            {user.emailAddresses[0]?.emailAddress}
                        </p>
                        <p className="text-xs text-indigo-400 mt-1">
                            Role: {user.publicMetadata?.role || "user"}
                        </p>
                    </div>
                )}
                
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                >
                    {theme === "light" ? (
                        <>
                            <Moon className="w-5 h-5" />
                            <span className="text-sm font-medium">Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="w-5 h-5" />
                            <span className="text-sm font-medium">Light Mode</span>
                        </>
                    )}
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 border border-transparent hover:border-red-500/30"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}