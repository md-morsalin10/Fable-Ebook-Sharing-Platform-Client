"use client";

import { getAnalytics } from '@/lib/api/analytics';
import React, { useEffect, useState } from 'react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, CartesianGrid, Sector
} from 'recharts';

// প্রিমিয়াম ভাইব্রেন্ট কালার প্যালেট
const COLORS = ['#E5BA73', '#00C49F', '#3b82f6', '#a855f7', '#ec4899'];

// পাই চার্টের হোভার অ্যানিমেশন (Active Shape) রেন্ডারার
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            {/* সেন্টারে টেক্সট */}
            <text x={cx} y={cy} dy={4} textAnchor="middle" fill="#fff" className="font-semibold text-sm">
                {payload.genre}
            </text>
            {/* アクティブスライスグロー */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            {/* কানেক্টিং লাইনস */}
            <path d={`M${sx},${sy}L${mx},${my}H${ex}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            {/* ডেটা লেবেল */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#9ca3af" fontSize={12}>
                {`${value} Ebooks`}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={fill} fontSize={11} fontWeight="bold">
                {`(${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

// কাস্টম প্রিমিয়াম ব্লারツールチップ
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111622]/80 backdrop-blur-md border border-gray-700/50 p-4 rounded-xl shadow-2xl ring-1 ring-black/20">
                <p className="text-xs font-semibold text-gray-400 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-bold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.name.includes('Revenue') ? `$${Number(entry.value).toFixed(2)}` : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


const AdminDashboardHome = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // 👑 সমাধান ২: useEffect-এর ভেতরে একটি async ফাংশন তৈরি করে কল করা হলো
        const fetchAnalytics = async () => {
            try {
                const data = await getAnalytics();
                setAnalytics(data); // 👑 ডাটা স্টেটে সেট করা হলো
            } catch (err) {
                console.error("Analytics fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0f19] text-white p-6">
                {/* 🌀 গ্লোয়িং থ্রি-ডট বা রিং স্পিনার */}
                <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute w-full h-full border-4 border-t-[#E5BA73] border-r-transparent border-b-[#3b82f6] border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute w-12 h-12 border-4 border-t-transparent border-r-[#00C49F] border-b-transparent border-l-[#a855f7] rounded-full animate-spin [animation-duration:1.5s] reverse"></div>
                    <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                </div>

                {/* 📝 স্টাইলিশ টেক্সট লোডার */}
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#E5BA73] via-white to-[#3b82f6] bg-clip-text text-transparent animate-pulse">
                        Synchronizing Analytics Hub
                    </h3>
                    <p className="text-xs font-mono text-gray-500 tracking-widest uppercase animate-pulse delay-75">
                        Fetching platform metrics...
                    </p>
                </div>

                {/* 📊 ব্যাকগ্রাউন্ডে ঝাপসা কঙ্কাল (Skeleton Overlay) জাস্ট প্রিমিয়াম ফিল দেওয়ার জন্য */}
                <div className="absolute inset-x-0 bottom-10 px-8 grid grid-cols-4 gap-6 opacity-5 pointer-events-none blur-sm select-none">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[#111622] h-28 rounded-2xl border border-gray-800"></div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="p-8 bg-[#0b0f19] min-h-screen text-white font-sans selection:bg-[#E5BA73]/30">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Dashboard Overview</h1>
                    <p className="text-sm text-gray-400 mt-1">Real-time platform insights and financial performance.</p>
                </div>
                <div className="text-xs bg-[#111622] px-4 py-2 rounded-xl border border-gray-800 text-gray-400 font-mono">
                    Live Updates Active
                </div>
            </div>

            {/* 📊 Analytics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Total Users", value: analytics?.cards?.totalUsers, color: "from-white to-gray-300" },
                    { label: "Total Writers", value: analytics?.cards?.totalWriters, color: "from-white to-gray-300" },
                    { label: "Total Ebooks Sold", value: analytics?.cards?.totalEbooksSold, color: "from-green-400 to-emerald-500" },
                    { label: "Total Revenue", value: `$${analytics?.cards?.totalRevenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: "from-blue-400 to-indigo-500" }
                ].map((card, i) => (
                    <div key={i} className="group relative bg-[#111622] p-6 rounded-2xl border border-gray-800/80 shadow-xl hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E5BA73]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{card.label}</p>
                        <h3 className={`text-3xl font-black mt-3 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                            {card.value || 0}
                        </h3>
                    </div>
                ))}
            </div>

            {/* 📈 Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ১. মান্থলি সেলস কম্পোজিশন চার্ট (Bar + Line Overlay) */}
                <div className="bg-[#111622] p-6 rounded-2xl border border-gray-800/80 shadow-xl h-[420px] flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-100">Monthly Sales Trend</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Comparison between gross revenue and trajectory lines.</p>
                    </div>
                    <div className="flex-1 min-h-0 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={analytics?.monthlySalesChart || []} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#E5BA73" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#E5BA73" stopOpacity={0.15} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.03 }} />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 20, fontSize: 12 }} />
                                <Bar dataKey="amount" fill="url(#barGradient)" radius={[6, 6, 0, 0]} name="Revenue ($)" maxBarSize={45} />
                                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} name="Growth Path" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ২. ইন্টারেক্টিভ একটিভ-শেপ পাই চার্ট (Pie Chart with Outer Interaction) */}
                <div className="bg-[#111622] p-6 rounded-2xl border border-gray-800/80 shadow-xl h-[420px] flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-100">Ebooks Distribution</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Hover over sections to see volume metrics breakdown.</p>
                    </div>
                    <div className="flex-1 min-h-0 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={analytics?.genreChart || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    dataKey="count"
                                    nameKey="genre"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                >
                                    {(analytics?.genreChart || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#111622" strokeWidth={3} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardHome;