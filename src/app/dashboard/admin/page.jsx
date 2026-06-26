"use client";

import React, { useEffect, useState } from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, CartesianGrid, Sector
} from 'recharts';

// প্রিমিয়াম ভাইব্রেন্ট কালার প্যালেট
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
      {/* অ্যাক্টিভ স্লাইস গ্লো */}
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

// কাস্টম প্রিমিয়াম ব্লার টুলটিপ
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
        fetch("http://localhost:5000/api/admin/analytics")
            .then(res => res.json())
            .then(data => {
                setAnalytics(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Analytics fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-white text-center p-10 font-medium">Loading Analytics Hub...</div>;

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
                    { label: "Total Revenue", value: `$${analytics?.cards?.totalRevenue?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, color: "from-blue-400 to-indigo-500" }
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
                                    {/* প্রিমিয়াম গ্রেডিয়েন্ট বার ডেকোরেশন */}
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
                                {/* Bar এবং Line একসাথে ব্লেন্ড করা হয়েছে */}
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