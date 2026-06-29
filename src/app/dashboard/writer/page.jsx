import React from 'react';
import {
  Book,
  Person,
  ArrowRightArrowLeft,
  Star,
  CirclePlus,
  Eye
} from '@gravity-ui/icons';
import { BiTrendingUp } from 'react-icons/bi';
import Link from 'next/link';
import { getPaymentDataByWriterId } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';

export default async function WritersDashboardPage() {
  const user = await getUserSeason();
  const userId = user?.id;

  
  const booksSalesData = (await getPaymentDataByWriterId(userId)) || [];

  let totalSalesCount = booksSalesData.length; 
  let totalEarnings = 0;
  const uniqueReadersSet = new Set();

  booksSalesData.forEach(book => {
    // পেমেন্ট সেশন বা বায়ার আইডি থাকলে আর্নিং ক্যালকুলেট হবে
    if (book.sessionId || book.buyerId || book.price) {
      totalEarnings += Number(book.price || 0); 
      
      // ইউনিক রিডার ট্র্যাক করা
      const readerId = book.userId || book.buyerId || book.buyerEmail;
      if (readerId) {
        uniqueReadersSet.add(readerId); 
      }
    }
  });

  const totalReadersCount = uniqueReadersSet.size;

  const stats = [
    { id: 1, title: 'Total Sales', value: totalSalesCount, change: 'Total copies sold', color: 'text-amber-400', icon: Book },
    { id: 2, title: 'Total Readers', value: totalReadersCount, change: 'Unique buyers', color: 'text-blue-400', icon: Person },
    { id: 3, title: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, change: 'Lifetime earnings', color: 'text-emerald-400', icon: ArrowRightArrowLeft },
    { id: 4, title: 'Avg. Rating', value: '4.8', change: 'Community standard', color: 'text-yellow-400', icon: Star },
  ];

  // সর্বশেষ ৩টি বিক্রির রেকর্ড নেওয়া হচ্ছে
  const recentSales = booksSalesData.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 lg:p-10">

      {/* 👋 Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#E5BA73] tracking-wide">
            Writers Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, {user?.name || 'Writer'}! Here is an overview of your book sales performance.
          </p>
        </div>

        <Link href="/dashboard/writer/add-ebook" className="flex items-center gap-2 bg-[#E5BA73] text-[#0B0F17] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#d4a75e] transition-all">
          <CirclePlus className="w-4 h-4" />
          Publish Book
        </Link>
      </div>

      {/* 📊 Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-[#E5BA73]/30 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2 text-white">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-gray-900/60 rounded-xl border border-gray-800 ${stat.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-900 text-xs text-gray-400">
                <BiTrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📑 Bottom Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 💰 Recent Sales Table */}
        <div className="lg:col-span-2 bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ArrowRightArrowLeft className="text-[#E5BA73] w-4 h-4" /> Recent Sales
            </h2>
            <Link href="/dashboard/writer/sales-history" className="text-xs text-[#E5BA73] hover:underline">
              View Sales History
            </Link>
          </div>
 
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-4 font-semibold">Book Details</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {recentSales.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      No sales records found yet.
                    </td>
                  </tr>
                ) : (
                  recentSales.map((sale) => (
                    <tr key={sale._id?.$oid || sale._id} className="group hover:bg-gray-900/20 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-white group-hover:text-[#E5BA73] transition-colors">
                          {sale.title || "Untitled Book"}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Buyer: {sale.userName || sale.userEmail || "Reader"}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Sold
                        </span>
                      </td>
                      <td className="py-4 text-right font-semibold text-white">
                        ${Number(sale.price || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔔 Right Column: Writing Insights */}
        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="text-[#E5BA73] w-4 h-4" /> Writing Insights
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Tips and trends to help increase your ebook sales on Fable.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800/80">
                <h4 className="text-xs font-bold text-[#E5BA73] uppercase tracking-wider mb-1">Trending Genre</h4>
                <p className="text-sm text-gray-300">Fantasy Mystery numbers have gone up by 25% this week.</p>
              </div>
              <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800/80">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Complete Profile</h4>
                <p className="text-sm text-gray-300">Writers with a complete bio receive up to 40% more downloads.</p>
              </div>
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800 text-center">
            <span className="text-xs text-gray-500">Fable Author Hub © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}