"use client";

import React from 'react';
import { 
  BsBagCheck, 
  BsGrid3X3Gap, 
  BsThreeDotsVertical, 
  BsDownload, 
  BsArrowRightCircleFill
} from "react-icons/bs";

export default function TransactionsClient({ payments = [] }) {
  
  // ── 📊 ক্যালকুলেশনের জন্য প্রাথমিক ভেরিয়েবল ──
  let purchasePaymentsTotal = 0;
  let publishingFeesTotal = 0;
  let totalPurchaseCount = 0;
  let totalPublishCount = 0;


  payments.forEach((pay) => {
    const price = Number(pay.price || 0);

    if (pay.bookId) {
      purchasePaymentsTotal = purchasePaymentsTotal + price;
      totalPurchaseCount = totalPurchaseCount + 1;
    } else {
      publishingFeesTotal = publishingFeesTotal + price;
      totalPublishCount = totalPublishCount + 1;
    }
  });

  const totalRevenue = purchasePaymentsTotal + publishingFeesTotal;

  return (
    <div className="min-h-screen bg-[#0E1420] text-gray-100 p-4">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xs uppercase tracking-wider font-bold text-[#524534]">Financial Oversight</h1>
          <h2 className="text-xl font-bold text-white mt-1">Recent Activity</h2>
        </div>
        <button className="flex items-center gap-2 bg-[#161F30] text-gray-200 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
          <BsDownload className="text-amber-400" /> Export to CSV
        </button>
      </div>

      {/* 📊 ৩টি সিম্পল কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* টোটাল রেভিনিউ */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <BsArrowRightCircleFill className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        {/* পারচেজ পেমেন্ট */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <BsBagCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Purchase Payments</p>
            <h3 className="text-2xl font-bold text-white">${purchasePaymentsTotal.toFixed(2)}</h3>
            <p className="text-[10px] text-gray-500">{totalPurchaseCount} Transactions</p>
          </div>
        </div>

        {/* পাবলিশিং ফি */}
        <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <BsGrid3X3Gap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Publishing Fees</p>
            <h3 className="text-2xl font-bold text-white">${publishingFeesTotal.toFixed(2)}</h3>
            <p className="text-[10px] text-gray-500">{totalPublishCount} New Listings</p>
          </div>
        </div>
      </div>

      {/* 👑 সাধারণ HTML ও Tailwind টেবিল */}
      <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-[#524534]">
              <th className="pb-3 pl-2">Transaction ID</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">User & Ebook</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {payments.map((pay, idx) => {
              
              // কন্ডিশনাল ভেরিয়েবলগুলো লুপের ভেতর একদম সহজে ডিক্লেয়ার করা হয়েছে
              const isPurchase = pay.bookId ? true : false;
              
              // সেশন আইডি থেকে ছোট করে ট্রানজেকশন আইডি বানানো
              const trId = pay.sessionId ? pay.sessionId.slice(8, 16).toUpperCase() : "N/A";
              
              // মঙ্গোডিবি ডেট বা নরমাল ডেট ফরম্যাট করা
              const rawDate = pay.purchaseDate?.$date || pay.purchaseDate || new Date();
              const dateString = new Date(rawDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });

              return (
                <tr key={pay._id || idx} className="hover:bg-white/[0.02]">
                  {/* ১. ট্রানজেকশন আইডি */}
                  <td className="py-4 pl-2 font-mono text-xs text-amber-400">
                    #TRX-{trId}
                  </td>

                  {/* ২. টাইপ ব্যাজ */}
                  <td className="py-4">
                    {isPurchase ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        Purchase
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/10 text-purple-400 border border-purple-500/25">
                        Publishing Fee
                      </span>
                    )}
                  </td>

                  {/* ৩. ইউজার এবং ইবুক ইনফো */}
                  <td className="py-4">
                    <p className="text-sm font-medium text-gray-200">
                      {isPurchase ? pay.userEmail : pay.writerEmail}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {pay.title || "Subscription Activation"}
                    </p>
                  </td>

                  {/* ৪. অ্যামাউন্ট */}
                  <td className="py-4 text-sm font-bold text-white">
                    ${Number(pay.price || 0).toFixed(2)}
                  </td>

                  {/* ৫. তারিখ */}
                  <td className="py-4 text-xs text-gray-300">
                    {dateString}
                  </td>

                  {/* ৬. অ্যাকশন বাটন */}
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

        {/* ডাটা খালি থাকলে মেসেজ দেখানোর সিম্পল লজিক */}
        {payments.length === 0 && (
          <div className="text-gray-500 py-12 text-center text-sm">
            No transactions recorded yet.
          </div>
        )}
      </div>

    </div>
  );
}