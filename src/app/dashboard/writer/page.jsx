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

  // 📝 ১. শুধুমাত্র এই একটি এপিআই কল দিয়েই আপনার সব ডাটা চলে আসবে
  const booksSalesData = (await getPaymentDataByWriterId(userId)) || [];

  // 📊 ২. একদম সহজ হিসাব (ফর-ইচ লুপ)
  let totalBooksCount = booksSalesData.length; // টোটাল আপলোড করা বই
  let totalEarnings = 0;
  
  // ইউনিক রিডার ট্র্যাক করার জন্য সেট (Set)
  const uniqueReadersSet = new Set();

  booksSalesData.forEach(book => {

    if (book.sessionId || book.buyerId) {
      totalEarnings += Number(book.price || 0); 
      
      if (book.userId || book.buyerId) {
        uniqueReadersSet.add(book.userId || book.buyerId); 
      }
    }
  });

  const totalReadersCount = uniqueReadersSet.size;

  const stats = [
    { id: 1, title: 'Total Ebooks', value: totalBooksCount, change: 'Uploaded by you', color: 'text-amber-400', icon: Book },
    { id: 2, title: 'Total Readers', value: totalReadersCount, change: 'Unique buyers', color: 'text-blue-400', icon: Person },
    { id: 3, title: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, change: 'Lifetime earnings', color: 'text-emerald-400', icon: ArrowRightArrowLeft },
    { id: 4, title: 'Avg. Rating', value: '4.8', change: 'Community standard', color: 'text-yellow-400', icon: Star },
  ];

  const recentBooks = booksSalesData.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 lg:p-10">

      {/* 👋 Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#E5BA73] tracking-wide">
            Writers Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, {user?.name || 'Writer'}! Here is an overview of your published books and sales performance.
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

        {/* 📚 Recent Ebooks Table */}
        <div className="lg:col-span-2 bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Book className="text-[#E5BA73] w-4 h-4" /> Recent Ebooks
            </h2>
            {/* <Link href="/dashboard/writer/manage-ebook" className="text-xs text-[#E5BA73] hover:underline">
              View All Books
            </Link> */}
          </div>
 
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-4 font-semibold">Book Details</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {recentBooks.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      You haven't uploaded any books yet.
                    </td>
                  </tr>
                ) : (
                  recentBooks.map((book) => (
                    <tr key={book._id?.$oid || book._id} className="group hover:bg-gray-900/20 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-white group-hover:text-[#E5BA73] transition-colors">
                          {book.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 capitalize">{book.genre}</div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          book.sessionId || book.status === 'sold'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {book.sessionId || book.status === 'sold' ? 'Sold' : 'Available'}
                        </span>
                      </td>
                      <td className="py-4 text-right font-semibold text-white">
                        ${Number(book.price).toFixed(2)}
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