import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Bell, Moon, Globe, Lock, Mail, Database } from "lucide-react";

export function SettingsPage() {
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
                                Settings
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                Manage your preferences and system configuration
                            </p>
                        </div>
                    </div>
                </header>

                {/* Settings Content */}
                <main className="px-8 py-8">
                    <div className="max-w-[1440px] mx-auto space-y-6">
                        {/* Appearance Settings */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
                                    <Moon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Appearance
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">
                                        Customize how Flowchain AI looks
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            Dark Mode
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Use dark theme across the application
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            Compact View
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Reduce spacing for more information density
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </Card>

                        {/* Notifications Settings */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-600">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg" style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' }}>
                                    <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Notifications
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">
                                        Manage how you receive alerts
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            Stock Alerts
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Get notified when inventory levels are low
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            Order Updates
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Receive notifications for order status changes
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            AI Insights
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Get notified when AI generates new recommendations
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            Email Notifications
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">
                                            Send notifications to your email address
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </Card>

                        {/* System Settings */}
                        <Card className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all duration-300 animate-in fade-in duration-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                                    <Database className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        System Preferences
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">
                                        Configure system-level settings
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5 flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                                        <div>
                                            <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                                Language
                                            </Label>
                                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                                English (US)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5 flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                                        <div>
                                            <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                                Two-Factor Authentication
                                            </Label>
                                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                                Not configured
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-200 dark:bg-slate-700" />

                                <div className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5 flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                                        <div>
                                            <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                                Email Address
                                            </Label>
                                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                                admin@flowchain.ai
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
