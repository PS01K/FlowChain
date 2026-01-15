import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Jan", demand: 4200, inventory: 4800 },
    { month: "Feb", demand: 4500, inventory: 4600 },
    { month: "Mar", demand: 4800, inventory: 4400 },
    { month: "Apr", demand: 5200, inventory: 4200 },
    { month: "May", demand: 5500, inventory: 4000 },
    { month: "Jun", demand: 5800, inventory: 3900 },
    { month: "Jul", demand: 6100, inventory: 4100 },
    { month: "Aug", demand: 5900, inventory: 4300 },
    { month: "Sep", demand: 5600, inventory: 4500 },
    { month: "Oct", demand: 5400, inventory: 4700 },
    { month: "Nov", demand: 5200, inventory: 4900 },
    { month: "Dec", demand: 5600, inventory: 5100 },
];

export function DemandInventoryChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-slate-700" />
                <XAxis
                    dataKey="month"
                    stroke="currentColor"
                    className="text-gray-600 dark:text-slate-400"
                    style={{ fontSize: "14px" }}
                />
                <YAxis
                    stroke="currentColor"
                    className="text-gray-600 dark:text-slate-400"
                    style={{ fontSize: "14px" }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "var(--tooltip-bg, #fff)",
                        border: "1px solid var(--tooltip-border, #e5e7eb)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    wrapperClassName="dark:[--tooltip-bg:#1e293b] dark:[--tooltip-border:#334155]"
                />
                <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="line"
                />
                <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    name="Demand"
                />
                <Line
                    type="monotone"
                    dataKey="inventory"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                    name="Inventory"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}