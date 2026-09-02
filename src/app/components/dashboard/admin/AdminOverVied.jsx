"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { DollarSign, Home, CalendarCheck, Users, User } from "lucide-react";

const AdminDashboardHome = ({ totalEarnings = 0, totalProperties = 0, totalBookings = 0, totalUser = 0, totalOwner = 0, userName, monthlyEarnings = [], }) => {
    // Fallback dummy data for last 12 months (replace with real data)
    const chartData =
        monthlyEarnings.length > 0
            ? monthlyEarnings
            : [
                { month: "Jan", earnings: 0 },
                { month: "Feb", earnings: 0 },
                { month: "Mar", earnings: 0 },
                { month: "Apr", earnings: 0 },
                { month: "May", earnings: 0 },
                { month: "Jun", earnings: 0 },
                { month: "Jul", earnings: 0 },
                { month: "Aug", earnings: 0 },
                { month: "Sep", earnings: 0 },
                { month: "Oct", earnings: 0 },
                { month: "Nov", earnings: 0 },
                { month: "Dec", earnings: 0 },
            ];

    const cards = [
        {
            title: "Total Earnings",
            value: `৳${Number(totalEarnings).toLocaleString()}`,
            description: "From successful bookings",
            icon: <DollarSign size={22} />,
            color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
        },
        {
            title: "Total Properties",
            value: totalProperties,
            description: "Properties you listed",
            icon: <Home size={22} />,
            color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
        },
        {
            title: "Total Bookings",
            value: totalBookings ,
            description: "Confirmed bookings",
            icon: <CalendarCheck size={22} />,
            color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
        },
        {
            title: "Total Users",
            value: totalUser ,
            description: "Valid Users",
            icon: <Users size={22} />,
            color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
        },
        {
            title: "Total Owners",
            value: totalOwner ,
            description: "These Are All Users",
            icon: <User size={22} />,
            color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
        },
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                     Dashboard Overview
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                   {userName}  Track your earnings, properties, and bookings
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {card.value}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {card.description}
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Monthly Earnings
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Last 12 months earnings from successful bookings
                    </p>
                </div>

                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                className="dark:stroke-gray-700"
                            />
                            <XAxis
                                dataKey="month"
                                stroke="#9ca3af"
                                fontSize={12}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                fontSize={12}
                                tickLine={false}
                                tickFormatter={(value) => `৳${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#111827",
                                    border: "none",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                                formatter={(value) => [`৳${Number(value).toLocaleString()}`, "Earnings"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="earnings"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                fill="url(#colorEarnings)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;