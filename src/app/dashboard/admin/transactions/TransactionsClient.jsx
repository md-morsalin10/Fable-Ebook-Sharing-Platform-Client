"use client";

import React, { useState } from 'react'; // 👈 useState ইমপোর্ট করা হলো
import { 
  BsBagCheck, 
  BsGrid3X3Gap, 
  BsThreeDotsVertical, 
  BsDownload, 
  BsArrowRightCircleFill
} from "react-icons/bs";

export default function TransactionsClient({ payments = [], writersPayment = [] }) {
  
  // ── 🔍 ফিল্টারিং স্টেট ──
  // 'all' = সব দেখাবে, 'purchase' = শুধু বই কেনা, 'creator' = শুধু ক্রিয়েটর পাস
  const [filter, setFilter] = useState('all'); 

  // ── 📊 ক্যালকুলেশনের জন্য প্রাথমিক ভেরিয়েবল ──
  let purchasePaymentsTotal = 0;
  let publishingFeesTotal = 0;

  // ১. 🛒 রিডারদের বই কেনার টোটাল হিসাব
  payments.forEach((pay) => {
    purchasePaymentsTotal += Number(pay.price || 0);
  });

  // ২. ✍️ রাইটারদের ওয়ান-টাইম অ্যাক্টিভেশন ফি হিসাব
  writersPayment.forEach((writer) => {
    publishingFeesTotal += Number(writer.price || 19.99);
  });

  // সর্বমোট আয়
  const totalRevenue = purchasePaymentsTotal + publishingFeesTotal;

  // ── 🔀 ২টা ভিন্ন অ্যারের ডাটাকে ম্যাপিং করা ──
  const cleanPurchases = payments.map(pay => ({
    id: pay._id,
    trId: pay.sessionId ? pay.sessionId.slice(8, 16).toUpperCase() : "N/A",
    type: "Purchase",
    email: pay.userEmail,
    title: pay.title || "Ebook Purchase",
    amount: Number(pay.price || 0),
    date: pay.purchaseDate?.$date || pay.purchaseDate || new Date()
  }));

  const cleanWriterFees = writersPayment.map(writer => ({
    id: writer._id,
    trId: writer.sessionId ? writer.sessionId.slice(8, 16).toUpperCase() : "N/A",
    type: "Creator Pass",
    email: writer.writerEmail,
    title: `${writer.writerName || 'Writer'} - Creator Pass Activation`,
    amount: Number(writer.price || 19.99),
    date: writer.createdAt || new Date()
  }));

  // দুটি ডাটা একত্রে মার্জ করে ১টি মাস্টার অ্যারে বানানো হলো
  const allTransactions = [...cleanPurchases, ...cleanWriterFees];

  // ── 🎯 ফিল্টার লজিক অনুযায়ী ডাটা আলাদা করা ──
  const filteredTransactions = allTransactions.filter(item => {
    if (filter === 'purchase') return item.type === "Purchase";
    if (filter === 'creator') return item.type === "Creator Pass";
    return true; // 'all' হলে সব দেখাবে
  });

  return (
    <div className="min-h-screen bg-[#0E1420] text-gray-100 p-4">
      
      {/* 📝 Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xs uppercase tracking-wider font-bold text-[#524534]">Financial Oversight</h1>
          <h2 className="text-xl font-bold text-white mt-1">Recent Activity</h2>
        </div>
        <button className="flex items-center gap-2 bg-[#161F30] text-gray-200 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
          <BsDownload className="text-amber-400" /> Export to CSV
        </button>
      </div>

      {/* 📊 ৩টি অ্যানালিটিক্স কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Total Revenue */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <BsArrowRightCircleFill className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        {/* Purchase Payments */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <BsBagCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Book Purchases</p>
            <h3 className="text-2xl font-bold text-white">${purchasePaymentsTotal.toFixed(2)}</h3>
            <p className="text-[10px] text-gray-500">{payments.length} Transactions</p>
          </div>
        </div>

        {/* Creator Activation Fees */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <BsGrid3X3Gap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Creator Pass Revenue</p>
            <h3 className="text-2xl font-bold text-white">${publishingFeesTotal.toFixed(2)}</h3>
            <p className="text-[10px] text-gray-500">{writersPayment.length} Activated Authors</p>
          </div>
        </div>
      </div>

      {/* 👑 ফিল্টারিং ট্যাব বাটনস */}
      <div className="flex gap-2 mb-4 bg-[#0B0F17] p-1 rounded-xl w-fit border border-white/5">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === 'all' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
        >
          All Logs ({allTransactions.length})
        </button>
        <button 
          onClick={() => setFilter('purchase')}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === 'purchase' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Book Purchases ({cleanPurchases.length})
        </button>
        <button 
          onClick={() => setFilter('creator')}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === 'creator' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Creator Pass ({cleanWriterFees.length})
        </button>
      </div>

      {/* 📋 প্লেইন HTML ও Tailwind টেবিল */}
      <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-[#524534]">
              <th className="pb-3 pl-2">Transaction ID</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">User & Details</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {/* 💡 এখানে মাস্টার অ্যারের বদলে ফিল্টার করা অ্যারে (filteredTransactions) ম্যাপ করা হয়েছে */}
            {filteredTransactions.map((item, idx) => {
              const isPurchase = item.type === "Purchase";
              const dateString = new Date(item.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });

              return (
                <tr key={item.id || idx} className="hover:bg-white/[0.02]">
                  <td className="py-4 pl-2 font-mono text-xs text-amber-400">
                    #TRX-{item.trId}
                  </td>

                  <td className="py-4">
                    {isPurchase ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        Purchase
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/10 text-purple-400 border border-purple-500/25">
                        Creator Pass
                      </span>
                    )}
                  </td>

                  <td className="py-4">
                    <p className="text-sm font-medium text-gray-200">{item.email}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[220px]">{item.title}</p>
                  </td>

                  <td className="py-4 text-sm font-bold text-white">
                    ${item.amount.toFixed(2)}
                  </td>

                  <td className="py-4 text-xs text-gray-300">
                    {dateString}
                  </td>

                  <td className="py-4 text-right pr-2">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <BsThreeDotsVertical />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ফিল্টার করার পর যদি কোনো ডাটা না থাকে */}
        {filteredTransactions.length === 0 && (
          <div className="text-gray-500 py-12 text-center text-sm">
            No transactions found for this filter.
          </div>
        )}
      </div>

    </div>
  );
}